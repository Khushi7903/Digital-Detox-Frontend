import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="bg-white border-t py-6 text-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
        {/* Brand Info */}
        <div>
          <h2 className="text-lg font-bold text-cyan-600">Digital Detox</h2>
          <p className="text-sm mt-2">
            Heal your mind. Balance your screen time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/about" className="hover:text-cyan-600">About</Link></li>
            <li><Link to="/test" className="hover:text-cyan-600">Self-Test</Link></li>
            <li><Link to="/toolkit" className="hover:text-cyan-600">Toolkit</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm">digital@cyberdetox.in</p>
          <p className="text-sm">+91-1234567890</p>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-xs text-gray-500 mt-6 px-4">
        © 2025 Digital Detox. All rights reserved.
      </div>
    </motion.footer>
  );
}
