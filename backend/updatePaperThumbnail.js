import dotenv from "dotenv";
import mongoose from "mongoose";
import Paper from "./model/paper.model.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODburi);
    const url = "https://images.unsplash.com/photo-1512820790803-83ca734da794";
    const result = await Paper.updateMany({}, { $set: { thumbnail: url } });
    console.log(`matched=${result.matchedCount}, modified=${result.modifiedCount}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

run();
