import { config } from "dotenv";
import mongoose from "mongoose";
import app from "./src/app";

// Loading ENV Variables
config();
const PORT = process.env.PORT || 3120;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "127.0.0.1");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Listening for requests...");
  });
});
