const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
  temperature: Number,
  vibration: Number,
  spindleLoad: Number,
  powerConsumption: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const EquipmentSchema = new mongoose.Schema({
  machineId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ["Healthy", "Warning", "Critical"],
    default: "Healthy"
  },
  healthScore: {
    type: Number,
    default: 100
  },
  sensors: [SensorSchema]
});

module.exports = mongoose.model("Equipment", EquipmentSchema);