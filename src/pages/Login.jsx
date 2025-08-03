import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const [step, setStep] = useState("signup");
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState(localStorage.getItem("pendingUserId") || "");
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


  useEffect(() => {
    if (userId) localStorage.setItem("pendingUserId", userId);
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error("⚠️ Please fill all signup fields.");
      return;
    }
    if(!strongPasswordRegex.test(form.password)){
      toast.error("⚠️ Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, { ...form, role });
      setUserId(res.data.userId);
      setStep("otp");
      toast.success("📩 OTP sent! Please check your inbox.");
    } catch (err) {
      toast.error(err.response?.data?.msg || "❌ Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast.error("⚠️ Please fill all login fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: form.email,
        password: form.password,
      });
      setUserId(res.data.userId);
      setStep("otp");
      toast.success("📩 OTP sent! Please check your inbox.");
    } catch (err) {
      toast.error(err.response?.data?.msg || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const finalUserId = userId || localStorage.getItem("pendingUserId");
    if (!otp || !finalUserId) {
      toast.error("⚠️ Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      const endpoint =
        step === "signup"
          ? `${BASE_URL}/api/auth/verify-otp`
          : `${BASE_URL}/api/auth/verify-login-otp`;

      const res = await axios.post(endpoint, {
        userId: finalUserId,
        otp,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({ id: finalUserId, email: form.email }));
      }

      localStorage.removeItem("pendingUserId");
      toast.success("✅ Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg || "❌ OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const getHeading = () => {
    if (step === "signup") return "Sign Up to Suraksha Buddy";
    if (step === "login") return "Login to Suraksha Buddy";
    return "Verify OTP";
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-white px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-center text-black mb-6">
            {getHeading()}
          </h2>

          {step !== "otp" && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-black mb-1">Role</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-black"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          )}

          {step === "signup" || step === "login" ? (
            <>
              {step === "signup" && (
                <>
                  <input
                    name="name"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 bg-gray-50 text-black"
                    onChange={handleChange}
                  />
                  <input
                    name="phone"
                    placeholder="Phone"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 bg-gray-50 text-black"
                    onChange={handleChange}
                  />
                </>
              )}
              <input
                name="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 bg-gray-50 text-black"
                onChange={handleChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-gray-50 text-black"
                onChange={handleChange}
              />

              <button
                onClick={step === "signup" ? handleSignup : handleLogin}
                className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-600 transition flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-black"
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
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : step === "signup" ? (
                  "Sign Up"
                ) : (
                  "Login"
                )}
              </button>

              <p
                className="mt-3 text-sm text-yellow-600 text-center cursor-pointer hover:underline"
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
          ) : (
            <>
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-gray-50 text-black"
              />
              <button
                onClick={handleVerifyOTP}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </>
          )}
        </motion.div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default AuthPage;
