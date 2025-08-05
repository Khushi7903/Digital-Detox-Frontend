import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function RegisterMentor() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    experience: "",
    description: "",
    expertise: "",
    preferredTime: "",
    userType: "volunteer", // lowercase to match backend schema
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard"); // Redirect to dashboard
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Send email
      const emailRes = await fetch(`${BASE_URL}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          role:
            formData.userType.charAt(0).toUpperCase() +
            formData.userType.slice(1),
        }),
      });

      // Step 2: Submit to database
      const dbRes = await fetch(`${BASE_URL}/api/mentors/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (emailRes.ok && dbRes.ok) {
        toast.success("✅ Submitted successfully! Check your email.");
        setFormData({
          fullName: "",
          email: "",
          mobileNumber: "",
          experience: "",
          description: "",
          expertise: "",
          preferredTime: "",
          userType: "volunteer",
        });
      } else {
        toast.error("❌ Submission failed. Please check required fields.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("❌ Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen pt-24 px-4 bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl w-full bg-white border border-blue-100 rounded-3xl shadow-xl p-8 sm:p-10 space-y-6"
        >
          <h2 className="text-4xl font-extrabold text-center text-blue-900 drop-shadow">
            Become a Suraksha Buddy 🛡️
          </h2>
          <p className="text-center text-gray-600 text-sm sm:text-base">
            Whether you're a counselor or volunteer, your contribution matters.
            Help us build a safer digital future for everyone.
          </p>

          {/* Role Toggle */}
          <div className="flex justify-center gap-4">
            {["volunteer", "consultant"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, userType: r }))
                }
                className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  formData.userType === r
                    ? "bg-yellow-400 text-blue-900 shadow-md"
                    : "border border-blue-300 text-blue-700 hover:bg-blue-50"
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="input-style"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-style"
              />
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Phone Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="input-style"
              />
              <input
                type="text"
                name="expertise"
                placeholder="Your Expertise (e.g. Cyber Safety, Psychology)"
                value={formData.expertise}
                onChange={handleChange}
                required
                className="input-style"
              />
              <input
                type="text"
                name="experience"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="input-style"
              />
              <input
                type="text"
                name="preferredTime"
                placeholder="Preferred Time (e.g. Evenings, Weekends)"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="input-style"
              />
            </div>

            <textarea
              name="description"
              placeholder="Why do you want to join?"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm resize-none bg-white placeholder-gray-500 shadow-inner"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`w-fit px-6 py-2.5 rounded-lg font-semibold transition-all shadow-lg text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-600 to-blue-700 hover:brightness-110"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
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
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "🚀 Submit Application"
                )}
              </button>
            </div>
<div className="flex justify-center">
  <button
    onClick={handleClick}
    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg mt-2"
  >
    Go to Dashboard
  </button>
</div>

          </form>
        </motion.div>
        <ToastContainer position="top-center" autoClose={3000} theme="light" />
      </section>
      <Footer />
    </>
  );
}
