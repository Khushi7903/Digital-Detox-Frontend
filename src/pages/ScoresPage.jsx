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
  Title
} from "chart.js";
import { BASE_URL } from "../config.js"
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
    if (highest <= 45) return "Zen Starter";
    else if (highest <= 70) return "FOMO Fighter";
    else return "Detox Hero";
  };

  const lineChartData = {
    labels: scores.map((s, i) => `Test ${i + 1}`),
    datasets: [
      {
        label: "Score",
        data: scores.map((s) => s.score),
        borderColor: "#06b6d4",
        tension: 0.4,
        fill: false,
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
        backgroundColor: ["#10b981", "#facc15", "#ef4444"],
        borderColor: ["#047857", "#eab308", "#dc2626"],
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
    <><Navbar />
    <section className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-white px-4 py-16">
      <motion.div
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-cyan-700 mb-6">📊 Your Score History</h2>

        {/* Badge */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">🏅 Badge Earned</h3>
          <p className="text-cyan-600 text-lg">{getBadge()}</p>
        </div>

        {/* Chart Area */}
        <div
          ref={chartRef}
          className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10"
        >
          <div className="bg-white p-4 rounded-lg shadow w-full md:w-1/2">
            <h4 className="font-medium text-center text-gray-600 mb-2">Line Chart</h4>
            <div className="h-[200px]">
              <Line
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow w-full md:w-1/2">
            <h4 className="font-medium text-center text-gray-600 mb-2">Pie Chart</h4>
            <div className="h-[200px]">
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }} />
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
              className="bg-white/90 p-4 rounded shadow-md"
            >
              <p><strong>Score:</strong> {s.score} ({s.zone})</p>
              <p><strong>Feedback:</strong> {s.feedback}</p>
              <p className="text-gray-500 text-sm">{new Date(s.createdAt).toLocaleString()}</p>
            </motion.div>
          ))}
        </div>

        {/* PDF Button */}
        <div className="text-center mt-10">
          <button
            onClick={downloadPDF}
            className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition"
          >
            📄 Download PDF Report
          </button>
        </div>
      </motion.div>
    </section>
    <Footer/>
    </>
  );
}
