import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#FFFDF6] border-t border-gray-200 text-[#213547] px-6 py-10 mt-12"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-[#297AA2]"
        >
          Suraksha Buddy
        </motion.h2>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-5 text-[#297AA2] text-xl"
        >
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F25C5C] transition">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#5EC66C] transition">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2B705] transition">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F25C5C] transition">
            <FaInstagram />
          </a>
        </motion.div>
      </div>

      {/* Bottom Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm mt-6 text-gray-500"
      >
        © {new Date().getFullYear()} Suraksha Buddy. All rights reserved.
      </motion.div>
    </motion.footer>
  );
}
