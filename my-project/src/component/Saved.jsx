// Saved.jsx
import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Saved() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [savedPapers, setSavedPapers] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All"); // "All", "Notes", "Papers"

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view saved items");
      return;
    }

    // Fetch saved notes
    const fetchSavedBooks = async () => {
      try {
        const res = await axios.get("https://bookstore-2-zry2.onrender.com/api/user/saved", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedBooks(res.data);
      } catch (err) {
        toast.error("Failed to fetch saved notes");
        console.log(err);
      }
    };

    // Fetch saved papers
    const fetchSavedPapers = async () => {
      try {
        const res = await axios.get("https://bookstore-2-zry2.onrender.com/api/user/saved-papers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedPapers(res.data);
      } catch (err) {
        toast.error("Failed to fetch saved papers");
        console.log(err);
      }
    };

    fetchSavedBooks();
    fetchSavedPapers();
  }, [token]);

  // Combine notes and papers, mark type
  const allSavedItems = [
    ...savedBooks.map((b) => ({ ...b, type: "Notes" })),
    ...savedPapers.map((p) => ({ ...p, type: "Papers" })),
  ];

  // Apply search + type filter
  const filteredItems = allSavedItems.filter((item) => {
    const displayTitle = (item.title || item.name || "").toString().toLowerCase();
    const matchesSearch = displayTitle.includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      {/* Header */}
      <div className="mt-28 text-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          Your <span className="text-pink-500">Saved Items</span>
        </h1>

        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link>
      </div>

      {/* Search + Type Filter */}
      <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 p-4 md:p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">
              Search
            </label>
            <input
              type="text"
              placeholder="Search saved items..."
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">
              Type
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Notes">Notes</option>
              <option value="Papers">Papers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Cards
              key={`${item.type}-${item._id}`} // ✅ unique key per type
              item={item}
              isSavedPage={true}
              isPaper={item.type === "Papers"}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No saved items
          </p>
        )}
      </div>
    </div>
  );
}

export default Saved;