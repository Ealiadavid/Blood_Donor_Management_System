const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Donor Routes
const donorRoutes = require("./routes/donorRoutes");

// Emergency Request Routes
const emergencyRoutes = require("./routes/emergencyRoutes");

app.use("/api/donors", donorRoutes);

app.use("/api/emergency", emergencyRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Blood Donor Management System API is Running...");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});