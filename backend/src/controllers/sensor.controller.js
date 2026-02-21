const mqtt = require("mqtt");

//connect to mosquitto
const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("MQTT Connected (Sensor Controller)");
});

//Send sensor data to MQTT
exports.sendSensorData = (req, res) => {
  try {
    const sensorData = {
      machineId: "CNC-01",
      temperature: (30 + Math.random() * 20).toFixed(2),  // 30–50 °C
      vibration: (1 + Math.random() * 5).toFixed(2),      // 1–6 mm/s
      spindleSpeed: Math.floor(2000 + Math.random() * 2000), // 2000–4000 RPM
      timestamp: new Date().toISOString()
    };

    // Publish to MQTT
    client.publish("cnc/data", JSON.stringify(sensorData));

    console.log("Sensor Data Sent:", sensorData);

    res.status(200).json({
      message: "Sensor data published successfully",
      data: sensorData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending sensor data" });
  }
};