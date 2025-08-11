import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { BASE_URL } from "../config.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score;
  const maxScore = 50;
  const resultRef = useRef();

  const [resultData, setResultData] = useState({
    zone: "",
    badge: "",
    emoji: "",
    description: "",
    action: "",
  });

  useEffect(() => {
    if (score == null) return navigate("/selftest");

    let zone = "", badge = "", emoji = "", feedback = "", action = "";

    if (score >= 37) {
      zone = "Golden Star Zone";
      badge = "🌟 Golden Star";
      emoji = "🔴";
      feedback = "You might be experiencing digital dependency, low self-esteem, or disconnection. It’s essential to take action.";
      action = "We strongly recommend chatting with a mentor and completing the Digital Emotional Toolkit.";
    } else if (score >= 21) {
      zone = "Silver Zone";
      badge = "🥈 Silver";
      emoji = "🟡";
      feedback = "You show signs of moderate digital overuse. Watch for FOMO, poor sleep, or emotional instability.";
      action = "Consider talking to a mentor and trying the Digital Emotional Toolkit.";
    } else {
      zone = "Bronze Zone";
      badge = "🥉 Bronze";
      emoji = "🟢";
      feedback = "You have a balanced relationship with technology and healthy digital habits.";
      action = "You're doing well! Still, you can try the Toolkit and optionally chat with a mentor.";
    }

    setResultData({ zone, badge, emoji, description: feedback, action });

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios
        .post(`${BASE_URL}/api/score`, {
          userId: user.id,
          score,
          zone,
          feedback,
        })
        .catch((err) => console.error("Score save failed:", err));
    }
  }, [score, navigate]);
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const downloadPDF = () => {
    html2canvas(resultRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("digital-wellness-report.pdf");
    });
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-white via-[#e6f9f2] to-white px-4 py-20 text-gray-800">
        <motion.div
          ref={resultRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-green-100"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#16a34a] mb-6">
            🎯 Your Digital Wellness Score
          </h2>

          <p className="text-6xl font-bold text-gray-900 mb-4">
            {score} / {maxScore}
          </p>

          <h3 className="text-xl sm:text-2xl text-[#0e7490] font-semibold mb-2">
            {resultData.badge} {resultData.emoji}
          </h3>
          <p className="text-gray-700 text-base mb-4">{resultData.description}</p>
          <p className="text-[#0e7490] text-sm">{resultData.action}</p>

          <div className="mt-8 text-left text-sm text-gray-700 space-y-2">
            <h4 className="font-semibold text-[#0e7490]">📌 Insights Based On:</h4>
            <ul className="list-disc list-inside">
              <li>Emotional health & sleep cycles</li>
              <li>Social media usage & online behavior</li>
              <li>FOMO, screen time, and digital identity</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mt-10">
            <button
              onClick={downloadPDF}
              className="bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-2 rounded-md shadow transition"
            >
              📄 Download PDF
            </button>

            <button
              onClick={() => navigate("/")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md shadow transition"
            >
              ⬅ Back to Home
            </button>

            {/* <button
              onClick={() => navigate("/chat")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow transition"
            >
              💬 Talk to Mentor
            </button> */}

            <button
              onClick={() => navigate("/toolkit")}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md shadow transition"
            >
              🧠 Try Emotional Toolkit
            </button>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
