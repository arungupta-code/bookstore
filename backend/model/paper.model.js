import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["paper"],
    default: "paper",
  },
  subject: {
    type: String,
  },
  year: {
    type: Number, // e.g. 2023, 2024
  },
  examType: {
    type: String, // Midterm, Final, Entrance, etc.
  },
  pdfUrl: {
    type: String, // PDF file path or cloud URL
    required: true,
  },
   downloads: {
    type: Number,
    default: 0,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Paper = mongoose.model("Paper", paperSchema);

export default Paper;