// mqttSubscriber.js
// CNC Sensor Data Listener

const mqtt = require("mqtt");
const processSensorData = require("./dataProcessor");

// MQTT configuration
const MQTT_BROKER = process.env.MQTT_BROKER || "mqtt://localhost:1883";
const SENSOR_TOPIC = process.env.MQTT_TOPIC || "cnc/sensors";

let client;

const initMQTT = () => {
  client = mqtt.connect(MQTT_BROKER);

  client.on("connect", () => {
    console.log("✅ Connected to MQTT Broker");
    client.subscribe(SENSOR_TOPIC, () => {
      console.log(`📡 Subscribed to topic: ${SENSOR_TOPIC}`);
    });
  });

  client.on("message", (topic, message) => {
    try {
      const sensorData = JSON.parse(message.toString());

      console.log("📥 Sensor Data Received:", sensorData);

      // Send data to processing pipeline
      processSensorData(sensorData);

      // Emit raw data to frontend (real-time)
      if (global.io) {
        global.io.emit("sensor-update", sensorData);
      }

    } catch (error) {
      console.error("❌ Error processing MQTT message:", error.message);
    }
  });

  client.on("error", (error) => {
    console.error("❌ MQTT Error:", error.message);
  });
};

module.exports = initMQTT;