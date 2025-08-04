import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Globe, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// FAQ Data
const groupedFAQs = {
  General: [
    { q: "What is Suraksha Buddy?", a: "A fun digital tool that helps students check how their online life affects their mood, sleep, and focus." },
    { q: "Who can use this portal?", a: "School and college students, along with supportive parents and teachers." },
    { q: "Is the self-test free?", a: "Yes! The full portal is free to use — no sign-up fees." },
    { q: "What happens after I take the test?", a: "You’ll get a result in one of three zones: Silver 🥈, Bronze 🥈, or Golden Star ⭐ with suggestions and fun activities to try." },
    { q: "What does the Golden Star Zone mean?", a: "It means your screen time might need a little adjusting. You may feel tired, anxious, or distracted — and we’re here to help you feel better." },
    { q: "Is my score shared with anyone else?", a: "No. Your results are private unless you choose to share them with a mentor or trusted adult." },
    { q: "What is the Digital Detox Toolkit?", a: "It’s a collection of small, daily challenges and tools to help you relax, think clearly, and enjoy time offline." },
    { q: "Who are the Cyber Buddies?", a: "Trained young mentors who chat with you weekly and support your wellness journey. If needed, they can connect you with a counselor." },
    { q: "Can parents or teachers view my results?", a: "Only with your permission. You stay in control of your privacy." },
    { q: "Is Suraksha Buddy like therapy?", a: "No — it’s a support tool to help you reflect and grow. For deep concerns, we recommend speaking to a professional counselor." },
  ],
  "Cyber Safety": [
    { q: "Why is it important to check if a website starts with 'https://'?", a: "Because the 's' stands for secure – it means data is encrypted." },
    { q: "What should you do if you receive a link from an unknown number or email?", a: "Do not click. Always verify the source." },
    { q: "A friend sends you a message: ‘You won a free phone! Click here.’ What do you do?", a: "Avoid clicking. It could be a phishing scam." },
    { q: "How can you tell if a link is fake?", a: "Hover over it and check for spelling mistakes or unusual domain names (e.g., faceb00k.com)." },
    { q: "What is phishing?", a: "It’s when hackers try to trick you into giving personal information through fake emails or sites." },
    { q: "Should you share your passwords with friends or classmates?", a: "No. Keep your passwords private and strong." },
    { q: "What is 2FA (Two-Factor Authentication)?", a: "It's an extra layer of protection, like a one-time code sent to your phone or email." },
    { q: "What are signs that your device might be hacked?", a: "Slower performance, unknown apps, or sudden pop-ups." },
    { q: "Is using public Wi-Fi safe for accessing bank or personal info?", a: "No. Avoid using public Wi-Fi for sensitive tasks." },
    { q: "What should you do if you find out someone is impersonating you online?", a: "Report it immediately to the platform and inform a trusted adult or authority." },
  ],
};

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", ...Object.keys(groupedFAQs)];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const iconMap = {
    General: <Globe className="inline-block mr-2 text-[#2e8b57]" size={20} />,
    "Cyber Safety": <ShieldCheck className="inline-block mr-2 text-[#0066cc]" size={20} />,
  };

  const slideVariants = {
    initial: { x: 40, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-[#f4fbf7] to-[#e3f2fd] min-h-screen px-4 pt-28 pb-16">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-[#2e8b57] mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions ❓
        </motion.h2>

        {/* Search & Category Filter */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-2">
          <input
            type="text"
            placeholder="🔍 Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className="w-full sm:w-[60%] px-4 py-2 text-sm rounded-full bg-white/60 backdrop-blur-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#2e8b57] text-gray-800"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-[40%] px-4 py-2 text-sm rounded-full bg-white/60 backdrop-blur-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#0066cc] text-gray-800"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Animate Category Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto space-y-12"
          >
            {Object.entries(groupedFAQs)
              .filter(([section]) => selectedCategory === "All" || selectedCategory === section)
              .map(([section, questions]) => (
                <div key={section} className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                    {iconMap[section]} {section}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {questions
                      .filter(
                        (faq) =>
                          faq.q.toLowerCase().includes(search) ||
                          faq.a.toLowerCase().includes(search)
                      )
                      .map((faq, idx) => {
                        const currentIndex = `${section}-${idx}`;
                        const isOpen = openIndex === currentIndex;

                        return (
                          <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white/60 border border-[#cde7db] rounded-xl p-4 shadow-md hover:shadow-lg transition backdrop-blur text-gray-800"
                          >
                            <button
                              onClick={() => handleToggle(currentIndex)}
                              className="w-full flex justify-between items-center text-left text-base font-medium focus:outline-none text-gray-800"
                            >
                              {faq.q}
                              {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.p
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-2 text-sm text-gray-800 overflow-hidden"
                                >
                                  {faq.a}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              ))}
          </motion.div>
        </AnimatePresence>

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link
            to="/"
            className="text-[#0066cc] underline text-base hover:text-[#f25c5c] transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
