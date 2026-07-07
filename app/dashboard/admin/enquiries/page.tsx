"use client";

import EntryTable from "@/components/dashboard/EntryTable";

export default function EnquiriesPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-navy-dark">Contact Enquiries</h1>
      <EntryTable
        resource="contact"
        title="All Enquiries"
        statusOptions={["new", "contacted", "resolved"]}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "subject", label: "Subject" },
        ]}
      />
    </div>
  );
}
