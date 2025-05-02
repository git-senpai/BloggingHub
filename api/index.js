const express = require("express");
const { dbConnect } = require("./config/dbconfig");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173", // Local Vite development server
  "http://localhost:4173", // Local Vite preview
  "https://blogginghub-client.vercel.app", // Production client
  "https://blogginghub.vercel.app",
  "https://blogging-hub-dcb6.onrender.com", // Render.com frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests, etc)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/uploads", express.static(__dirname + "/uploads"));

// Connect to Database
dbConnect();

// Routes
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("Server started");
});

const PORT = process.env.PORT || 3000;
const server = app
  .listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is busy, trying port ${PORT + 1}`);
      app.listen(PORT + 1, () => {
        console.log(`Server is running on port ${PORT + 1}`);
      });
    } else {
      console.error("Server error:", err);
    }
  });
