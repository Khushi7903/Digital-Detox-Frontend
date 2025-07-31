// ✅ Enhanced UI with Updated Logo Placement, Spacing, and Design Polish

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import shield from "../assets/suraksha.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-40 bg-white text-black shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-[#B8860B]">
          Suraksha Buddy
        </Link>
        <nav className="hidden md:flex space-x-6 items-center font-medium">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="hover:text-[#B8860B] transition"
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn && (
            <Link to="/score-history" className="hover:text-[#B8860B]">
              Score History
            </Link>
          )}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} color="#000" /> : <Menu size={24} color="#000" />}
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
            className="md:hidden bg-white px-6 py-4 text-center space-y-3 border-t border-gray-200"
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block text-[#213547] hover:text-[#B8860B] text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn && (
              <Link
                to="/score-history"
                onClick={() => setIsOpen(false)}
                className="block text-[#213547] hover:text-[#B8860B] text-base font-medium"
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


export default function Home() {
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
    <div className="w-full min-h-screen bg-white text-black font-sans">
      <div className="relative z-20">
        <Navbar />
        <section className="w-full min-h-screen flex items-center justify-start px-6 md:px-20 text-left">
          <div className="max-w-3xl mt-12 space-y-1">
            <div className="flex items-center space-x-6">
              <img src={shield} alt="Shield Icon" className="w-40 h-40 object-contain md:w-48 md:h-48" />
            </div>

            <motion.p
              className="text-3xl sm:text-4xl md:text-5xl leading-tight font-semibold text-black"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              An <i className="text-[#B8860B]">Initiative</i> to <br /> help the Younger Generations <br /> stay Humane in the AI world
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="bg-white text-[#B8860B] border-2 border-[#B8860B] hover:bg-[#B8860B] hover:text-white px-6 py-3 rounded-full text-sm shadow-lg transition duration-300 inline-block mt-4"
                >
                  🔐 Join Us
                </Link>
              ) : (
                <>
                  <p className="mb-4 text-black">Start your DIGITAL DETOX journey with <span className="font-semibold text-[#B8860B]">SURAKSHA BUDDY</span></p>
                  <Link
                    to="/test"
                    className="bg-[#B8860B] hover:bg-yellow-700 text-white px-6 py-3 rounded-full text-sm shadow-lg transition duration-300 inline-block mt-4"
                  >
                    🚀 Start Self-Test
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-black ml-3 bg-white border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-full text-sm transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-8 bg-white text-black text-center px-6 md:px-20 rounded-2xl shadow-lg max-w-5xl mx-auto mt-6 mb-10 relative z-40">
          <motion.div
            className="max-w-5xl mx-auto text-center px-6"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#B8860B] mb-4">
              Welcome to <span className="text-[#B8860B]">Suraksha Buddy</span>
            </h2>
            <p className="text-lg text-black">
              A safe digital journey starts here. We empower kids, guide families, and support
              schools in making the internet a safer, more mindful space.
            </p>
          </motion.div>
        </section>

        {/* Services */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h3
              className="text-3xl md:text-4xl font-bold text-center text-[#B8860B] mb-12"
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
                  <h4 className="text-xl font-semibold mb-2 text-black">{item.title}</h4>
                  <p className="mb-6 text-sm text-gray-700">{item.desc}</p>
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

        {/* FAQs */}
        <section className="py-8 bg-white text-black mb-6">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-center text-[#B8860B] mb-10"
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
                    className="h-[160px] max-w-[260px] mx-auto bg-white border border-gray-200 rounded-xl p-4 text-center shadow hover:shadow-md transition duration-300 flex flex-col justify-center"
                  >
                    <h4 className="text-base font-semibold text-[#F25C5C]">{item.q}</h4>
                    <p className="text-sm text-gray-700">{item.a}</p>
                  </motion.div>
                </SwiperSlide>
              ))}

              {/* Custom Arrows */}
              <div className="faq-button-prev absolute left-2 top-1/2 transform -translate-y-1/2 text-[#B8860B] text-4xl cursor-pointer hover:scale-110 transition z-10">
                ‹
              </div>
              <div className="faq-button-next absolute right-2 top-1/2 transform -translate-y-1/2 text-[#B8860B] text-4xl cursor-pointer hover:scale-110 transition z-10">
                ›
              </div>
            </Swiper>

            <div className="mt-8 text-center">
              <Link
                to="/faqs"
                className="inline-block bg-[#B8860B] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-yellow-700 transition"
              >
                View All FAQs →
              </Link>
            </div>
          </div>
        </section>


        <section className="relative py-16 px-4 sm:px-6 bg-[#FFF8E7] border-2 border-[#D4AF37] text-center overflow-hidden rounded-xl shadow-md ml-4 mr-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug text-black">
              📺 <span className="text-[#D4AF37]">Explore Real Stories, Stay Aware</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-800 px-2">
              Discover <span className="text-[#D4AF37] font-medium">blogs and videos</span> based on real-life cyber cases.
              Learn from true stories, understand online risks, and empower yourself to make safer digital choices.
            </p>
          </motion.div>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link
              to="/blogs"
              className="bg-[#D4AF37] text-white border border-[#D4AF37] hover:bg-white hover:text-[#D4AF37] font-semibold px-6 py-2 rounded-full text-sm shadow-md transition duration-300 ease-in-out flex items-center"
            >
              📚 Explore Blog & Videos →
            </Link>
          </div>
        </section>



        <Footer />
      </div>
    </div>
  );
}
