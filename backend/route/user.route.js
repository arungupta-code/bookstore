import express from "express";
import {
  signup,
  login,
  saveNote,
  removeNote,
  getSavedNotes,
  savePaper,
  removePaper,
  getSavedPapers,
} from "../controller/user.controller.js";
import { protect } from "../middleware/middlerware.js"; // auth middleware

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

// Saved notes routes (requires authentication)
router.post("/save/:bookId", protect, saveNote);
router.post("/remove/:bookId", protect, removeNote);
router.get("/saved", protect, getSavedNotes);
router.post("/save-paper/:paperId", protect, savePaper);
router.post("/remove-paper/:paperId", protect, removePaper);
router.get("/saved-papers", protect, getSavedPapers);
export default router;