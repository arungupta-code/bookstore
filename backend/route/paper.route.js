import express from "express";
import {
  getPapers,
  downloadPaper,
  getSavedPapers,
  savePaper,
  removePaper,
  deletePaper,
} from "../controller/Paper.controller.js";
import { protect } from "../middleware/middlerware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

// Get all papers
router.get("/", getPapers);

// Download single paper
router.get("/download/:id", downloadPaper);

// Get saved papers for logged-in user
router.get("/saved", protect, getSavedPapers);

// Save / remove paper
router.post("/save/:paperId", protect, savePaper);
router.post("/remove/:paperId", protect, removePaper);
router.delete("/:id", protect, isAdmin, deletePaper);


export default router;