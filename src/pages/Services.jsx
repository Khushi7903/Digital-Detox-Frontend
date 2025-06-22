// src/pages/Services.jsx
import { motion } from "framer-motion";
import { FaClipboardCheck, FaHeartbeat, FaUserFriends, FaMedkit, FaAward } from "react-icons/fa";

export default function Services() {
  return (
    <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-white via-cyan-50 to-white text-gray-800">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Page Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-600">
            Our Services
          </h1>
          <p className="mt-2 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            At CyberPsychology Detox, we offer tools, mentorship, and insights to help you lead a healthier digital life.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* 1. Assessment Tool */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/80 p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4 mb-3">
              <FaClipboardCheck className="text-cyan-600 text-2xl" />
              <h3 className="text-lg font-semibold text-cyan-700">Cyber Psychology Self-Test</h3>
            </div>
            <p className="text-sm text-gray-700">
              A 20-question diagnostic test that reveals how digital usage affects your emotions, habits, and mental well-being.
            </p>
          </motion.div>

          {/* 2. Results & Insights */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/80 p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4 mb-3">
              <FaHeartbeat className="text-cyan-600 text-2xl" />
              <h3 className="text-lg font-semibold text-cyan-700">Results & Insights</h3>
            </div>
            <p className="text-sm text-gray-700">
              Clear feedback categorized into Safe, Warning, and Danger zones, with actionable guidance and tips.
            </p>
          </motion.div>

          {/* 3. Detox Toolkit */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/80 p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4 mb-3">
              <FaMedkit className="text-cyan-600 text-2xl" />
              <h3 className="text-lg font-semibold text-cyan-700">Digital Detox Toolkit</h3>
            </div>
            <p className="text-sm text-gray-700">
              Use mindfulness prompts, screen-time trackers, breathing exercises, and weekend tech-free quests.
            </p>
          </motion.div>

          {/* 4. Mentor Chat */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/80 p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4 mb-3">
              <FaUserFriends className="text-cyan-600 text-2xl" />
              <h3 className="text-lg font-semibold text-cyan-700">Mentor & Buddy Chat</h3>
            </div>
            <p className="text-sm text-gray-700">
              Connect with a trained mentor for emotional support, guidance, and weekly mental wellness check-ins.
            </p>
          </motion.div>

          {/* 5. Gamified Progress */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/80 p-6 rounded-xl shadow-md md:col-span-2"
          >
            <div className="flex items-center gap-4 mb-3">
              <FaAward className="text-cyan-600 text-2xl" />
              <h3 className="text-lg font-semibold text-cyan-700">Gamified Progress Tracking</h3>
            </div>
            <p className="text-sm text-gray-700">
              Earn badges like “Zen Starter” and “Conscious Clicker.” Track visual mood charts and celebrate your digital wellness journey.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
