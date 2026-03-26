import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DEFAULT_CARD_IMAGE =
  "https://images.unsplash.com/photo-1512820790803-83ca734da794";

const BASE_URL = process.env.REACT_APP_API_URL;

function Cards({
  item,
  isSavedPage = false,
  isPaper = false,
  savedItems = [],
  onDelete,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  // Safe token handling
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user?.token || null;
  const userRole = user?.role || null;

  const savedEndpoint = isPaper ? "saved-papers" : "saved";
  const saveEndpoint = isPaper ? `save-paper/${item._id}` : `save/${item._id}`;
  const removeEndpoint = isPaper
    ? `remove-paper/${item._id}`
    : `remove/${item._id}`;

  // Check saved (using parent data)
  useEffect(() => {
    if (isSavedPage) {
      setIsSaved(true);
    } else {
      setIsSaved(savedItems.some((b) => b._id === item._id));
    }
  }, [item._id, isSavedPage, savedItems]);

  // Save item
  const saveItem = async () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `${BASE_URL}/api/user/${saveEndpoint}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSaved(true);
      toast.success("Saved!");
    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  // Remove item
  const removeItem = async () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `${BASE_URL}/api/user/${removeEndpoint}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSaved(false);
      toast.success("Removed!");
    } catch (err) {
      toast.error("Failed to remove");
    } finally {
      setLoading(false);
    }
  };

  // Delete item (admin)
  const handleDelete = async () => {
    if (!token || userRole !== "ADMIN") {
      toast.error("Only admin can delete");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      setIsDeleting(true);

      const endpoint = isPaper
        ? `${BASE_URL}/api/paper/${item._id}`
        : `${BASE_URL}/api/book/${item._id}`;

      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`${isPaper ? "Paper" : "Book"} deleted`);

      // Update UI without reload
      if (onDelete) {
        onDelete(item._id);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  const canDelete = userRole === "ADMIN" && Boolean(item?._id);

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card bg-base-100 w-92 shadow-sm hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border-2 dark:border-white">
        <img
          src={item.thumbnail || item.image || DEFAULT_CARD_IMAGE}
          alt={item.title || item.name}
        />

        <div className="card-body">
          <h2 className="card-title">
            {item.title || item.name}
            {item.category && (
              <div className="badge badge-secondary ml-2">
                {item.category}
              </div>
            )}
            {item.examType && (
              <div className="badge badge-info ml-2">
                {item.examType}
              </div>
            )}
          </h2>

          <p>{item.subject || item.description}</p>

          <div className="flex justify-between items-center mt-2">
            {/* Preview */}
            {item.pdfUrl && (
              <div
                onClick={() => setShowPreview(true)}
                className="cursor-pointer px-2 py-1 rounded-full hover:bg-pink-500 hover:text-white"
              >
                Preview
              </div>
            )}

            {/* Save / Remove */}
            {!isSaved ? (
              !isSavedPage && (
                <div
                  onClick={saveItem}
                  className="cursor-pointer px-2 py-1 rounded-full hover:bg-blue-500 hover:text-white"
                >
                  {loading ? "Saving..." : "Save"}
                </div>
              )
            ) : (
              <div
                onClick={removeItem}
                className="cursor-pointer px-2 py-1 rounded-full hover:bg-red-500 hover:text-white"
              >
                {loading ? "Removing..." : "Remove"}
              </div>
            )}
          </div>

          {/* Delete Button */}
          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 disabled:opacity-60"
            >
              {isDeleting
                ? "Deleting..."
                : `Delete ${isPaper ? "Paper" : "Book"}`}
            </button>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg max-w-4xl w-full max-h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                {item.title || item.name}
              </h3>
              <button onClick={() => setShowPreview(false)}>✕</button>
            </div>

            <iframe
              src={item.pdfUrl}
              width="100%"
              height="600px"
              title="PDF Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;