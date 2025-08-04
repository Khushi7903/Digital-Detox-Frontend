// src/pages/Toolkit.jsx
import { useEffect } from "react";
import { Download } from "lucide-react";
import pdfFile from "../assets/tech_free_quest_guide.pdf";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Toolkit() {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <>
      <Navbar />
      <section className="min-h-screen px-6 md:px-16 py-20 bg-gradient-to-b from-white via-blue-50 to-green-50 text-gray-800 pt-28">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            🧰 Digital Detox Toolkit
          </motion.h1>

          <motion.p
            className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Use these science-backed tools to take control of your digital habits and improve your mental clarity, productivity, and emotional well-being.
          </motion.p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-cyan-700 mb-2">{tool.title}</h3>
                <p className="text-gray-700 text-sm">{tool.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + tools.length * 0.1 }}
          >
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-[#0D9488] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0c7a72] transition duration-300"
            >
              <Download size={18} />
              Download Tech-Free Quest Guide (PDF)
            </button>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
