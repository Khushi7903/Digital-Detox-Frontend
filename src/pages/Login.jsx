import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../config";

const AuthPage = () => {
  const [step, setStep] = useState("signup");
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState(localStorage.getItem("pendingUserId") || "");
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      localStorage.setItem("pendingUserId", userId);
    }
  }, [userId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, {
        ...form,
        role,
      });
      setUserId(res.data.userId);
      setStep("otp");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: form.email,
        password: form.password,
      });
      setUserId(res.data.userId);
      setStep("otp");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  const handleVerifyOTP = async () => {
    const finalUserId = userId || localStorage.getItem("pendingUserId");
    if (!finalUserId) return alert("User ID missing. Please try again.");

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
        userId: finalUserId,
        otp,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({ id: finalUserId, email: form.email }));
      localStorage.removeItem("pendingUserId");
      alert("Login successful! Redirecting...");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "OTP verification failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-center text-red-700 mb-6">
            Suraksha Buddy 
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {(step === "signup" || step === "login") && (
            <>
              {step === "signup" && (
                <>
                  <input
                    name="name"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 bg-gray-50"
                    onChange={handleChange}
                  />
                  <input
                    name="phone"
                    placeholder="Phone"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 bg-gray-50"
                    onChange={handleChange}
                  />
                </>
              )}
              <input
                name="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 bg-gray-50"
                onChange={handleChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-gray-50"
                onChange={handleChange}
              />

              <button
                onClick={step === "signup" ? handleSignup : handleLogin}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                {step === "signup" ? "Sign Up" : "Login"}
              </button>

              <p
                className="mt-3 text-sm text-red-600 text-center cursor-pointer hover:underline"
                onClick={() => {
                  setStep(step === "signup" ? "login" : "signup");
                  setForm({ name: "", email: "", phone: "", password: "" });
                }}
              >
                {step === "signup"
                  ? "Already have an account? Login"
                  : "New here? Sign up"}
              </p>
            </>
          )}

          {step === "otp" && (
            <>
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-gray-50"
              />
              <button
                onClick={handleVerifyOTP}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              >
                Verify OTP
              </button>
            </>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default AuthPage;
