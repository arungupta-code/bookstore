// Cards.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const DEFAULT_CARD_IMAGE =
  "https://images.unsplash.com/photo-1512820790803-83ca734da794";

function Cards({ item, isSavedPage = false, isPaper = false }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Safely read token even if localStorage value is malformed
  let token = null;
  let userRole = null;
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    token = user?.token || null;
    userRole = user?.role || null;
  } catch (error) {
    token = null;
    userRole = null;
  }

  const savedEndpoint = isPaper ? "saved-papers" : "saved";
  const saveEndpoint = isPaper ? `save-paper/${item._id}` : `save/${item._id}`;
  const removeEndpoint = isPaper ? `remove-paper/${item._id}` : `remove/${item._id}`;

  // Check if this item is already saved
  useEffect(() => {
    const checkSaved = async () => {
      if (!token) return; // not logged in
      try {
        const res = await axios.get(`http://localhost:5003/api/user/${savedEndpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const savedItems = Array.isArray(res.data) ? res.data : [];
        setIsSaved(savedItems.some((b) => b._id === item._id));
      } catch (err) {
        console.log("Failed to fetch saved items:", err);
      }
    };

    if (!isSavedPage) checkSaved();
    else setIsSaved(true); // on saved page, all items are saved
  }, [item._id, isSavedPage, token, savedEndpoint]);

  // Save item
  const saveItem = async () => {
    if (!token) {
      toast.error("Please login to save this item");
      return;
    }
    try {
      await axios.post(
        `http://localhost:5003/api/user/${saveEndpoint}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSaved(true);
      toast.success("Saved!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to save item");
    }
  };

  // Remove item
  const removeItem = async () => {
    if (!token) {
      toast.error("Please login to remove this item");
      return;
    }
    try {
      await axios.post(
        `http://localhost:5003/api/user/${removeEndpoint}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSaved(false);
      if (isSavedPage) window.location.reload(); // refresh saved page
      toast.success("Removed!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove item");
    }
  };

  const handleDelete = async () => {
    if (!token || userRole !== "ADMIN") {
      toast.error("Only admin can delete");
      return;
    }
    if (!item?._id) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      const endpoint = isPaper
        ? `http://localhost:5003/api/paper/${item._id}`
        : `http://localhost:5003/api/book/${item._id}`;

      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`${isPaper ? "Paper" : "Book"} deleted`);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  const canDelete = userRole === "ADMIN" && Boolean(item?._id) && Boolean(item?.pdfUrl);

  return (
    <div className="mt-4 my-3 p-3">
      <div
        className="card bg-base-100 w-92 shadow-sm hover:scale-105 duration-200
                dark:bg-slate-900 dark:text-white dark:border-2 dark:border-white"
      >
        <img
          src={item.thumbnail || item.image || DEFAULT_CARD_IMAGE}
          alt={item.title || item.name}
        />

        <div className="card-body">
          <h2 className="card-title">
            {item.title || item.name}
            {item.category && <div className="badge badge-secondary ml-2">{item.category}</div>}
            {item.examType && <div className="badge badge-info ml-2">{item.examType}</div>}
          </h2>

          <p>{item.subject || item.description}</p>

          <div className="flex justify-between items-center mt-2">
            {/* Preview Button */}
            {item.pdfUrl && (
  <div
    onClick={() =>
      window.open(`http://localhost:5003${item.pdfUrl}`, "_blank")
    }
    className="cursor-pointer px-2 py-1 rounded-full hover:bg-pink-500 hover:text-white"
  >
    Preview
  </div>
)}
            {/* Save / Remove Button */}
            {!isSaved ? (
              !isSavedPage && (
                <div
                  onClick={saveItem}
                  className="cursor-pointer px-2 py-1 rounded-full hover:bg-blue-500 hover:text-white"
                >
                  Save
                </div>
              )
            ) : (
              <div
                onClick={removeItem}
                className="cursor-pointer px-2 py-1 rounded-full hover:bg-red-500 hover:text-white"
              >
                Remove
              </div>
            )}
          </div>
          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="mt-3 w-full bg-red-500 text-white font-medium py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-60"
            >
              {isDeleting ? "Deleting..." : `Delete ${isPaper ? "Paper" : "Book"}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;