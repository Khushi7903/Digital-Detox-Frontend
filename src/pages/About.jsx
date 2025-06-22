import { motion } from "framer-motion";
import featureImg from "../assets/feature-illustration.png";
import { FaBrain, FaHandsHelping, FaTools, FaRobot, FaChartLine } from "react-icons/fa";

const featureItems = [
  {
    icon: <FaBrain className="text-cyan-600 text-xl" />,
    title: "Cyber Psychology Assessment",
    desc: "Evaluate screen time, digital behavior, and emotional health via 20 expert-crafted questions.",
  },
  {
    icon: <FaChartLine className="text-cyan-600 text-xl" />,
    title: "Results & Insights",
    desc: "Get a visual breakdown of your digital habits with expert suggestions.",
  },
  {
    icon: <FaTools className="text-cyan-600 text-xl" />,
    title: "Detox Toolkit",
    desc: "Use journaling, breathing guides, and daily challenges tailored to you.",
  },
  {
    icon: <FaHandsHelping className="text-cyan-600 text-xl" />,
    title: "Mentor & Buddy System",
    desc: "Get emotional check-ins with mentors who care.",
  },
  {
    icon: <FaRobot className="text-cyan-600 text-xl" />,
    title: "AI Smart Suggestions",
    desc: "Receive personalized wellness tips with GPT-powered logic.",
  },
];

export default function AboutUs() {
  return (
    <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-white via-cyan-50 to-white text-gray-800">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-600">About Us</h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            We help people build healthier online habits using a mix of psychology, technology, and real support.
          </p>
        </motion.div>

        {/* What We Do */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-xl font-semibold text-cyan-700">What We Do</h3>
            <ul className="space-y-3 text-sm sm:text-base text-gray-700">
              <li className="flex items-start">
                <FaBrain className="text-cyan-600 mt-1 mr-2" />
                Analyze digital behavior and emotional well-being.
              </li>
              <li className="flex items-start">
                <FaTools className="text-cyan-600 mt-1 mr-2" />
                Daily detox tools and mindfulness exercises.
              </li>
              <li className="flex items-start">
                <FaHandsHelping className="text-cyan-600 mt-1 mr-2" />
                Live mentor support and guided emotional journeys.
              </li>
              <li className="flex items-start">
                <FaRobot className="text-cyan-600 mt-1 mr-2" />
                AI-based suggestions for healthier routines.
              </li>
              <li className="flex items-start">
                <FaChartLine className="text-cyan-600 mt-1 mr-2" />
                Progress tracking through mood and usage analytics.
              </li>
            </ul>
          </div>

          <div className="text-center">
            <img
              src={featureImg}
              alt="What we do"
              className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm mx-auto"
            />
          </div>
        </motion.div>

        {/* Features - Cards Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-cyan-700 mb-8">Explore Our Key Features</h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featureItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/90 shadow-md rounded-xl p-5 text-left space-y-2 hover:shadow-xl transition"
              >
                <div className="text-cyan-600">{item.icon}</div>
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-cyan-700 mb-3">Built With Modern Tech</h3>
          <p className="text-sm sm:text-base text-gray-700">
            We use <strong>React.js, Node.js, Firebase</strong>, and <strong>MongoDB</strong> for seamless performance. Our AI tools are powered by GPT for intelligent feedback. Hosted globally on Vercel.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
