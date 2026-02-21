import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Eye, Activity, AlertTriangle, TrendingUp, ChevronRight, X, Thermometer, Gauge, Zap } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Card } from "@/react-app/components/ui/card";
import Navbar from "@/react-app/components/Navbar";
import PageTransition from "@/react-app/components/PageTransition";
import ScrollReveal from "@/react-app/components/ScrollReveal";
import { cn } from "@/react-app/lib/utils";

export default function DigitalTwinPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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
                <Box className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Digital Twin Workspace</h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-gray-600 text-lg ml-13"
            >
              Real-time 3D visualization of your CNC machine with AI-powered health insights
            </motion.p>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* 3D Visualization Placeholder - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-[600px] lg:h-[700px] border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center relative overflow-hidden mb-6">
                {/* Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(to right, #1e3a5f 1px, transparent 1px), linear-gradient(to bottom, #1e3a5f 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />
                
                {/* Animated Glow */}
                <div className="absolute inset-0">
                  <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                {/* Placeholder Content */}
                <div className="relative z-10 text-center">
                  <motion.div 
                    className="w-24 h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-6 mx-auto border border-gray-100"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box className="w-12 h-12 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">3D CNC Digital Twin</h3>
                  <p className="text-gray-500 max-w-sm mb-6">
                    Interactive 3D model visualization coming soon. Connect your CNC machine to see real-time component status.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-primary">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-green-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span>System Ready</span>
                  </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
              </Card>
            </motion.div>

            {/* Analytics Button */}
            <ScrollReveal>
              <div className="flex justify-center mb-8">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={() => setIsPanelOpen(true)}
                    className="bg-primary hover:bg-primary/90 h-12 text-base shadow-lg shadow-primary/25 group px-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                  >
                    View Live Analytics
                    <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: Activity, label: "Health Score", value: "94%", color: "text-green-600", bg: "bg-green-100" },
                { icon: Thermometer, label: "Temperature", value: "42°C", color: "text-blue-600", bg: "bg-blue-100" },
                { icon: Gauge, label: "Vibration", value: "0.3mm/s", color: "text-amber-600", bg: "bg-amber-100" },
                { icon: Zap, label: "Motor Load", value: "67%", color: "text-purple-600", bg: "bg-purple-100" },
              ].map((stat, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                    <Card className="p-4 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.bg)}
                          whileHover={{ scale: 1.1 }}
                        >
                          <stat.icon className={cn("w-5 h-5", stat.color)} />
                        </motion.div>
                        <div>
                          <p className="text-xs text-gray-500">{stat.label}</p>
                          <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Sliding Analytics Panel */}
        <AnimatePresence>
          {isPanelOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPanelOpen(false)}
              />
              
              {/* Panel */}
              <motion.div 
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Live Analytics</h2>
                    <motion.button 
                      onClick={() => setIsPanelOpen(false)}
                      className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </motion.button>
                  </div>

                  {/* Health Status */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="p-4 mb-4 bg-green-50 border-green-200">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-green-500"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="font-medium text-green-800">System Healthy</span>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Sensor Bars */}
                  <motion.div 
                    className="space-y-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Sensor Readings</h3>
                    
                    {[
                      { label: "Vibration", value: 35, unit: "mm/s", color: "bg-blue-500" },
                      { label: "Temperature", value: 62, unit: "°C", color: "bg-amber-500" },
                      { label: "Motor Load", value: 67, unit: "%", color: "bg-purple-500" },
                    ].map((sensor, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{sensor.label}</span>
                          <span className="font-medium">{sensor.value}{sensor.unit}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            className={cn("h-full rounded-full", sensor.color)}
                            initial={{ width: 0 }}
                            animate={{ width: `${sensor.value}%` }}
                            transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* AI Detected Issue */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="p-4 mb-4 border-amber-200 bg-amber-50">
                      <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        AI-Detected Issue
                      </h3>
                      <p className="text-sm text-amber-700">Minor spindle vibration pattern detected. Monitor recommended.</p>
                    </Card>
                  </motion.div>

                  {/* Preventive Action */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="p-4 mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        Preventive Maintenance
                      </h3>
                      <p className="text-sm text-gray-600">Schedule spindle bearing inspection within 48 hours to prevent potential issues.</p>
                    </Card>
                  </motion.div>

                  {/* Future Prediction */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Card className="p-4 bg-primary/5 border-primary/20">
                      <h3 className="font-semibold text-primary mb-2">Future Failure Prediction</h3>
                      <p className="text-sm text-gray-600">No critical failures predicted in the next 30 days based on current patterns.</p>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
