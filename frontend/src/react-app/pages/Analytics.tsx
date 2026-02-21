import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/react-app/lib/utils";
import { io } from "socket.io-client";
import {
  Activity,
  Thermometer,
  Gauge,
  Brain,
  Clock,
  TrendingUp,
  Zap,
  BarChart3,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Card } from "@/react-app/components/ui/card";
import ScrollReveal from "@/react-app/components/ScrollReveal";
import { Progress } from "@/react-app/components/ui/progress";
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
    const [healthScore, setHealthScore] = useState(100);
    const [diagnosis, setDiagnosis] = useState("");
    const [preventive, setPreventive] = useState("");
    const [prediction, setPrediction] = useState("");

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
      runAI(data);
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

    function runAI(data: MachineData) {
    let score = 100;

    const temp = Number(data.temperature);
    const vib = Number(data.vibration);
    const speed = Number(data.spindleSpeed);

    // Health Logic
    if (temp > 80) score -= 20;
    if (vib > 6) score -= 20;
    if (speed > 4800) score -= 15;

    setHealthScore(score);

    // Diagnosis
    if (vib > 6) {
      setDiagnosis("Minor Vibration Anomaly Detected");
    } else if (temp > 85) {
      setDiagnosis("Overheating Risk Detected");
    } else {
      setDiagnosis("Motor Performance Normal");
    }

    // Preventive
    if (vib > 6) {
      setPreventive("Spindle bearing inspection within 48 hours");
    } else if (temp > 80) {
      setPreventive("Coolant system check within 1 week");
    } else {
      setPreventive("Routine monitoring recommended");
    }

    // Future Prediction
    if (vib > 7) {
      setPrediction("Spindle Bearing: 30 days remaining");
    } else if (temp > 90) {
      setPrediction("Motor Failure Risk: 20 days remaining");
    } else {
      setPrediction("All components stable (120+ days life)");
    }
  }

  const healthColor =
    healthScore > 85
      ? "text-green-600"
      : healthScore > 65
      ? "text-amber-600"
      : "text-red-600";

   return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

           {/* Header */}
        <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Analytics Dashboard</h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-gray-600 text-lg"
            >
              Real-time monitoring and AI-powered insights for your CNC machine
            </motion.p>
          </div>
        </section>



          {/* Health Score */}
          <Card className="p-6">
            <h3 className="text-sm uppercase font-semibold text-gray-500 mb-3">
              Overall Health Score
            </h3>
            <div className={`text-4xl font-bold ${healthColor}`}>
              {healthScore}%
            </div>
          </Card>

          {/* Live Sensor Dashboard */}
          <Card className="p-6">
            <h3 className="text-sm uppercase font-semibold text-gray-500 mb-6">
              Live Sensor Dashboard
            </h3>

            {!liveData ? (
              <p className="text-gray-500">Waiting for live data...</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer size={18} />
                    <span className="text-sm">Temperature</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {liveData.temperature} °C
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge size={18} />
                    <span className="text-sm">Vibration</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {liveData.vibration} mm/s
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity size={18} />
                    <span className="text-sm">Spindle Speed</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {liveData.spindleSpeed} RPM
                  </div>
                </div>
              </div>
            )}
          </Card>

   {/* Middle Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* AI Diagnosis */}
              <ScrollReveal>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <Brain className="w-5 h-5 text-primary" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-900">AI Diagnosis</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <motion.div 
                        className="p-4 rounded-xl bg-amber-50 border border-amber-200"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-amber-800">Minor Vibration Anomaly Detected</h4>
                            <p className="text-sm text-amber-700 mt-1">
                              Spindle bearing showing 12% higher vibration than baseline. Pattern suggests early wear stage.
                            </p>
                            <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Detected 2 hours ago
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="p-4 rounded-xl bg-green-50 border border-green-200"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-800">Motor Performance Normal</h4>
                            <p className="text-sm text-green-700 mt-1">
                              All motor parameters within optimal range. Efficiency at 96%.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              </ScrollReveal>

              {/* Preventive Maintenance */}
              <ScrollReveal delay={0.1}>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-gray-900">Preventive Maintenance</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { task: "Spindle bearing inspection", priority: "High", due: "Within 48 hours", progress: 0 },
                        { task: "Coolant system check", priority: "Medium", due: "Within 1 week", progress: 30 },
                        { task: "Axis lubrication", priority: "Low", due: "Within 2 weeks", progress: 60 },
                      ].map((item, index) => (
                        <motion.div 
                          key={index} 
                          className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                          whileHover={{ scale: 1.01 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{item.task}</span>
                            <span className={cn(
                              "text-xs font-medium px-2 py-1 rounded-full",
                              item.priority === "High" ? "bg-red-100 text-red-700" :
                              item.priority === "Medium" ? "bg-amber-100 text-amber-700" :
                              "bg-green-100 text-green-700"
                            )}>
                              {item.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{item.due}</p>
                          <Progress value={item.progress} className="h-1.5" />
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </ScrollReveal>
            </div>

            {/* Bottom Row */}
            <div className="grid gap-6">
              {/* Future Failure Prediction */}
              <ScrollReveal>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-gray-900">Future Failure Prediction</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { name: "Spindle Bearing", days: "45 days", condition: "if not maintained", color: "text-amber-600" },
                        { name: "Drive Motor", days: "180+ days", condition: "excellent condition", color: "text-green-600" },
                        { name: "Coolant Pump", days: "120+ days", condition: "good condition", color: "text-green-600" },
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Estimated life remaining</p>
                          </div>
                          <div className="text-right">
                            <p className={cn("text-2xl font-bold", item.color)}>{item.days}</p>
                            <p className="text-xs text-gray-500">{item.condition}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </ScrollReveal>

            </div>
    
      </div>
    </PageTransition>
  );
}