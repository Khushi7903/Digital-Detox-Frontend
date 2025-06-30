import { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RegisterMentor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    about: "",
    linkedin: "",
    role: "volunteer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("✅ Submitted successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      about: "",
      linkedin: "",
      role: "volunteer",
    });
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen pt-20 px-4 bg-gradient-to-br from-[#fff5f5] via-white to-[#fff5f5] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-red-600">
            Register With Us
          </h2>
          <p className="text-center text-gray-700 text-sm">
            Join our mission to support mental well-being. Whether you're a
            passionate counselor or a dedicated volunteer, your time and
            expertise can make a real difference.
          </p>

          {/* 🔘 Role Toggle */}
          <div className="flex justify-center gap-4">
            {["volunteer", "counselor"].map((r) => (
              <button
                key={r}
                onClick={() => setFormData((prev) => ({ ...prev, role: r }))}
                className={`px-4 py-1 rounded-full border text-sm font-medium transition ${
                  formData.role === r
                    ? "bg-red-500 text-white"
                    : "border-red-500 text-red-500 hover:bg-red-100"
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {/* 📄 Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn Profile URL"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
            />
            <input
              type="text"
              name="experience"
              placeholder="Years of Experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
            />
            <textarea
              name="about"
              placeholder="Why do you want to join?"
              value={formData.about}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 text-sm resize-none"
            />

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Submit
            </button>
          </form>
        </motion.div>
        <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      </section>
      <Footer />
    </>
  );
}
