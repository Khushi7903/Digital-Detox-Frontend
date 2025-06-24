import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaIdCard } from "react-icons/fa";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", id: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setFormData({ name: "", email: "", password: "", id: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? `${BASE_URL}/api/auth/login` : `${BASE_URL}/api/auth/signup`;

    try {
      const res = await axios.post(url, { ...formData, role });
      setMessage(res.data.message);

      localStorage.setItem("user", JSON.stringify({
        id: formData.id,
        role,
        email: formData.email,
      }));

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-[#fff5f5] via-white to-[#fff5f5] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-md w-full bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">
            <span className="text-red-500">{isLogin ? "Login" : "Sign Up"}</span> <span className="text-gray-700">as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
          </h2>

          <div className="flex justify-center gap-4">
            {["student", "teacher"].map((r) => (
              <button
                key={r}
                className={`px-4 py-1 rounded-full border text-sm font-medium transition ${role === r ? "bg-red-500 text-white" : "border-red-500 text-red-500 hover:bg-red-100"}`}
                onClick={() => setRole(r)}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  required
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-red-400"
                />
              </div>
            )}
            <div className="relative">
              <FaIdCard className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="id"
                placeholder={`${role === "student" ? "Student" : "Teacher"} ID`}
                value={formData.id}
                required
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                required
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                required
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-red-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {message && (
            <p className="text-sm text-center text-red-600 mt-2">
              {message}
            </p>
          )}

          <p className="text-xs text-center text-gray-600 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
            <button onClick={handleToggle} className="text-red-600 underline">
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
