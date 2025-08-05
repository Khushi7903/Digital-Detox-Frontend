import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { BASE_URL } from "../config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

// Helper to generate zone data
const getZoneDetails = (score) => {
  if (score >= 37) {
    return {
      zone: "Golden Star Zone",
      badge: "🌟 Golden Star",
      emoji: "🔴",
      description:
        "You might be experiencing digital dependency, low self-esteem, or disconnection. It’s essential to take action.",
      action:
        "We strongly recommend chatting with a mentor and completing the Digital Emotional Toolkit.",
    };
  } else if (score >= 21) {
    return {
      zone: "Silver Zone",
      badge: "🥈 Silver",
      emoji: "🟡",
      description:
        "You show signs of moderate digital overuse. Watch for FOMO, poor sleep, or emotional instability.",
      action: "Consider talking to a mentor and trying the Digital Emotional Toolkit.",
    };
  } else {
    return {
      zone: "Bronze Zone",
      badge: "🥉 Bronze",
      emoji: "🟢",
      description:
        "You have a balanced relationship with technology and healthy digital habits.",
      action: "You're doing well! Still, you can try the Toolkit and optionally chat with a mentor.",
    };
  }
};

export default function ScoresPage() {
  const [scores, setScores] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios
        .get(`${BASE_URL}/api/score/${user.id}`)
        .then((res) => setScores(res.data))
        .catch((err) => console.error("Failed to load scores", err));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const normalizeScore = (score, ageGroup) => {
    const maxScore = ageGroup === "5-12" ? 30 : 50;
    return Math.round((score / maxScore) * 100);
  };

  const getBadge = () => {
    if (scores.length === 0) return "No Badge Yet";
    const lastScore = scores[scores.length - 1];
    const zoneData = getZoneDetails(lastScore.score);
    return `${zoneData.badge} ${zoneData.emoji}`;
  };

  const lineChartData = {
    labels: scores.map((s, i) => `Attempt ${i + 1}`),
    datasets: [
      {
        label: "Score (%)",
        data: scores.map((s) => normalizeScore(s.score, s.ageGroup)),
        borderColor: "#16a34a",
        backgroundColor: "rgba(22,163,74,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["Bronze Zone", "Silver Zone", "Golden Star Zone"],
    datasets: [
      {
        label: "Zone Distribution",
        data: [
          scores.filter((s) => getZoneDetails(s.score).zone === "Bronze Zone").length,
          scores.filter((s) => getZoneDetails(s.score).zone === "Silver Zone").length,
          scores.filter((s) => getZoneDetails(s.score).zone === "Golden Star Zone").length,
        ],
        backgroundColor: ["#16a34a", "#facc15", "#dc2626"],
        borderColor: ["#15803d", "#ca8a04", "#b91c1c"],
        borderWidth: 1,
      },
    ],
  };

  const downloadPDF = () => {
    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("score-history.pdf");
    });
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen px-4 py-16 bg-gradient-to-br from-white via-[#e6f9f2] to-white text-gray-800">
        <motion.div
          className="max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-green-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#16a34a] mb-8">
            📊 Your Score Summary
          </h2>

          {/* Badge Display */}
          <div className="text-center mb-10">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">🎖 Your Latest Badge</h3>
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold text-[#22c55e]"
            >
              {getBadge()}
            </motion.p>
          </div>

          {/* Charts Section */}
          <div
            ref={chartRef}
            className="flex flex-col lg:flex-row justify-between items-stretch gap-6 mb-12"
          >
            <div className="bg-white p-5 rounded-xl shadow-lg w-full lg:w-1/2 border border-green-100">
              <h4 className="font-semibold text-center text-gray-700 mb-3">📈 Progress Over Time</h4>
              <div className="h-[250px] sm:h-[280px]">
                <Line
                  data={lineChartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-lg w-full lg:w-1/2 border border-green-100">
              <h4 className="font-semibold text-center text-gray-700 mb-3">📊 Zone Breakdown</h4>
              <div className="h-[250px] sm:h-[280px]">
                <Pie
                  data={pieData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>

          {/* Individual Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scores.map((s, i) => {
              const zone = getZoneDetails(s.score);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-4 rounded-xl border border-green-100 shadow"
                >
                  <p className="font-medium text-gray-800">
                    <strong>Score:</strong> {normalizeScore(s.score, s.ageGroup)}%
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    <strong>Zone:</strong> {zone.badge} {zone.emoji}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    <strong>Feedback:</strong> {zone.description}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    <strong>Action:</strong> {zone.action}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(s.createdAt).toLocaleString()}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* PDF Button */}
          <div className="text-center mt-12">
            <button
              onClick={downloadPDF}
              className="bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-2 rounded-md text-sm shadow-md transition"
            >
              📥 Download PDF Report
            </button>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
