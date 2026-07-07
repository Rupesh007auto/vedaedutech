"use client";

import EntryTable from "@/components/dashboard/EntryTable";

export default function FranchiseAdminPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-navy-dark">Franchise Leads</h1>
      <EntryTable
        resource="franchise"
        title="All Franchise Leads"
        statusOptions={["new", "contacted", "approved", "rejected"]}
        columns={[
          { key: "applicantName", label: "Name" },
          { key: "phone", label: "Phone" },
          { key: "city", label: "City" },
          { key: "state", label: "State" },
          { key: "investmentCapacity", label: "Investment" },
        ]}
      />
    </div>
  );
}
