import dotenv from "dotenv";
import mongoose from "mongoose";
import Paper from "./model/paper.model.js";

dotenv.config();

const seedPaper = async () => {
  try {
    await mongoose.connect(process.env.MONGODburi);

    const created = await Paper.create({
      title: "Compiler Design Midterm",
      subject: "Computer Science",
      course: "B.Tech",
      year: 2024,
      examType: "Midterm",
      pdfUrl: "/uploads/paper/compiler_midterm.paper.pdf",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    });

    console.log("Inserted paper:", created._id.toString());
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedPaper();
