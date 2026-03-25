import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // 🔥 important (avoid duplicates)
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // 🔐 ROLE BASED ACCESS
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    // 📚 SAVED NOTES
    savedNotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],

    // 📄 SAVED PAPERS
    savedPapers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paper",
      },
    ],

    // 🔒 OPTIONAL SECURITY FIELD
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // 🔥 replaces createdAt manually
  }
);

const User = mongoose.model("User", userSchema);

export default User;