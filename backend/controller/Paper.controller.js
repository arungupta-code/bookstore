// paper.controller.js
import Paper from "../model/paper.model.js";
import User from "../model/user.modal.js"; // make sure this path is correct
import path from "path";
// ---------------------- GET ALL PAPERS ----------------------
export const getPapers = async (req, res) => {
  try {
    const papers = await Paper.find();
    res.status(200).json(papers);
  } catch (error) {
    console.error("Error fetching papers:", error);
    res.status(500).json({ message: "Error fetching papers" });
  }
};
// ---------------------- DOWNLOAD SINGLE PAPER ----------------------


export const downloadPaper = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) return res.status(404).json({ message: "Paper not found" });

    paper.downloads = (paper.downloads || 0) + 1;
    paper.lastDownloadedAt = new Date();
    await paper.save();

    const filePath = path.join(process.cwd(), paper.pdfUrl); // 🔥 FIX

    res.download(filePath);
  } catch (err) {
    console.error("Error downloading paper:", err);
    res.status(500).json({ message: "Error downloading paper" });
  }
};

// ---------------------- GET SAVED PAPERS FOR LOGGED-IN USER ----------------------
export const getSavedPapers = async (req, res) => {
  try {
    const userId = req.user._id; // assume JWT middleware sets req.user
    const user = await User.findById(userId).populate("savedPapers"); // savedPapers is an array of Paper _id

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.savedPapers);
  } catch (err) {
    console.error("Error fetching saved papers:", err);
    res.status(500).json({ message: "Failed to fetch saved papers" });
  }}
  // ---------------------- SAVE PAPER ----------------------
export const savePaper = async (req, res) => {
  try {
    const userId = req.user._id;
    const paperId = req.params.paperId;

    await User.findByIdAndUpdate(userId, {
      $addToSet: { savedPapers: paperId }, // avoids duplicates
    });

    res.status(200).json({ message: "Paper saved" });
  } catch (err) {
    console.error("Error saving paper:", err);
    res.status(500).json({ message: "Failed to save paper" });
  }
};

// ---------------------- REMOVE PAPER ----------------------
export const removePaper = async (req, res) => {
  try {
    const userId = req.user._id;
    const paperId = req.params.paperId;

    await User.findByIdAndUpdate(userId, {
      $pull: { savedPapers: paperId },
    });

    res.status(200).json({ message: "Paper removed" });
  } catch (err) {
    console.error("Error removing paper:", err);
    res.status(500).json({ message: "Failed to remove paper" });
  }
};

export const deletePaper = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPaper = await Paper.findByIdAndDelete(id);

    if (!deletedPaper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    return res.status(200).json({ message: "Paper deleted successfully" });
  } catch (err) {
    console.error("Error deleting paper:", err);
    return res.status(500).json({ message: "Failed to delete paper" });
  }
};
