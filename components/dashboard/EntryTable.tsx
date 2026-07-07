"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import { Search, Trash2, Download, FileSpreadsheet, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Column {
  key: string;
  label: string;
}

interface EntryTableProps {
  resource: string;
  columns: Column[];
  statusOptions?: string[];
  title: string;
}

export default function EntryTable({ resource, columns, statusOptions, title }: EntryTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [resource],
    queryFn: async () => {
      const res = await fetch(`/api/${resource}`);
      const json = await res.json();
      return json.data || [];
    },
  });

  const rows: Record<string, unknown>[] = data || [];

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchStatus = statusFilter === "all" || row.status === statusFilter;
      const matchSearch =
        !search ||
        columns.some((col) =>
          String(row[col.key] ?? "").toLowerCase().includes(search.toLowerCase())
        );
      return matchStatus && matchSearch;
    });
  }, [rows, search, statusFilter, columns]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this entry permanently?")) return;
    await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
    queryClient.invalidateQueries({ queryKey: [resource] });
  };

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/${resource}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    queryClient.invalidateQueries({ queryKey: [resource] });
  };

  const exportCsv = () => {
    window.open(`/api/admin/export?resource=${resource}&format=csv`, "_blank");
  };

  const exportExcel = () => {
    const sheetData = filtered.map((row) => {
      const obj: Record<string, unknown> = {};
      columns.forEach((c) => (obj[c.label] = row[c.key]));
      if (row.status) obj["Status"] = row.status;
      if (row.createdAt) obj["Date"] = formatDate(row.createdAt as string);
      return obj;
    });
    const ws = XLSX.utils.json_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title);
    XLSX.writeFile(wb, `${resource}-export.xlsx`);
  };

  return (
    <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_2px_12px_rgba(18,41,75,0.04)]">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-lg font-bold text-navy-dark">{title}</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-dark/30" size={15} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="input-field !py-2 !pl-9 !text-xs"
            />
          </div>
          {statusOptions && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field !w-auto !py-2 !text-xs"
            >
              <option value="all">All Status</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}
          <button onClick={exportCsv} className="btn-outline !px-3 !py-2 !text-xs">
            <Download size={13} className="mr-1.5" /> CSV
          </button>
          <button onClick={exportExcel} className="btn-outline !px-3 !py-2 !text-xs">
            <FileSpreadsheet size={13} className="mr-1.5" /> Excel
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-navy/30" size={28} /></div>
      ) : filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-navy-dark/40">No entries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy/10 text-xs uppercase tracking-wide text-navy-dark/40">
                {columns.map((c) => (
                  <th key={c.key} className="whitespace-nowrap px-3 py-3">{c.label}</th>
                ))}
                <th className="px-3 py-3">Date</th>
                {statusOptions && <th className="px-3 py-3">Status</th>}
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row._id as string} className="border-b border-navy/5 last:border-0 hover:bg-navy/[0.02]">
                  {columns.map((c) => (
                    <td key={c.key} className="whitespace-nowrap px-3 py-3 text-navy-dark/80">
                      {String(row[c.key] ?? "-")}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-3 py-3 text-navy-dark/50">
                    {row.createdAt ? formatDate(row.createdAt as string) : "-"}
                  </td>
                  {statusOptions && (
                    <td className="px-3 py-3">
                      <select
                        value={row.status as string}
                        onChange={(e) => handleStatusChange(row._id as string, e.target.value)}
                        className="rounded-lg border border-navy/10 bg-white px-2 py-1.5 text-xs"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  )}
                  <td className="px-3 py-3 text-right">
                    <button
                      onClick={() => handleDelete(row._id as string)}
                      className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"
                      aria-label="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
