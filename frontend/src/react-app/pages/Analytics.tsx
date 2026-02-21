import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import {
  Activity,
  Thermometer,
  Gauge,
  Zap,
  BarChart3
} from "lucide-react";
import { Card } from "@/react-app/components/ui/card";
import Navbar from "@/react-app/components/Navbar";
import PageTransition from "@/react-app/components/PageTransition";

interface MachineData {
  machineId: string;
  temperature: string;
  vibration: string;
  spindleSpeed: number;
  timestamp: string;
}

export default function AnalyticsPage() {
  const [liveData, setLiveData] = useState<MachineData | null>(null);

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000", {
      transports: ["websocket"],
      reconnection: true,
    });

    socket.on("connect", () => {
      console.log("🟢 Connected to backend:", socket.id);
    });

    socket.on("mqttData", (data: MachineData) => {
      console.log("📡 LIVE MQTT:", data);
      setLiveData(data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected from backend");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket Error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <section className="pt-24 pb-10 px-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-white w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold">CNC Live Dashboard</h1>
          </div>

          {!liveData ? (
            <p className="text-gray-500">Waiting for live data...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Thermometer />
                  <h3 className="font-semibold">Temperature</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {liveData.temperature} °C
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Gauge />
                  <h3 className="font-semibold">Vibration</h3>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {liveData.vibration} mm/s
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Activity />
                  <h3 className="font-semibold">Spindle Speed</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {liveData.spindleSpeed} RPM
                </p>
              </Card>

            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
}