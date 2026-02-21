const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipment.controller");

// GET all equipment
router.get("/", equipmentController.getAllEquipment);

// POST new equipment
router.post("/", equipmentController.createEquipment);

module.exports = router;