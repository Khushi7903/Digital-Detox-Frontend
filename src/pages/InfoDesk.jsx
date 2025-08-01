import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const InfoCard = ({ title, icon, points }) => (
  <div className="bg-white border border-gray-200 rounded-xl px-5 py-6 shadow-sm text-left hover:shadow-md transition duration-300 h-full">
    <h3 className="text-xl font-semibold text-[#B8860B] mb-3">
      {icon} {title}
    </h3>
    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
      {points.map((point, idx) => (
        <li key={idx}>{point}</li>
      ))}
    </ul>
  </div>
);

export default function InfoDesk() {
  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800 px-4 md:px-16 py-10 mt-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-black"
        >
          🔎 Info Desk
        </motion.h1>

        {/* Intro */}
        <p className="text-sm md:text-base text-justify max-w-5xl mx-auto text-gray-600 leading-relaxed mb-12">
          The <span className="text-[#B8860B] font-semibold">Info Desk</span> serves as your one-stop destination for essential knowledge in the fields of Cyber Security, Cyber Law, and Digital Psychology. Our goal is to empower users with tools and awareness to navigate the digital space safely and mindfully.
        </p>

        {/* Grid Info Sections */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          <InfoCard
            title="Security Info"
            icon="🔐"
            points={[
              "Use unique, strong passwords for each account.",
              "Enable two-factor authentication (2FA).",
              "Avoid phishing links and suspicious downloads.",
              "Keep systems, browsers, and antivirus updated.",
            ]}
          />
          <InfoCard
            title="Law Info"
            icon="⚖️"
            points={[
              "Understand the IT Act 2000 and its amendments.",
              "Learn about cybercrime reporting procedures.",
              "Be aware of legal rights around digital consent.",
              "Avoid spreading misinformation or illegal content.",
            ]}
          />
          <InfoCard
            title="Psychology Info"
            icon="🧠"
            points={[
              "Limit screen time to avoid digital fatigue.",
              "Recognize signs of cyberbullying impact.",
              "Practice digital detox to manage anxiety.",
              "Foster healthy tech-life balance routines.",
            ]}
          />
        </div>

        {/* Join Programmes */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-[#B8860B] mb-4">
            🌐 Join Our Cyber Therapy Programmes
          </h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Be part of structured, expert-led programmes that enhance your digital awareness, reduce mental stress, and build responsible online behavior.
          </p>
        </div>

        {/* Therapy Programme Cards */}
        <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto text-sm">
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow text-center flex-1 hover:shadow-md">
            ✅ <strong className="text-[#B8860B]">Digital Detox Therapy</strong>
            <p className="text-xs text-gray-600 mt-2">
              A 3-day mindfulness workshop to help you unplug and reset your online habits.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow text-center flex-1 hover:shadow-md">
            ✅ <strong className="text-[#B8860B]">Cyber Wellness</strong>
            <p className="text-xs text-gray-600 mt-2">
              A 7-day guide to digital safety, responsible surfing, and tech etiquette.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow text-center flex-1 hover:shadow-md">
            ✅ <strong className="text-[#B8860B]">Netiquettes & Cyber Detox</strong>
            <p className="text-xs text-gray-600 mt-2">
              A 10-day programme blending emotional well-being with net behavior strategies.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
