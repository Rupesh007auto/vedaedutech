"use client";

import EntryTable from "@/components/dashboard/EntryTable";

export default function CareersAdminPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-navy-dark">Career Applications</h1>
      <EntryTable
        resource="career"
        title="All Applications"
        statusOptions={["new", "shortlisted", "rejected", "hired"]}
        columns={[
          { key: "name", label: "Name" },
          { key: "phone", label: "Phone" },
          { key: "position", label: "Position" },
          { key: "experience", label: "Experience" },
        ]}
      />
    </div>
  );
}
