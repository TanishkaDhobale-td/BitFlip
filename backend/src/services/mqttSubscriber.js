const mqtt = require("mqtt");

let client;

function initMQTT() {
  const broker = process.env.MQTT_BROKER;
  const topic = process.env.MQTT_TOPIC;

  if (!broker || !topic) {
    console.error("❌ MQTT_BROKER or MQTT_TOPIC not defined in .env");
    return;
  }

  client = mqtt.connect(broker, {
    reconnectPeriod: 3000, // auto reconnect every 3 sec
  });

  client.on("connect", () => {
    console.log("✅ Connected to MQTT broker:", broker);

    client.subscribe(topic, (err) => {
      if (err) {
        console.error("❌ Subscription error:", err.message);
      } else {
        console.log("📡 Subscribed to topic:", topic);
      }
    });
  });

  client.on("message", (receivedTopic, message) => {
    try {
      const rawData = message.toString();
      console.log("📥 MQTT Raw:", rawData);

      const parsedData = JSON.parse(rawData);

      // Validate required fields
      const safeData = {
        machineId: parsedData.machineId || "Unknown",
        temperature: parsedData.temperature || "0",
        vibration: parsedData.vibration || "0",
        spindleSpeed: parsedData.spindleSpeed || 0,
        timestamp: parsedData.timestamp || new Date().toISOString(),
      };

      console.log("📤 Sending to frontend:", safeData);

      if (global.io) {
        global.io.emit("mqttData", safeData);
      } else {
        console.warn("⚠ global.io not initialized");
      }

    } catch (err) {
      console.error("❌ Failed to parse MQTT message:", err.message);
    }
  });

  client.on("reconnect", () => {
    console.log("🔄 Reconnecting to MQTT broker...");
  });

  client.on("error", (err) => {
    console.error("❌ MQTT Error:", err.message);
  });
}

module.exports = { initMQTT };