import { useState } from "react";
import { motion } from "framer-motion";
import contactImg from "../assets/contact-illustration.jpeg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    e.target.reset();
  };

  return (
    <>
      <Navbar />
      <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-[#fff5f5] via-white to-[#fff5f5] text-gray-800 scroll-smooth">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 items-start">
          {/* Image Section */}
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
              <span className="text-red-500">Contact</span> <span className="text-gray-700">Us</span>
            </h2>
            <p className="mt-3 text-sm text-gray-600 max-w-sm">
              Questions or suggestions? We're just a message away!
            </p>
            <ul className="mt-4 text-xs text-gray-700 space-y-1">
              <li>📍 TechPark, Bangalore</li>
              <li>📧 support@cyberwellness.ai</li>
              <li>📞 +91 98765 43210</li>
            </ul>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:col-span-2"
          >
            <h3 className="text-xl font-bold text-center text-red-500 mb-1">Let's Talk</h3>
            <p className="text-xs text-center text-gray-600 mb-4">
              Fill out the form below and we’ll get back to you soon.
            </p>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={submitted ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`mb-3 text-xs text-green-700 bg-green-100 border border-green-300 px-3 py-1 rounded-md ${submitted ? "block" : "hidden"}`}
            >
              ✅ Submitted successfully!
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <textarea
                name="message"
                required
                rows="3"
                placeholder="Your Message"
                className="w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-xs transition duration-300 ease-in-out"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
} 
