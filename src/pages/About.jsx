import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ShonanMam from "../assets/ShonanMam.jpg";
import principalMam from "../assets/PrincipalMam.jpg";
import aasthu from "../assets/Aasthu.png";
import mahi from "../assets/Mahi.png";
import vansh from "../assets/Vansh.png";
import khushi from "../assets/Khushi.jpg";
import dhriti from "../assets/Dhriti.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/custom-swiper.css";

const teamSliderMembers = [
  {
    name: "Vansh Sahni",
    role: "Life Coach | Cyber Warrior",
    image: vansh,
    bio: "Psychology Honours graduate from the University of Delhi, equipped with strong research acumen and practical experience in diverse psychological domains.",
  },
  {
    name: "Mahi Chopra",
    role: "B.Tech Graduate in Cyber Security",
    image: mahi,
    bio: "B.Tech graduate in Cybersecurity with a strong technical background and a deep interest in securing digital systems.",
  },
  {
    name: "Aastha",
    role: "Cyber Warrior | Forensic Science Graduate",
    image: aasthu,
    bio: "Forensic Science graduate from Amity University, Noida, with a strong interest in cyber security, digital safety, and community-focused cyber awareness.",
  },
  {
    name: "Khushi",
    role: "B.Tech CSE | Full Stack Developer",
    image: khushi,
    bio: "B.Tech CSE student and Full Stack Developer. Dedicated to continuous learning and innovative problem-solving.",
  },
  {
    name: "Dhriti Saxena",
    role: "B.Tech CSE | Software Developer",
    image: dhriti,
    bio: "CSE student at VIT Vellore, passionate about building innovative and user-friendly software solutions.",
  },
];

const ProfileCard = ({ image, name, role, bio }) => (
  <div className="bg-white border border-gray-100 rounded-2xl px-5 py-6 shadow-md text-center w-full hover:shadow-lg transition duration-300">
    <img
      src={image}
      alt={name}
      className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-[#0D9488] mb-3"
    />
    <h3 className="text-lg font-bold text-blue-900 mb-1">{name}</h3>
    <p className="text-sm text-[#0D9488] font-medium mb-2">{role}</p>
    <p className="text-xs text-gray-600">{bio}</p>
  </div>
);

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-white via-blue-50 to-green-50 text-gray-800 px-4 md:px-16 py-16 pt-28">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-blue-900">
          About Us
        </h1>

        {/* Intro */}
        <p className="text-base md:text-lg text-justify max-w-5xl mx-auto text-gray-700 leading-relaxed mb-16">
          The <span className="bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text font-semibold">Suraksha Buddy Tool</span> was developed during the Gurugram Police Cyber Security Summer Internship 2025 under the expert guidance and mentorship of{" "}
          <strong className="text-blue-900">Dr. Rakshit Tandon</strong>, a renowned Cyber Security Evangelist and National Cybercrime Investigator. With over two decades of experience, he serves as a consultant to CID, Haryana Police, Director at Future Crime Research Foundation, and Cyber Consultant to IAMAI. He has trained central and state law enforcement agencies like the CBI, NIA, CRPF, NSG, and has educated more than 70 lakh youth on cyber hygiene. Dr. Tandon has delivered sessions for the UNODC, the European Commission, and various armed forces and corporates. Honored with numerous national awards, he remains a trusted advisor in India’s digital safety landscape.
        </p>

        {/* Founders */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-10">
          Meet Our Founders
        </h2>

        <div className="flex flex-col gap-6 max-w-md mx-auto mb-16">
          <ProfileCard
            image={principalMam}
            name="Ms Rashmi Malik"
            role="Educationist, Counsellor & Cyber Warrior"
            bio="A seasoned educationist with over 27 years of experience and a Postgraduate degree in Information Technology."
          />
          <ProfileCard
            image={ShonanMam}
            name="Advocate Shonan K Mahajan"
            role="Cyber Warrior"
            bio="Dedicated to spreading awareness on Digital Safety and Digital Rights among schools, universities, and organizations."
          />
        </div>

        {/* Contributors */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-center text-blue-900 mb-6">
            Core Contributors
          </h3>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 3500 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {teamSliderMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <ProfileCard
                  image={member.image}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
