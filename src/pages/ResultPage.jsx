// src/pages/ResultPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { BASE_URL } from "../config.js"
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score;
  const resultRef = useRef();

  const [resultData, setResultData] = useState({
    zone: "",
    emoji: "",
    description: ""
  });

  useEffect(() => {
    if (!score) return navigate("/selftest");

    let zone = "", feedback = "", emoji = "";

    if (score <= 45) {
      zone = "✅ Safe";
      emoji = "🟢";
      feedback = "Healthy digital use, strong emotional regulation.";
    } else if (score <= 70) {
      zone = "⚠ Warning";
      emoji = "🟡";
      feedback = "Signs of mild dependency, FOMO, anxiety, poor sleep.";
    } else {
      zone = "🚨 Danger";
      emoji = "🔴";
      feedback = "High digital addiction, self-esteem issues, isolation.";
    }

    setResultData({ zone, emoji, description: feedback });

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios.post(`${BASE_URL}/api/score`, {
        userId: user.id,
        score,
        zone,
        feedback
      }).catch((err) => console.error("Score save failed:", err));
    }
  }, [score, navigate]);

  const downloadPDF = () => {
    html2canvas(resultRef.current).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("result-report.pdf");
    });
  };

  return (
    <><Navbar />
    <section className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-white px-4 py-20">
      <motion.div
        ref={resultRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 md:p-10 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-700 mb-4">
          🎯 Your Digital Wellness Score
        </h2>

        <p className="text-6xl font-bold text-gray-900 mb-4">{score} / 100</p>

        <h3 className="text-xl text-cyan-600 font-semibold">
          {resultData.zone} {resultData.emoji}
        </h3>
        <p className="text-gray-700 mt-2">{resultData.description}</p>

        <div className="text-left mt-8 space-y-3 text-sm text-gray-700">
          <h4 className="font-semibold text-cyan-700">📌 Insights Based On:</h4>
          <ul className="list-disc list-inside">
            <li>Emotional health & sleep cycles</li>
            <li>Social media usage & online behavior</li>
            <li>FOMO, screen time, and digital identity</li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
          <button
            onClick={downloadPDF}
            className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition"
          >
            📄 Download PDF
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            ⬅ Back to Home
          </button>

          {resultData.zone.includes("Danger") && (
            <button
              onClick={() => navigate("/chat")}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              🚨 Request Mentor Help Now
            </button>
          )}
        </div>
      </motion.div>
    </section>
    <Footer/></>
  );
}
