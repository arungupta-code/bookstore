import Paper from "../model/paper.model.js";
import Course from "../model/book.model.js";

// ---------------------- UPLOAD PAPER ----------------------
export const uploadPaper = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, year, examType, type = "paper" } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File not uploaded" });
    }

    const pdfUrl = req.file.path.replace("/raw/upload/", "/image/upload/"); // Cloudinary URL

    const paper = new Paper({
      title,
      year,
      examType,
      type,
      pdfUrl,
    });

    await paper.save();

    res.status(201).json({
      message: "Paper uploaded successfully",
      paper,
    });
  } catch (error) {
    console.log("UPLOAD ERROR:", error); // 🔥 FULL ERROR
    res.status(500).json({ message: error?.message || "Failed to upload paper" });
  }
};

// ---------------------- UPLOAD COURSE / NOTES ----------------------
export const uploadCourse = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, subject, year, type = "book" } = req.body;

    // ❗ file check
    if (!req.file) {
      return res.status(400).json({ message: "File not uploaded" });
    }

   const pdfUrl = req.file.path.replace("/raw/upload/", "/image/upload/"); // Cloudinary URL

    const course = new Course({
      title,
      category: subject,
      year,
      type: type === "notes" ? "notes" : "book",
      pdfUrl,
    });

    await course.save();

    res.status(201).json({
      message: "Course uploaded successfully",
      course,
    });
  } catch (error) {
    console.log("UPLOAD COURSE ERROR:", error); // 🔥 important
    res.status(500).json({ message: error?.message || "Failed to upload course" });
  }
};

// ---------------------- MIGRATION: Find all stale upload paths ----------------------
export const findStaleUploads = async (req, res) => {
  try {
    const stalePapers = await Paper.find({ pdfUrl: /^\/uploads/ });
    const staleCourses = await Course.find({ pdfUrl: /^\/uploads/ });

    res.status(200).json({
      message: "Stale upload paths found",
      stalePapers: stalePapers.length,
      staleCourses: staleCourses.length,
      papers: stalePapers.map((p) => ({ _id: p._id, title: p.title, pdfUrl: p.pdfUrl })),
      courses: staleCourses.map((c) => ({ _id: c._id, title: c.title, pdfUrl: c.pdfUrl })),
    });
  } catch (error) {
    console.log("MIGRATION ERROR:", error);
    res.status(500).json({ message: error?.message || "Migration scan failed" });
  }
};

// ---------------------- MIGRATION: Remove all stale records ----------------------
export const removeStaleUploads = async (req, res) => {
  try {
    const paperResult = await Paper.deleteMany({ pdfUrl: /^\/uploads/ });
    const courseResult = await Course.deleteMany({ pdfUrl: /^\/uploads/ });

    res.status(200).json({
      message: "Stale records removed",
      papersDeleted: paperResult.deletedCount,
      coursesDeleted: courseResult.deletedCount,
    });
  } catch (error) {
    console.log("REMOVE STALE ERROR:", error);
    res.status(500).json({ message: error?.message || "Failed to remove stale records" });
  }
};