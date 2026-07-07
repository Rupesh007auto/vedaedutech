import { FileText, Download } from "lucide-react";

const resources = [
  { title: "Class 10 Mathematics - Practice Worksheet", type: "PDF" },
  { title: "Spoken English - Vocabulary Booklet", type: "PDF" },
  { title: "Science Lab Manual - Term 1", type: "PDF" },
];

export default function StudentResourcesPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-navy-dark">Learning Resources</h1>
      <div className="space-y-3">
        {resources.map((r) => (
          <div key={r.title} className="flex items-center justify-between rounded-2xl border border-navy/5 bg-white p-5">
            <div className="flex items-center gap-3">
              <FileText className="text-teal" size={20} />
              <div>
                <p className="text-sm font-semibold text-navy-dark">{r.title}</p>
                <p className="text-xs text-navy-dark/50">{r.type} Document</p>
              </div>
            </div>
            <button className="btn-outline !px-3 !py-2 !text-xs"><Download size={13} className="mr-1.5" /> Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
