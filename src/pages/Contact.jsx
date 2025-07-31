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
        toast.success("Submitted successfully! We'll get back to you soon.", {
          position: "top-right",
          autoClose: 2500,
          className: "bg-white border border-yellow-700 text-gray-800 h-6",
          bodyClassName: "text-sm",
          icon: "✅",
        });
        e.target.reset();
      } else {
        toast.error(`❌ ${data.error || "Submission failed. Please try again."}`);
      }
    } catch (error) {
      toast.error("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="pt-24 pb-20 px-4 md:px-10 lg:px-20 bg-gradient-to-br from-[#fff5f5] via-white to-[#fff5f5] text-gray-800 scroll-smooth">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* 🔸 Left Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center px-4 sm:px-6"
          >
            <img
              src={contactImg}
              alt="Contact Illustration"
              className="rounded-xl shadow-xl w-64 h-64 object-cover mb-6"
            />
            <h2 className="text-3xl font-bold">
              <span className="text-[#B8860B]">Contact</span>{" "}
              <span className="text-gray-700">Us</span>
            </h2>
            <p className="mt-3 text-sm text-gray-600 max-w-md">
              Don’t want to talk to a counselor? No worries! Just fill this form,
              and we’ll get back to you via email. Or write to us at{" "}
              <span className="text-[#B8860B] font-semibold">
                Surakshabuddyindia@gmail.com
              </span>
              .
            </p>
            <ul className="mt-4 text-sm text-gray-700 space-y-1">
              <li>📍 Delhi, India</li>
              <li>📧 Surakshabuddyindia@gmail.com</li>
            </ul>
          </motion.div>

          {/* 🔸 Right Section (Form) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full"
          >
            <h3 className="text-xl font-bold text-center text-[#B8860B] mb-2">
              Just Reach Out
            </h3>
            <p className="text-sm text-center text-gray-600 mb-6">
              Fill this short form to share your concern. We’ll reply via email — no sessions, no pressure.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              />
              <input
                type="text"
                name="query"
                required
                placeholder="Your Query"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              />
              <textarea
                name="message"
                rows="3"
                placeholder="Additional Message (optional)"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8860B] resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className={`px-12 py-3 flex items-center justify-center bg-[#B8860B] text-white rounded-md text-sm font-medium transition duration-300 ${loading ? "bg-opacity-70 cursor-not-allowed" : "hover:bg-[#a06d00]"} mx-auto`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    Please wait...
                  </>
                ) : (
                  "Submit"
                )}
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
