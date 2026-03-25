import express from "express";
import { getBooks, downloadBook, deleteBook } from "../controller/books.controller.js";
import { protect } from "../middleware/middlerware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

// get all books
router.get("/", getBooks);

// download book
router.get("/download/:id", downloadBook);
router.delete("/:id", protect, isAdmin, deleteBook);

export default router;