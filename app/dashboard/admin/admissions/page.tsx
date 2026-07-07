"use client";

import EntryTable from "@/components/dashboard/EntryTable";

export default function AdmissionsAdminPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-navy-dark">Admission Applications</h1>
      <EntryTable
        resource="admission"
        title="All Applications"
        statusOptions={["pending", "reviewed", "admitted", "rejected"]}
        columns={[
          { key: "studentName", label: "Student" },
          { key: "parentName", label: "Parent" },
          { key: "phone", label: "Phone" },
          { key: "courseInterested", label: "Course" },
          { key: "currentClass", label: "Class" },
        ]}
      />
    </div>
  );
}
