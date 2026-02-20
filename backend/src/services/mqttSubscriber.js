// backend/src/services/mqttSubscriber.js

const mqtt = require("mqtt");
const { checkRPMThreshold } = require("./alertEngine");

function initMQTT() {
    if (process.env.MQTT_ENABLED !== "true") {
        console.log("⚡ MQTT Disabled (Safe Mode)");
        return;
    }

    const brokerUrl = process.env.MQTT_BROKER || "mqtt://localhost:1883";

    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
        console.log("✅ Connected to MQTT Broker");
        client.subscribe("spindle/rpm");
    });

    client.on("message", (topic, message) => {
        const rpm = parseInt(message.toString());
        console.log("📥 RPM:", rpm);

        const alert = checkRPMThreshold(rpm);

        console.log("🚨 Status:", alert.status);

        // Emit to frontend
        if (global.io) {
            global.io.emit("rpm_update", {
                rpm,
                status: alert.status,
                color: alert.color,
                message: alert.message
            });
        }
    });

    client.on("error", (err) => {
        console.error("❌ MQTT Error:", err.message);
    });
}

module.exports = { initMQTT };