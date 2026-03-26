import Book from "../model/book.model.js";
import path from "path";
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};


export const downloadBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.downloads += 1;
    book.lastDownloadedAt = new Date();
    await book.save();

    // Redirect to Cloudinary URL
    res.redirect(book.pdfUrl);
  } catch (err) {
    res.status(500).json({ message: "Error downloading book" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete book" });
  }
};