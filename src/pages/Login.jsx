// src/pages/AuthPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config.js"

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

      // ✅ Store login info in localStorage
      localStorage.setItem("user", JSON.stringify({
        id: formData.id,
        role,
        email: formData.email,
      }));

      // ✅ Redirect after 1 second
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-5">
        <h2 className="text-xl font-bold text-cyan-700 text-center">
          {isLogin ? "Login" : "Sign Up"} as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>

        {/* Role Toggle */}
        <div className="flex justify-center gap-4 mb-2">
          {["student", "teacher"].map((r) => (
            <button
              key={r}
              className={`px-4 py-1 rounded-full border ${
                role === r ? "bg-cyan-600 text-white" : "border-cyan-600 text-cyan-600"
              }`}
              onClick={() => setRole(r)}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              required
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-cyan-400"
            />
          )}
          <input
            type="text"
            name="id"
            placeholder={`${role === "student" ? "Student" : "Teacher"} ID`}
            value={formData.id}
            required
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            required
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            required
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="text-sm text-center text-cyan-700 mt-2">
            {message}
          </p>
        )}

        {/* Toggle Login/Signup */}
        <p className="text-xs text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={handleToggle} className="text-cyan-700 underline">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </section>
  );
}
