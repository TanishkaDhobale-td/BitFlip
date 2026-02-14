// main.js
// Backend Entry Point
// CNC AI Monitoring System
// ================================

// Core imports
const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

// WebSocket
const { Server } = require("socket.io");

// Config imports
const connectDB = require("./config/db");
const initMQTT = require("./services/mqttSubscriber");

// Routes
const equipmentRoutes = require("./routes/equipment.routes");
const sensorRoutes = require("./routes/sensor.routes");
const predictionRoutes = require("./routes/prediction.routes");

// -------------------------------
// App & Server setup
// -------------------------------
const app = express();
const server = http.createServer(app);

// WebSocket initialization
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Make socket available globally
global.io = io;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// API Routes
app.use("/api/equipment", equipmentRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/predict", predictionRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 CNC AI Monitoring Backend is running");
});

// WebSocket Events
io.on("connection", (socket) => {
  console.log("🟢 Frontend connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Frontend disconnected:", socket.id);
  });
});

// Start MQTT Subscriber
initMQTT();

// Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});