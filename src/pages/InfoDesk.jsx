import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function InfoDesk() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen px-4 py-20 bg-gradient-to-br from-red-50 via-white to-red-50 text-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
            🔎 Info Desk
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Security Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 border border-red-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-red-500 mb-2">🔐 Security Info</h3>
              <p className="text-sm text-gray-700">
                Learn best practices to keep your digital presence secure. Use strong passwords, enable two-factor authentication, and stay vigilant about phishing and online scams. Our platform encourages mindful use of technology to protect your personal data.
              </p>
            </motion.div>

            {/* Law Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 border border-red-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-red-500 mb-2">⚖️ Law Info</h3>
              <p className="text-sm text-gray-700">
                Understand your digital rights and responsibilities. Be aware of cyber laws like IT Act 2000, data protection laws, and digital consent. We promote legal awareness for a safer digital environment.
              </p>
            </motion.div>

            {/* Psychology Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/80 border border-red-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-red-500 mb-2">🧠 Psychology Info</h3>
              <p className="text-sm text-gray-700">
                Explore how excessive screen time affects your mental health. Learn about digital burnout, cyberbullying impact, and ways to manage anxiety caused by online activities. Our content promotes digital mindfulness and well-being.
              </p>
            </motion.div>
          </div>

          {/* Join Section */}
          <div className="mt-14 text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-2">Join Our Cyber Therapy Programmes</h3>
            <p className="text-sm text-gray-700 max-w-2xl mx-auto mb-8">
              Be a part of our guided therapeutic journeys that focus on improving your digital habits, enhancing online etiquette, and promoting mental clarity in the digital world.
            </p>
          </div>

          {/* Therapy Programmes */}
          <div className="mt-6 flex flex-col md:flex-row justify-between gap-6 text-sm text-center">
            <div className="bg-white/70 border border-red-100 p-4 rounded-xl shadow w-full">
              ✅ <strong>Digital Detox Therapy</strong> (3-Day Programme)
            </div>
            <div className="bg-white/70 border border-red-100 p-4 rounded-xl shadow w-full">
              ✅ <strong>Cyber Wellness</strong> (7-Day Programme)
            </div>
            <div className="bg-white/70 border border-red-100 p-4 rounded-xl shadow w-full">
              ✅ <strong>Netiquettes & Cyber Detox</strong> (10-Day Programme)
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
