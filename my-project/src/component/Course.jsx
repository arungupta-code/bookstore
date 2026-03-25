import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Course() {
  const [books, setBooks] = useState([]);

  // ✅ STATES
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("All");

  // 🔥 Get user (for admin check)
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("https://bookstore-2-zry2.onrender.com/api/book");
        const payload = Array.isArray(res.data)
          ? res.data
          : res.data?.books || [];
        setBooks(payload);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    getBooks();
  }, []);

  // 🔥 Upload handler
  const handleUpload = () => {
    console.log("Upload course clicked");
    // later connect API / modal
  };

  // ✅ FILTER LOGIC
  const filteredBooks = books.filter((item) => {
    const bookTitle = (item?.title || item?.name || "").toString();

    const matchSearch = bookTitle
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchTitle = title === "All" || bookTitle === title;

    return matchSearch && matchTitle;
  });

  // ✅ UNIQUE TITLES
  const titles = [
    "All",
    ...new Set(
      books
        .map((b) => (b?.title || b?.name || "").toString())
        .filter(Boolean)
    ),
  ];

  return (
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
      
      {/* 🔥 HEADER */}
      <div className='mt-28 text-center'>
        <h1 className='text-2xl md:text-4xl'>
          We are delighted to have you <span className='text-pink-500'>here!!</span>
        </h1>

        {/* 🔥 BUTTON ROW */}
        <div className="mt-6 flex justify-between items-center">

          {/* Back Button */}
          <Link to='/'>
            <button className='bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>
              Back
            </button>
          </Link>

          {/* Upload Button (ADMIN ONLY) */}
          {user?.role === "ADMIN" && (<Link to="/admin/upload-book">
            <button
              onClick={handleUpload}
              className='bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'
            >
              Upload
            </button></Link>
          )}
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 p-4 md:p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">
              Search
            </label>
            <input
              type="text"
              placeholder="Search books..."
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">
              Filter by title
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              {titles.map((t, index) => (
                <option key={index} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* BOOKS GRID */}
      <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-4'>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((item) => (
            <Cards
              key={item._id || item.id}
              item={item}
              showDownload={true}
              showPreview={true}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No books found 😔
          </p>
        )}
      </div>
    </div>
  );
}

export default Course;