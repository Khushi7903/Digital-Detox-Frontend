// src/pages/Services.jsx
import { motion } from "framer-motion";
import {
  FaClipboardCheck,
  FaHeartbeat,
  FaUserFriends,
  FaMedkit,
  FaAward,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Services() {
  return (
    <>
      <Navbar />
      <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-[#ffeaea] via-white to-[#ffeaea] text-gray-800 scroll-smooth">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-red-500">Our</span> <span className="text-gray-700">Services</span>
            </h1>
            <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Tools, support, and tracking designed to help you thrive in your digital wellness journey.
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <FaClipboardCheck className="text-red-500 text-2xl" />,
                title: "Self Awareness Quiz",
                desc: "Identify your digital habits and how they impact your emotional state.",
              },
              {
                icon: <FaHeartbeat className="text-red-500 text-2xl" />,
                title: "Personal Reports",
                desc: "Understand your scores and get improvement suggestions with visual feedback.",
              },
              {
                icon: <FaMedkit className="text-red-500 text-2xl" />,
                title: "Healing Toolkit",
                desc: "Practice guided journaling, tech break challenges, and mindfulness exercises.",
              },
              {
                icon: <FaUserFriends className="text-red-500 text-2xl" />,
                title: "Buddy Check-Ins",
                desc: "Connect weekly with digital wellness buddies for support and progress reflection.",
              },
              {
                icon: <FaAward className="text-red-500 text-2xl" />,
                title: "Achievements & Rewards",
                desc: "Unlock digital wellness badges, celebrate milestones, and stay motivated.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl text-center"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}