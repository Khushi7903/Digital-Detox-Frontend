import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroVideo from "../assets/cyber-bg.mp4";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Glass Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-[2px] z-10" />

      {/* Foreground Content */}
      <div className="relative z-20 w-full h-full flex items-center justify-center px-4">
        <motion.div
          className="bg-white/20 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg text-center text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Title */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-300 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Digital Detox
          </motion.h1>

          {/* Subheading */}
          <motion.h3
            className="text-sm sm:text-lg font-semibold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Reclaim Your Focus with CyberPsychology Detox
          </motion.h3>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link
              to="/test"
              className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-5 py-2 rounded-full"
            >
              Start Self-Test
            </Link>
            <Link
              to="/toolkit"
              className="bg-white/80 text-gray-900 text-sm px-5 py-2 rounded-full hover:bg-white"
            >
              Detox Toolkit
            </Link>
            <Link
              to="/chat"
              className="bg-white/80 text-gray-900 text-sm px-5 py-2 rounded-full hover:bg-white"
            >
              Talk to a Mentor / Buddy →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
