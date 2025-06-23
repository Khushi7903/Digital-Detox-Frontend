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
    <header className="bg-white text-gray-800 border-b shadow-sm fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold text-cyan-600">Suraksha Buddy</Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link, index) => (
            <Link key={index} to={link.to} className="hover:text-cyan-600">
              {link.label}
            </Link>
          ))}

          {isLoggedIn && (
            <Link to="/score-history" className="hover:text-cyan-600">
              Score History
            </Link>
          )}

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-cyan-500 text-white px-4 py-1 rounded hover:bg-cyan-600"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white px-4 py-3 space-y-2 text-center shadow"
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-cyan-600"
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn && (
              <Link
                to="/score-history"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-cyan-600"
              >
                Score History
              </Link>
            )}

            {!isLoggedIn ? (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block bg-cyan-500 text-white px-4 py-1 rounded"
              >
                Login
              </Link>
            ) : (
                <div className="flex justify-center">
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block bg-red-500 text-white px-4 py-1 rounded"
              >
                Logout
              </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
