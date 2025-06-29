import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import heroVideo from "../assets/cyber-bg.mp4";
import shield from "../assets/suraksha.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// 🔹 Navbar Component Inside Same File
function Navbar() {
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
    { to: "/team", label: "Our Team" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 w-full z-40 bg-transparent text-white"
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
          Suraksha Buddy
        </Link>

        <nav className="hidden md:flex space-x-6 items-center font-medium">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="hover:text-[#F25C5C] transition"
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn && (
            <Link to="/score-history" className="hover:text-[#F25C5C]">
              Score History
            </Link>
          )}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 backdrop-blur-md px-6 py-4 text-center space-y-3 rounded-b-xl"
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block text-[#213547] hover:text-[#F25C5C] text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn && (
              <Link
                to="/score-history"
                onClick={() => setIsOpen(false)}
                className="block text-[#213547] hover:text-[#F25C5C] text-base font-medium"
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

// 🔹 Home Component
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

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
    <div className="relative w-full h-full overflow-hidden font-sans">
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/30 to-white/10 z-10" />

      <div className="relative z-20">
        <Navbar />

        {/* Hero */}
        <section className="w-full h-screen flex items-center justify-start px-6 md:px-20 text-left">
          <div className="text-white max-w-3xl mt-24 space-y-6">
<div className="flex items-center space-x-3">
  <img
    src={shield}
    alt="Shield Icon"
    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
  />
  <motion.h1
    className="text-2xl sm:text-3xl font-bold leading-tight text-[#D4AF37]"
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    Suraksha Buddy
  </motion.h1>
</div>


            <motion.p
              className="text-3xl sm:text-4xl md:text-5xl leading-tight"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              An <i>Initiative</i> to <br />help 
               the Younger Generations <br />to stay Humane in the AI world
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="bg-white text-[#F25C5C] border-2 border-[#F25C5C] hover:bg-[#F25C5C] hover:text-white px-6 py-3 rounded-full text-sm shadow-lg transition duration-300 inline-block"
                >
                  🔐 Join Us
                </Link>
              ) : (
                <>

                <p className="mb-4">Start your DIGITAL DETOX journey with SURAKSHA BUDDY</p>
                  <Link
                    to="/test"
                    className="bg-[#F25C5C] hover:bg-red-600 text-white px-6 py-3 rounded-full text-sm shadow-lg transition duration-300 inline-block"
                  >
                    🚀 Start Self-Test
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white ml-3 bg-white bg-opacity-50 hover:bg-opacity-75 px-4 py-2 rounded-full text-sm transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 bg-white/70 backdrop-blur-md text-gray-800 text-center px-6 md:px-20 rounded-2xl shadow-lg max-w-5xl mx-auto mt-10 mb-10 relative z-40">
          <motion.div
            className="max-w-5xl mx-auto text-center px-6"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#215f7d] mb-4">
              Welcome to <span className="text-[#215f7d]">Suraksha Buddy</span>
            </h2>
            <p className="text-gray-700 text-lg">
              A safe digital journey starts here. We empower kids, guide families, and support
              schools in making the internet a safer, more mindful space.
            </p>
          </motion.div>
        </section>

        {/* Services */}
<section className="bg-white/70 py-16">
  <div className="max-w-7xl mx-auto px-6">
    <motion.h3
      className="text-3xl md:text-4xl font-bold text-center text-[#215f7d] mb-12"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      💡 What We Offer
    </motion.h3>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {[
        {
          title: "Self-Test",
          desc: "Evaluate your digital well-being with our cyber psychology self-assessment.",
          link: "/test",
          color: "#F25C5C",
          emoji: "🧠",
        },
        {
          title: "Detox Toolkit",
          desc: "Access actionable tools and tips for a healthier online life.",
          link: "/toolkit",
          color: "#F2B705",
          emoji: "🧰",
        },
        {
          title: "Talk to your Suraksha Buddy",
          desc: "Get guidance and support from digital wellness mentors.",
          link: "/chat",
          color: "#5EC66C",
          emoji: "🎓",
        },
        {
          title: "Register With Us",
          desc: "Join as counselors, volunteers, or mentors to help others.",
          link: "/register-mentor",
          color: "#297AA2",
          emoji: "📋",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-transform transform hover:-translate-y-1 p-8 text-center"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-5xl mb-4">{item.emoji}</div>
          <h4 className="text-xl font-semibold mb-2 text-[#213547]">{item.title}</h4>
          <p className="mb-6 text-sm text-gray-600">{item.desc}</p>
          <Link
            to={
              !isLoggedIn && ["/test", "/chat", "/toolkit"].includes(item.link)
                ? "/login"
                : item.link
            }
            className="inline-block mt-auto font-semibold text-white px-5 py-2 rounded-full text-sm transition-shadow shadow-sm hover:shadow-md"
            style={{ backgroundColor: item.color }}
          >
            Explore →
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
</section>


<section className="py-16 bg-white/70 backdrop-blur-md text-gray-700">
  <div className="max-w-6xl mx-auto px-4">
    <motion.h3
      className="text-2xl md:text-3xl font-bold text-center text-[#215f7d] mb-10"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      ❓ Frequently Asked Questions
    </motion.h3>

    <Swiper
      modules={[Autoplay, Navigation]}
      slidesPerView={1}
      spaceBetween={20}
      navigation={{
        nextEl: ".faq-button-next",
        prevEl: ".faq-button-prev",
      }}
      autoplay={{ delay: 7000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="relative pb-12"
    >
      {[
        {
          q: "What is Suraksha Buddy?",
          a: "A fun tool that helps students check how online life affects mood, sleep, and focus.",
        },
        {
          q: "Who can use this portal?",
          a: "School and college students, with supportive parents and teachers.",
        },
        {
          q: "Is the self-test free?",
          a: "Yes! It’s completely free with no sign-up fees.",
        },
        {
          q: "What happens after I take the test?",
          a: "You get a result in Silver, Bronze, or Golden Star with helpful suggestions.",
        },
        {
          q: "What is the Detox Toolkit?",
          a: "A collection of mini activities to help you relax and enjoy time offline.",
        },
        {
          q: "Is my score private?",
          a: "Yes, results are private unless you choose to share them.",
        },
      ].map((item, index) => (
        <SwiperSlide key={index}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="h-[160px] max-w-[260px] mx-auto bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl p-4 text-center shadow hover:shadow-md transition duration-300 flex flex-col justify-center"
          >
            <h4 className="text-base font-semibold text-[#F25C5C]">
              {item.q}
            </h4>
            <p className="text-sm text-gray-700">{item.a}</p>
          </motion.div>
        </SwiperSlide>
      ))}

      {/* Custom small red arrows */}
      <div className="faq-button-prev absolute left-0 top-[45%] z-10 w-7 h-7 rounded-full bg-[#F25C5C] text-white text-sm flex items-center justify-center cursor-pointer shadow hover:scale-105 transition">
        ‹
      </div>
      <div className="faq-button-next absolute right-0 top-[45%] z-10 w-7 h-7 rounded-full bg-[#F25C5C] text-white text-sm flex items-center justify-center cursor-pointer shadow hover:scale-105 transition">
        ›
      </div>
    </Swiper>

    <div className="mt-8 text-center">
      <Link
        to="/faqs"
        className="inline-block bg-[#F25C5C] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition"
      >
        View All FAQs →
      </Link>
    </div>
  </div>
</section>


{/* Tagline for Blogs & Videos */}
<section className="relative py-16 px-6 bg-[#297AA2] text-white text-center overflow-hidden">
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="max-w-3xl mx-auto"
  >
    <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug">
      📺 Explore Real Stories, Stay Aware
    </h3>
    <p className="text-sm sm:text-base text-gray-200 px-2">
      Discover blogs and videos based on real-life cyber cases. Learn from real stories,
      understand online risks, and empower yourself to make safer digital choices.
    </p>
  </motion.div>

  {/* Button centered at bottom */}
  <Link
    to="/blogs"
    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-[#297AA2] hover:bg-gray-100 font-semibold px-5 py-2 rounded-full text-sm shadow-md transition items-center justify-center flex"
  >
    📚 Explore Blog & Videos →
  </Link>
</section>

        <Footer />
      </div>
    </div>
  );
}
