const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("🧠 MQTT Connected (Prediction Controller)");
});

//AI Risk Prediction
exports.predictFailure = (req, res) => {
  try {

    const { temperature, vibration, spindleSpeed } = req.body;

    let riskLevel = "LOW";

    // Simple ML logic (replace later with real model)
    if (temperature > 45 || vibration > 4 || spindleSpeed > 3800) {
      riskLevel = "HIGH";
    } else if (temperature > 40 || vibration > 3) {
      riskLevel = "MEDIUM";
    }

    const predictionData = {
      machineId: "CNC-01",
      risk: riskLevel,
      timestamp: new Date().toISOString()
    };

    client.publish("cnc/prediction", JSON.stringify(predictionData));

    console.log("Prediction Sent:", predictionData);

    res.status(200).json({
      message: "Prediction completed",
      prediction: predictionData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Prediction failed" });
  }
};