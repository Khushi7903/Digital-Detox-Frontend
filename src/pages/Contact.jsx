import { useState } from "react";
import { motion } from "framer-motion";
import contactImg from "../assets/contact-illustration.jpeg";

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    e.target.reset();
  };

  return (
    <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-white via-cyan-50 to-white text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10"
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-center"
        >
          <img
            src={contactImg}
            alt="Contact Illustration"
            className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm mx-auto"
          />
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-700 mb-2">Contact Us</h2>
            <p className="text-sm text-gray-600 mb-5">
              Have questions or feedback? We’d love to hear from you.
            </p>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={submitted ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`mb-4 text-sm text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded-md ${
                submitted ? "block" : "hidden"
              }`}
            >
              ✅ Your form has been submitted. We will get back to you shortly!
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <textarea
                name="message"
                required
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-md text-sm transition duration-300 ease-in-out"
              >
                Submit
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
