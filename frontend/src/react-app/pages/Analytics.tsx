import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Activity, Thermometer, Gauge, Zap, AlertTriangle, 
  TrendingUp, Brain, CheckCircle, Clock, BarChart3 
} from "lucide-react";
import { Card } from "@/react-app/components/ui/card";
import { Progress } from "@/react-app/components/ui/progress";
import Navbar from "@/react-app/components/Navbar";
import PageTransition from "@/react-app/components/PageTransition";
import ScrollReveal from "@/react-app/components/ScrollReveal";
import { cn } from "@/react-app/lib/utils";

export default function AnalyticsPage() {
  const [sensorData, setSensorData] = useState({
    vibration: 35,
    temperature: 42,
    motorLoad: 67,
    spindleSpeed: 78,
  });

  const [healthScore, setHealthScore] = useState(94);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        vibration: Math.max(20, Math.min(80, prev.vibration + (Math.random() - 0.5) * 10)),
        temperature: Math.max(35, Math.min(60, prev.temperature + (Math.random() - 0.5) * 5)),
        motorLoad: Math.max(40, Math.min(90, prev.motorLoad + (Math.random() - 0.5) * 8)),
        spindleSpeed: Math.max(60, Math.min(95, prev.spindleSpeed + (Math.random() - 0.5) * 6)),
      }));
      setHealthScore(prev => Math.max(85, Math.min(99, prev + (Math.random() - 0.5) * 3)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getHealthStatus = (score: number) => {
    if (score >= 90) return { label: "Healthy", color: "text-green-600", bg: "bg-green-100" };
    if (score >= 70) return { label: "Warning", color: "text-amber-600", bg: "bg-amber-100" };
    return { label: "Critical", color: "text-red-600", bg: "bg-red-100" };
  };

  const healthStatus = getHealthStatus(healthScore);

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

        {/* Main Content */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Top Row - Health Score & Status */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Health Score KPI */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className="p-6 md:col-span-1 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Overall Health Score</h3>
                  <div className="flex items-center gap-6">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          className="text-gray-200"
                        />
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          strokeLinecap="round"
                          className={cn(
                            healthScore >= 90 ? "text-green-500" : healthScore >= 70 ? "text-amber-500" : "text-red-500"
                          )}
                          initial={{ strokeDasharray: "0 352" }}
                          animate={{ strokeDasharray: `${healthScore * 3.52} 352` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span 
                          className="text-3xl font-bold text-gray-900"
                          key={Math.round(healthScore)}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {Math.round(healthScore)}%
                        </motion.span>
                      </div>
                    </div>
                    <div>
                      <motion.div 
                        className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium", healthStatus.bg, healthStatus.color)}
                        whileHover={{ scale: 1.05 }}
                      >
                        <CheckCircle className="w-4 h-4" />
                        {healthStatus.label}
                      </motion.div>
                      <p className="text-sm text-gray-500 mt-2">Last updated: Just now</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="md:col-span-2"
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Sensor Dashboard</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Gauge, label: "Vibration", value: sensorData.vibration.toFixed(1), unit: "mm/s", max: 100, color: "bg-blue-500" },
                      { icon: Thermometer, label: "Temperature", value: sensorData.temperature.toFixed(1), unit: "°C", max: 80, color: "bg-amber-500" },
                      { icon: Zap, label: "Motor Load", value: sensorData.motorLoad.toFixed(1), unit: "%", max: 100, color: "bg-purple-500" },
                      { icon: Activity, label: "Spindle Speed", value: sensorData.spindleSpeed.toFixed(1), unit: "%", max: 100, color: "bg-green-500" },
                    ].map((sensor, index) => (
                      <motion.div 
                        key={index} 
                        className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <sensor.icon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{sensor.label}</span>
                        </div>
                        <div className="flex items-baseline gap-1 mb-2">
                          <motion.span 
                            className="text-2xl font-bold text-gray-900"
                            key={sensor.value}
                            initial={{ scale: 1.05 }}
                            animate={{ scale: 1 }}
                          >
                            {sensor.value}
                          </motion.span>
                          <span className="text-sm text-gray-500">{sensor.unit}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            className={cn("h-full rounded-full", sensor.color)}
                            animate={{ width: `${(parseFloat(sensor.value) / sensor.max) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

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
        </section>
      </div>
    </PageTransition>
  );
}
