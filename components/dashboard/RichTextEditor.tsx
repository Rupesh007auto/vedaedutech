"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="rounded-xl border border-navy/10 bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} className="[&_.ql-editor]:min-h-[200px]" />
    </div>
  );
}
