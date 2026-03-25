 import jwt from "jsonwebtoken";
import User from "../model/user.modal.js";
export const isAdmin = (req, res, next) => {
  try {
    // 🔥 Check if user exists (from protect middleware)
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // 🔐 Check role
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Admin access only" });
    }

    // ✅ If admin → allow access
    next();
  } catch (error) {
    console.log("Admin Middleware Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};