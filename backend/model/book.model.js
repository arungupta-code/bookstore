import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["book", "notes"],
    default: "notes",
  },
  category: {
    type: String,
  },
   year: {
    type: Number, // e.g. 2023, 2024
  },
  pdfUrl: {
    type: String, // URL or file path of uploaded PDF
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

const Book = mongoose.model("Book", bookSchema);

export default Book;