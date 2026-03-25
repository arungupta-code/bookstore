import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure upload folders always exist to avoid ENOENT runtime failures
    let destinationPath = "uploads/";
    if (req.originalUrl.includes("upload-course")) {
      destinationPath = "uploads/notes/";
    } else if (req.originalUrl.includes("upload-paper")) {
      destinationPath = "uploads/papers/";
    }

    fs.mkdirSync(destinationPath, { recursive: true });
    cb(null, destinationPath);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Only allow PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;