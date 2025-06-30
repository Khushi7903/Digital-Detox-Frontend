import { useState } from "react";
import { motion } from "framer-motion";
import contactImg from "../assets/contact-illustration.jpeg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../config";

export default function ContactUs() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      query: e.target.query.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Submitted successfully! We'll get back to you soon.", {
          position: "top-right",
          autoClose: 2500
        });
        e.target.reset();
      } else {
        toast.error(`❌ ${data.error || "Submission failed. Please try again."}`, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("❌ Server error. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-[#fff5f5] via-white to-[#fff5f5] text-gray-800 scroll-smooth">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 items-start">
          {/* 🔸 Image + Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center text-center lg:col-span-1"
          >
            <img
              src={contactImg}
              alt="Contact Illustration"
              className="rounded-xl shadow-lg w-56 h-56 object-cover mb-4"
            />
            <h2 className="text-3xl font-bold">
              <span className="text-red-500">Contact</span>{" "}
              <span className="text-gray-700">Us</span>
            </h2>
            <p className="mt-3 text-sm text-gray-600 max-w-sm">
              Don't want to talk to a counselor? No worries! Just fill this form,
              and we'll get back to you via email. You can also write to us at{" "}
              <span className="text-red-600 font-semibold">
                Surakshabuddyindia@gmail.com
              </span>
              .
            </p>
            <ul className="mt-4 text-xs text-gray-700 space-y-1">
              <li>📍 Delhi, India</li>
              <li>📧 Surakshabuddyindia@gmail.com</li>
            </ul>
          </motion.div>

          {/* 🔸 Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:col-span-2"
          >
            <h3 className="text-xl font-bold text-center text-red-500 mb-1">
              Just Reach Out
            </h3>
            <p className="text-xs text-center text-gray-600 mb-4">
              Fill this short form to share your concern, and we’ll reply via email
              — no sessions, no pressure.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                disabled={loading}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                disabled={loading}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                disabled={loading}
              />
              <input
                type="text"
                name="query"
                required
                placeholder="Your Query"
                className="w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                disabled={loading}
              />
              <textarea
                name="message"
                rows="3"
                placeholder="Additional Message (optional)"
                className="w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                disabled={loading}
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? "bg-red-400" : "bg-red-500 hover:bg-red-600"
                } text-white py-2 rounded-md text-xs transition duration-300 ease-in-out`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
      <ToastContainer />
    </>
  );
}
