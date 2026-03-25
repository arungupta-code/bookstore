import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function UploadPaper() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [examType, setExamType] = useState("Midterm");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "ADMIN";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error("Only admin can upload papers");
      return;
    }
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("examType", examType);
    formData.append("type", "paper");
    formData.append("file", file);
    try {
      setIsSubmitting(true);
      await axios.post("http://localhost:5003/api/admin/upload-paper", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      toast.success("Upload paper successful!");
      setTitle("");
      setYear("");
      setExamType("Midterm");
      setFile(null);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-10 max-w-2xl mx-auto">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          Admin access only. You are not allowed to upload papers.
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <Toaster position="top-right" />
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 p-6 md:p-8 shadow-lg">
      <h2 className="text-3xl font-bold mb-2">Upload Paper</h2>
      <p className="text-sm text-slate-500 dark:text-slate-300 mb-6">
        Upload an exam paper PDF with metadata.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-3 border rounded-lg dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Year"
          className="w-full px-4 py-3 border rounded-lg dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        <select
          className="w-full px-4 py-3 border rounded-lg dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
        >
          <option>Midterm</option>
          <option>Final</option>
        </select>

        <input
          type="file"
          accept="application/pdf"
          className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-100 file:text-pink-600 hover:file:bg-pink-200"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button
          disabled={isSubmitting}
          className="w-full bg-pink-500 text-white px-4 py-3 rounded-lg hover:bg-pink-700 duration-300 disabled:opacity-60"
        >
          {isSubmitting ? "Uploading..." : "Upload Paper"}
        </button>
      </form>
      </div>
    </div>
  );
}

export default UploadPaper;