//only for db connection ,import in index.ts

import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const conectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MONGO DB URI:", process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("mongo DB connection failed:", error);
    process.exit(1);
  }
};

export default conectDB;
