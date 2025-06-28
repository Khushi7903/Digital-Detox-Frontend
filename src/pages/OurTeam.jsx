import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ShonanMam from "../assets/ShonanMam.jpg";
import principalMam from "../assets/PrincipalMam.jpg";
import aasthu from "../assets/Aasthu.png";
import mahi from "../assets/Mahi.png";
import vansh from "../assets/Vansh.png";
import khushi from "../assets/Khushi.jpg";

const teamMembers = [
  {
    name: "Advocate Shonan K Mahajan",
    prole: "Cyber Expert",
    role: "Suraksha Buddy",
    image: ShonanMam,
    bio: "Dedicated to spread awareness for Digital Safety and Digital Rights among Organizations, communities, Schools, Universities."
  },
  {
    name: "Ms Rashmi Malik",
    prole: "Educationist, Counsellor and Cyber Warrior",
    role: "Suraksha Buddy",
    image: principalMam,
    bio: "A seasoned educationist with over 27 years of experience and a Postgraduate degree in Information Technology."
  },
  {
    name: "Aastha",
    prole: "Cyber Warrior | Forensic Science Graduate",
    role: "Suraksha Buddy",
    image: aasthu,
    bio: "A Forensic Science graduate from Amity University, Noida, with a strong interest in cyber security, digital safety, and community-focused cyber awareness."
  },
  {
    name: "Mahi Chopra",
    prole: "B.Tech Graduate in Cyber Security",
    role: "Suraksha Buddy",
    image: mahi,
    bio: "A B.Tech graduate in Cybersecurity with a strong technical background and a deep interest in securing digital systems."
  },
  {
    name: "Vansh Sahni",
    prole: "Life Coach | Cyber Warrior",
    role: "Suraksha Buddy",
    image: vansh,
    bio: "A Psychology Honours graduate from the University of Delhi, equipped with strong research acumen and practical experience in diverse psychological domains."
  },
  {
    name: "Khushi",
    prole: "Khushi | B.Tech CSE | Full Stack Developer",
    role: "Suraksha Buddy",
    image: khushi,
    bio: "B.Tech CSE student and Full Stack Developer. Dedicated to continuous learning and innovative problem-solving."
  }
];

export default function OurTeam() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen px-4 py-16 sm:py-20 bg-[#fdfcfc] text-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-red-600 mb-10">
            Meet Our Team
          </h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="max-w-sm mx-auto bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-red-200 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm text-red-500 italic mb-1">
                  {member.prole}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  {member.role}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-snug">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
