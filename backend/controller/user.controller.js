import User from "../model/user.modal.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// ---------------------- SIGNUP ----------------------
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const createdUser = new User({
      fullname,
      email: normalizedEmail,
      password: hashPassword,
    });
    await createdUser.save();

    // generate JWT
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
        role: createdUser.role,
      },
      token,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendResetOtp = async (req, res) => {
  return res.status(404).json({ message: "Forgot/reset password is removed" });
};

// ---------------------- LOGIN ----------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: normalizedEmail,
        role: user.role, 
      },
      token,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------------- SAVE NOTE ----------------------
export const saveNote = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const bookId = req.params.bookId;

    await User.findByIdAndUpdate(userId, {
      $addToSet: { savedNotes: bookId }, // avoids duplicates
    });

    res.status(200).json({ message: "Book saved" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to save book" });
  }
};

// ---------------------- REMOVE NOTE ----------------------
export const removeNote = async (req, res) => {
  try {
    const userId = req.user._id ;
    const bookId = req.params.bookId;

    await User.findByIdAndUpdate(userId, {
      $pull: { savedNotes: bookId },
    });

    res.status(200).json({ message: "Book removed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to remove book" });
  }
};

// ---------------------- GET SAVED NOTES ----------------------
export const getSavedNotes = async (req, res) => {
  try {
    const userId =req.user._id ;

    const user = await User.findById(userId).populate("savedNotes");
    res.status(200).json(user.savedNotes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to fetch saved notes" });
  }
};

export const savePaper = async (req, res) => {
  try {
    const userId = req.user._id;
    const paperId = req.params.paperId;

    await User.findByIdAndUpdate(userId, {
      $addToSet: { savedPapers: paperId }, // avoids duplicates
    });

    res.status(200).json({ message: "Paper saved" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to save paper" });
  }
}

export const removePaper = async (req, res) => {
  try {
    const userId =req.user._id;
    const paperId = req.params.paperId;

    await User.findByIdAndUpdate(userId, {
      $pull: { savedPapers: paperId },
    });

    res.status(200).json({ message: "Paper removed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to remove paper" });
  }
};

export const getSavedPapers = async (req, res) => {
  try {
    const userId =req.user._id;
    const user = await User.findById(userId).populate("savedPapers");
    res.status(200).json(user.savedPapers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to fetch saved papers" });
  }
};
