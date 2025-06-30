// src/pages/Toolkit.jsx
import { Download } from "lucide-react";
import pdfFile from "../assets/tech_free_quest_guide.pdf";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Toolkit() {
  const tools = [
    {
      title: "📵 No-Phone Hour Challenge",
      desc: "Pick one hour a day to disconnect completely from your devices and reflect on how it feels.",
    },
    {
      title: "🧘‍♀️ Mindful Breaks",
      desc: "Take short, mindful breaks every hour for breathing or stretching without your phone.",
    },
    {
      title: "📓 Offline Journaling",
      desc: "Use a physical notebook to write your thoughts and feelings instead of typing.",
    },
    {
      title: "⏳ Screen Time Tracker",
      desc: "Track your screen time and gradually reduce it by 10-15 minutes each day.",
    },
    {
      title: "🌲 Tech-Free Weekend Quest",
      desc: "Challenge yourself to spend a half or full day away from screens. Use the PDF guide for ideas.",
    },
  ];

  const handleDownload = async () => {
    const response = await fetch(pdfFile);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tech_free_quest_guide.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <><Navbar />
    <section className="min-h-screen px-6 py-16 bg-gradient-to-br from-white via-cyan-50 to-white mt-8">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold text-cyan-700 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          🧰 Digital Detox Toolkit
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Use these powerful tools to take control of your digital habits and feel better every day.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-cyan-700 mb-2">{tool.title}</h3>
              <p className="text-gray-700 text-sm">{tool.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + tools.length * 0.1 }}
        >
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition"
          >
            <Download size={18} /> Download Tech-Free Quest Guide (PDF)
          </button>
        </motion.div>
      </motion.div>
    </section>
    <Footer/>
    </>
  );
}
