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

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"]
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
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
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
