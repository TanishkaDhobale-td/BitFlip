import { Link } from "react-router";
import { motion } from "framer-motion";
import { Brain, Shield, Wrench, ArrowRight, Activity, Cpu, BarChart3, Zap } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import Navbar from "@/react-app/components/Navbar";
import TrustBadge from "@/react-app/components/TrustBadge";
import PageTransition from "@/react-app/components/PageTransition";
import ScrollReveal from "@/react-app/components/ScrollReveal";
import AnimatedCard from "@/react-app/components/AnimatedCard";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
              >
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Next-Gen Industrial Intelligence</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                AI-Powered CNC{" "}
                <span className="text-primary relative">
                  Health Monitoring
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10C50 4 150 2 298 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30" />
                  </svg>
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                Transform your CNC training environment with predictive maintenance and intelligent safety systems. 
                Detect failures before they happen and ensure a safe learning experience.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              >
                <Link to="/digital-twin">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 text-lg px-8 h-14 group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30">
                      Explore Digital Twin
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/analytics">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" variant="outline" className="border-2 text-lg px-8 h-14 hover:bg-primary/5 transition-all duration-300">
                      View Analytics
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                <TrustBadge icon={Brain} label="AI-Powered" />
                <TrustBadge icon={Wrench} label="Predictive Maintenance" />
                <TrustBadge icon={Shield} label="Training Safe" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  From sensor data to actionable insights in milliseconds
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: Cpu,
                  title: "Data Collection",
                  description: "IoT sensors continuously monitor vibration, temperature, motor load, and other critical parameters.",
                },
                {
                  step: "02",
                  icon: Brain,
                  title: "AI Analysis",
                  description: "Machine learning models analyze patterns in real-time to detect anomalies and predict failures.",
                },
                {
                  step: "03",
                  icon: BarChart3,
                  title: "Actionable Insights",
                  description: "Receive instant alerts, maintenance recommendations, and safety warnings through the dashboard.",
                },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <motion.div 
                    className="relative"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full hover:shadow-xl transition-shadow duration-300">
                      <div className="text-6xl font-bold text-primary/10 absolute top-4 right-6">
                        {item.step}
                      </div>
                      <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
                    )}
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Ready to Transform Your CNC Training?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Experience the future of predictive maintenance and training safety with our AI-powered platform.
              </p>
              <Link to="/digital-twin">
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className="inline-block"
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 text-lg px-10 h-14 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30">
                    Get Started Today
                  </Button>
                </motion.div>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-lg text-white">CNC AI Monitor</span>
              </motion.div>
              <p className="text-sm">© 2024 CNC AI Health Monitoring System. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
