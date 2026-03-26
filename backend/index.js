import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import bookRoute from "./route/book.route.js";
import UserRoute from "./route/user.route.js";
import paperRoute from "./route/paper.route.js";
import adminRoute from "./route/admin.route.js"; // 🔥 ADD THIS

const app = express();

// Configure CORS for Netlify frontend (including preview deploys)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow: main production URL and all Netlify preview URLs
    if (!origin || origin.includes('melodic-taiyaki-c673aa.netlify.app')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for now to debug
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
const URI = process.env.MONGODburi;
mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/book", bookRoute);
app.use("/api/user", UserRoute);
app.use("/api/paper", paperRoute);
app.use("/api/admin", adminRoute); // 🔥 ADD THIS

// Serve uploads
app.use("/uploads", (req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;");
  next();
}, express.static("uploads"));

// Start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});