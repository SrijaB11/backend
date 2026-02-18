const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// security & parsing
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// database
connectDB();

// routes
app.use("/api/auth", authRoutes);

// server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
