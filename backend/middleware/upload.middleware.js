import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      if (req.originalUrl.includes("upload-course")) {
        return "notes";
      } else if (req.originalUrl.includes("upload-paper")) {
        return "papers";
      }
      return "uploads";
    },
    public_id: (req, file) => Date.now() + path.extname(file.originalname),
    resource_type: "raw", // For PDFs
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