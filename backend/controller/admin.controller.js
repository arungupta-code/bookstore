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

    const pdfUrl = req.file.path; // Cloudinary URL

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

    const pdfUrl = req.file.path; // Cloudinary URL

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