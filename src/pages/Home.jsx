import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaStethoscope, FaHandsHelping, FaToolbox, FaUserPlus } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import awarenessImg from "../assets/timmy.jpg"; 
import slider from "../assets/cyberSecurity.jpg"; 

const generalFaqs = [
  {
    q: "What is Suraksha Buddy?",
    a: "A fun digital tool that helps students check how their online life affects their mood, sleep, and focus.",
  },
  {
    q: "Who can use this portal?",
    a: "School and college students, along with supportive parents and teachers.",
  },
  {
    q: "Is the self-test free?",
    a: "Yes! The full portal is free to use — no sign-up fees.",
  },
  {
    q: "What happens after I take the test?",
    a: "You’ll get a result in one of three zones: Silver 🥈, Bronze 🥈, or Golden Star ⭐ with suggestions and fun activities to try.",
  },
  {
    q: "What does the Golden Star Zone mean?",
    a: "It means your screen time might need a little adjusting. You may feel tired, anxious, or distracted — and we’re here to help you feel better.",
  },
];

const cyberFaqs = [
  {
    q: "Why is it important to check if a website starts with 'https://'?",
    a: "Because the 's' stands for secure – it means data is encrypted.",
  },
  {
    q: "What should you do if you receive a link from an unknown number or email?",
    a: "Do not click. Always verify the source.",
  },
  {
    q: "A friend sends you a message: ‘You won a free phone! Click here.’ What do you do?",
    a: "Avoid clicking. It could be a phishing scam.",
  },
  {
    q: "How can you tell if a link is fake?",
    a: "Hover over it and check for spelling mistakes or unusual domain names (e.g., faceb00k.com).",
  },
];



export default function Home() {
  const [category] = useState("General");
  const [index, setIndex] = useState(0);

  const faqs = category === "General" ? generalFaqs : cyberFaqs;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % faqs.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + faqs.length) % faqs.length);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-black font-sans">
      <Navbar />

      <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-green-50 px-4 py-12 relative overflow-hidden">

  {/* Container */}
  <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 relative z-10">

    {/* Left: Text Section */}
    <div className="flex-1 text-center md:text-left">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
        Empowering Humans to Thrive<br />
        <span className="bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
          in the Digital World
        </span>
      </h1>
      <p className="text-gray-600 mb-6">
        Start your DIGITAL DETOX journey with
        <span className="font-semibold text-green-600"> SURAKSHA BUDDY</span>
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link
              to="/test"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-sm shadow-lg transition duration-300"
            >
              🚀 Start Self-Test
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-full text-sm transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white px-6 py-3 rounded-full text-sm shadow-lg transition duration-300"
          >
            🔐 Join Us
          </Link>
        )}
      </div>
    </div>

    {/* Right: Image or Slider */}
    <div className="flex-1">
      <img
        src={slider} // Replace with your asset
        alt="Digital Detox Illustration"
        className="w-full max-w-md mx-auto"
      />
    </div>
  </div>

  {/* Background SVG Wave */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
    <svg
      className="relative block w-full h-24"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="#d1f4f0"
        d="M0,160L80,144C160,128,320,96,480,112C640,128,800,192,960,218.7C1120,245,1280,235,1360,229.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
  </div>
</section>


      {/* Welcome Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full text-center px-6 py-16 bg-white"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
          Welcome to Suraksha Buddy
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          A safe digital journey starts here. We empower kids, guide families, and support
          schools in making the internet a safer, more mindful space.
        </p>
      </motion.section>

       <section className="w-full bg-white py-16 px-4 md:px-20">
  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-10"
  >
    What We Offer
  </motion.h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {/* Card 1: Self Test */}
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-200 transition hover:shadow-blue-300 text-center"
    >
      <FaStethoscope className="text-4xl text-green-700 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-blue-900">Self Test</h3>
      <p className="text-gray-600 mt-2 mb-4">Take a quick assessment to understand your mental well-being.</p>
      <Link
        to="/test"
        className="inline-block px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Take Test
      </Link>
    </motion.div>

    {/* Card 2: Detox Toolkit */}
    <motion.div
      whileHover={{ scale: 1.05, rotate: -1 }}
      className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-green-200 transition hover:shadow-green-300 text-center"
    >
      <FaToolbox className="text-4xl text-blue-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-green-900">Detox Toolkit</h3>
      <p className="text-gray-600 mt-2 mb-4">Explore tools & practices to declutter your emotional space.</p>
      <Link
        to="/toolkit"
        className="inline-block px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
      >
        Explore Toolkit
      </Link>
    </motion.div>

    {/* Card 3: Talk to Buddy */}
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-200 transition hover:shadow-blue-300 text-center"
    >
      <FaHandsHelping className="text-4xl text-green-700 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-blue-900">Talk to Buddy</h3>
      <p className="text-gray-600 mt-2 mb-4">Connect with a Suraksha Buddy who listens without judgment.</p>
      <Link
        to="/chat"
        className="inline-block px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Start Chat
      </Link>
    </motion.div>

    {/* Card 4: Join as Counselor */}
    <motion.div
      whileHover={{ scale: 1.05, y: 5 }}
      className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-green-200 transition hover:shadow-green-300 text-center"
    >
      <FaUserPlus className="text-4xl text-blue-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-green-900">Join Us</h3>
      <p className="text-gray-600 mt-2 mb-4">Register as a counselor or volunteer and help someone today.</p>
      <Link
        to="/register-mentor"
        className="inline-block px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
      >
        Register Now
      </Link>
    </motion.div>
  </div>
</section>



<section className="bg-white py-16 px-6 md:px-20 text-black text-center relative z-10">
  <h2 className="text-3xl md:text-4xl font-bold mb-10">Frequently Asked Questions</h2>

  <div className="relative flex items-center justify-center max-w-3xl mx-auto">
    {/* Left Arrow */}
    <button
      onClick={handlePrev}
      className="absolute left-0 text-blue-600 hover:text-blue-800"
      aria-label="Previous Question"
    >
      <FaArrowLeft size={24} />
    </button>

    {/* FAQ Card */}
    <motion.div
      key={index}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 bg-blue-50 rounded-xl shadow-lg w-full"
    >
      <h3 className="text-xl font-semibold mb-4 text-blue-800">{faqs[index].q}</h3>
      <p className="text-gray-700 leading-relaxed">{faqs[index].a}</p>
    </motion.div>

    {/* Right Arrow */}
    <button
      onClick={handleNext}
      className="absolute right-0 text-blue-600 hover:text-blue-800"
      aria-label="Next Question"
    >
      <FaArrowRight size={24} />
    </button>
  </div>

  {/* View All Link */}
  <Link
    to="/faqs"
    className="mt-8 inline-block text-sm px-5 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all"
  >
    View All FAQs
  </Link>
</section>

{/* blogs + videos */}

   <section>
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="w-full px-4 md:px-12 py-16"
  >
    <div className="bg-gradient-to-br from-blue-100 via-green-100 to-white border-2 border-blue-300 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-lg min-h-[300px]">

      {/* Left: Text + Explore */}
      <div className="text-center md:text-left space-y-4 max-w-xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-800">
          Explore real stories and stay aware
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          Be inspired. Be informed. Be safe with real-life experiences and insights.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-blue-700 transition"
          >
            Explore <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>

      {/* Right: Image */}
      <div className="w-full md:w-1/2">
        <img
          src={awarenessImg}
          alt="Awareness illustration"
          className="w-full h-auto object-contain rounded-xl"
        />
      </div>
    </div>
  </motion.section>
</section>
      <Footer />
    </div>
  );
}
