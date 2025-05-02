const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  // Try to get the MongoDB URI from environment variables with fallback
  const MONGODB_URI =
    process.env.MONGODB_URI ||
    "mongodb+srv://blog:blog@cluster0.9gqsrzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected");
  } catch (err) {
    console.log("MongoDB Connection Error:", err);

    // Try local MongoDB as fallback
    try {
      await mongoose.connect("mongodb://localhost:27017/blogginghub");
      console.log("Connected to local MongoDB");
    } catch (localErr) {
      console.log("Could not connect to any database:", localErr);
      console.log(
        "Please check your MongoDB Atlas credentials or ensure local MongoDB is running"
      );
    }
  }
};

module.exports = { dbConnect };
