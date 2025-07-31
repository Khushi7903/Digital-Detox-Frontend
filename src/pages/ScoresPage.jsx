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
import { BASE_URL } from "../config.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

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

  const getBadge = () => {
    if (scores.length === 0) return "No Badge Yet";
    const highest = Math.max(...scores.map((s) => s.score));
    if (highest <= 45) return "🥉 Bronze Star";
    else if (highest <= 70) return "🥈 Silver Star";
    else return "🥇 Golden Star";
  };

  const lineChartData = {
    labels: scores.map((s, i) => `Test ${i + 1}`),
    datasets: [
      {
        label: "Score",
        data: scores.map((s) => s.score),
        borderColor: "#B8860B",
        backgroundColor: "#fdf6e3",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["Safe", "Warning", "Danger"],
    datasets: [
      {
        label: "Zone Distribution",
        data: [
          scores.filter((s) => s.zone.includes("Safe")).length,
          scores.filter((s) => s.zone.includes("Warning")).length,
          scores.filter((s) => s.zone.includes("Danger")).length,
        ],
        backgroundColor: ["#16a34a", "#eab308", "#dc2626"],
        borderColor: ["#065f46", "#ca8a04", "#b91c1c"],
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
      <section className="min-h-screen bg-gradient-to-br from-[#fdf8ee] via-white to-[#fdf8ee] px-4 py-16 text-gray-800">
        <motion.div
          className="max-w-6xl mx-auto bg-white/95 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-2xl border border-[#e5c97b]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-[#B8860B] mb-6">
            🌟 Your Score Summary
          </h2>

          {/* Badge */}
          <div className="text-center mb-10">
            <h3 className="text-xl font-semibold text-gray-700 mb-1">🎖 Earned Badge</h3>
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-[#B8860B] text-2xl font-bold"
            >
              {getBadge()}
            </motion.p>
          </div>

          {/* Chart Area */}
          <div
            ref={chartRef}
            className="flex flex-col lg:flex-row justify-between items-stretch gap-6 mb-10"
          >
            <div className="bg-white p-5 rounded-xl shadow-lg w-full lg:w-1/2 border border-[#f0e3c2]">
              <h4 className="font-medium text-center text-gray-600 mb-2">📈 Progress Over Time</h4>
              <div className="h-[220px]">
                <Line
                  data={lineChartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-lg w-full lg:w-1/2 border border-[#f0e3c2]">
              <h4 className="font-medium text-center text-gray-600 mb-2">📊 Zone Breakdown</h4>
              <div className="h-[220px]">
                <Pie
                  data={pieData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid gap-4">
            {scores.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-4 rounded-xl border border-[#f4e7c7] shadow-sm"
              >
                <p className="font-medium text-gray-800">
                  <strong>Score:</strong> {s.score} (<span className="capitalize">{s.zone}</span>)
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Feedback:</strong> {s.feedback}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(s.createdAt).toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>

          {/* PDF Button */}
          <div className="text-center mt-10">
            <button
              onClick={downloadPDF}
              className="bg-[#B8860B] hover:bg-[#a06d00] text-white px-6 py-2 rounded-md text-sm shadow transition"
            >
              📄 Download PDF Report
            </button>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
