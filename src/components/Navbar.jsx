// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-grey-500">
          Suraksha Buddy
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center font-medium">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`hover:text-red-500 transition ${
                location.pathname === to ? "text-red-500" : "text-gray-700"
              }`}
            >
              {label}
            </Link>
          ))}

          {isLoggedIn && (
            <Link
              to="/score-history"
              className={`hover:text-red-500 transition ${
                location.pathname === "/score-history" ? "text-red-500" : "text-gray-700"
              }`}
            >
              Score History
            </Link>
          )}

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-[#297AA2] text-white px-4 py-1 rounded hover:bg-[#215f7d]"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-[#F25C5C] text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
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
            className="md:hidden bg-white/95 backdrop-blur-md px-6 py-4 text-center space-y-3 rounded-b-xl shadow-md"
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className="block text-gray-800 hover:text-red-500 text-base font-medium"
              >
                {label}
              </Link>
            ))}

            {isLoggedIn && (
              <Link
                to="/score-history"
                onClick={() => setIsOpen(false)}
                className="block text-gray-800 hover:text-red-500 text-base font-medium"
              >
                Score History
              </Link>
            )}

            <div className="pt-3">
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-[#297AA2] text-white px-4 py-2 rounded-md mx-auto max-w-xs"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full bg-[#F25C5C] text-white px-4 py-2 rounded-md mx-auto max-w-xs"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
