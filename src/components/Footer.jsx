import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-t from-blue-100 to-white border-t border-blue-300 text-blue-800 px-6 py-10 mt-12"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-blue-800 tracking-wide"
        >
          Suraksha Buddy
        </motion.h2>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-6 text-blue-600 text-2xl"
        >
          <a
            href="https://www.facebook.com/profile.php?id=61577907779362"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-800 transition"
          >
            <FaFacebook />
          </a>
          <a
            href="http://linkedin.com/in/suraksha-buddy-"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-800 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://mobile.x.com/Suraksha_Buddy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-800 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/suraksha_buddy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-800 transition"
          >
            <FaInstagram />
          </a>
        </motion.div>
      </div>

      {/* Bottom Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm mt-6 text-blue-600"
      >
        © {new Date().getFullYear()} Suraksha Buddy. All rights reserved.
      </motion.div>
    </motion.footer>
  );
}
