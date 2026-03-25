import express from "express";
import { uploadPaper, uploadCourse } from "../controller/admin.controller.js";
import { protect } from "../middleware/middlerware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js"; // ✅ FIXED

const router = express.Router();

// ---------------------- ADMIN UPLOAD ROUTES ----------------------

// 📄 Upload paper
router.post(
  "/upload-paper",
  protect,
  isAdmin,
  upload.single("file"), // 🔥 VERY IMPORTANT
  uploadPaper
);

// 📚 Upload course/notes
router.post(
  "/upload-course",
  protect,
  isAdmin,
  upload.single("file"), // 🔥 VERY IMPORTANT
  uploadCourse
);

export default router;