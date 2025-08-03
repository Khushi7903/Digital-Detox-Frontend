// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import hero from "../assets/suraksha.png"; // Adjust if needed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/infodesk", label: "InfoDesk" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-900">
          <img src={hero} alt="Logo" className="w-12 h-12 object-contain" />
          Suraksha Buddy
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center font-medium">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`transition hover:text-green-600 ${
                location.pathname === to ? "text-blue-700 font-semibold" : "text-gray-800"
              }`}
            >
              {label}
            </Link>
          ))}

          {isLoggedIn && (
            <Link
              to="/score-history"
              className={`hover:text-green-600 transition ${
                location.pathname === "/score-history" ? "text-blue-700 font-semibold" : "text-gray-800"
              }`}
            >
              Score History
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-800">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 py-4 text-center space-y-3 border-t border-gray-200"
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className="block text-gray-800 hover:text-green-600 text-base font-medium"
              >
                {label}
              </Link>
            ))}

            {isLoggedIn && (
              <Link
                to="/score-history"
                onClick={() => setIsOpen(false)}
                className="block text-gray-800 hover:text-green-600 text-base font-medium"
              >
                Score History
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
