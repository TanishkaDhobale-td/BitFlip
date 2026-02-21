const Equipment = require("../models/Equipment.model");

// GET all equipment
exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.json({
      success: true,
      count: equipment.length,
      data: equipment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE new equipment
exports.createEquipment = async (req, res) => {
  try {
    const newEquipment = new Equipment(req.body);
    const saved = await newEquipment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};