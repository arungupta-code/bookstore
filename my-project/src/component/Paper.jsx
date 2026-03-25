import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Paper() {
  const [papers, setPapers] = useState([]);

  // ✅ STATES
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("All");
  const [examTypes, setExamTypes] = useState([]);

  // 🔥 Get user (for role check)
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const getPapers = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/paper");
        const payload = Array.isArray(res.data)
          ? res.data
          : res.data?.papers || [];
        setPapers(payload);
      } catch (error) {
        console.log("Error fetching papers:", error);
      }
    };
    getPapers();
  }, []);

  // ✅ HANDLE MULTI SELECT
  const handleTypeChange = (type) => {
    if (examTypes.includes(type)) {
      setExamTypes(examTypes.filter((t) => t !== type));
    } else {
      setExamTypes([...examTypes, type]);
    }
  };

  // 🔥 Upload handler
  const handleUpload = () => {
    console.log("Upload clicked");
    // later connect to upload API / modal
  };

  // ✅ FILTER LOGIC
  const filteredPapers = papers.filter((item) => {
    const paperTitle = (item?.title || item?.name || "").toString();
    const paperYear = Number(item?.year);
    const paperType = (item?.examType || "").toLowerCase();

    const matchSearch = paperTitle
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchYear = year === "All" || paperYear === Number(year);

    const matchType =
      examTypes.length === 0 ||
      examTypes.map((t) => t.toLowerCase()).includes(paperType);

    return matchSearch && matchYear && matchType;
  });

  const years = ["All", ...new Set(papers.map((p) => p.year))];

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">

      {/* 🔥 HEADER */}
      <div className="mt-28 text-center">
        <h1 className="text-2xl md:text-4xl">
          Question Papers <span className="text-pink-500">Collection</span>
        </h1>

        {/* 🔥 BUTTON ROW */}
        <div className="mt-6 flex justify-between items-center">

          {/* Back Button */}
          <Link to="/">
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>

          {/* Upload Button (ADMIN ONLY) */}
          {user?.role === "ADMIN" && (<Link to="/admin/upload-paper">
            <button
              onClick={handleUpload}
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300"
            >
              Upload
            </button></Link>
          )}
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 p-4 md:p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">
              Search
            </label>
            <input
              type="text"
              placeholder="Search papers..."
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">
              Year
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {years.map((y, index) => (
                <option key={index} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">
              Exam Type
            </label>
            <div className="flex flex-wrap gap-3">

              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border dark:border-slate-600">
                <input
                  type="checkbox"
                  checked={examTypes.includes("Midterm")}
                  onChange={() => handleTypeChange("Midterm")}
                />
                <span>Midterm</span>
              </label>

              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border dark:border-slate-600">
                <input
                  type="checkbox"
                  checked={examTypes.includes("Final")}
                  onChange={() => handleTypeChange("Final")}
                />
                <span>Final</span>
              </label>

            </div>
          </div>
        </div>
      </div>

      {/* PAPERS GRID */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredPapers.length > 0 ? (
          filteredPapers.map((item) => (
            <Cards
              key={item._id || item.id}
              item={item}
              isPaper={true}
              isSavedPage={false}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No papers found 😔
          </p>
        )}
      </div>
    </div>
  );
}

export default Paper;