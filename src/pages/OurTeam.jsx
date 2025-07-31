// import { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar.jsx";
// import Footer from "../components/Footer.jsx";
// import ShonanMam from "../assets/ShonanMam.jpg";
// import principalMam from "../assets/PrincipalMam.jpg";
// import aasthu from "../assets/Aasthu.png";
// import mahi from "../assets/Mahi.png";
// import vansh from "../assets/Vansh.png";
// import khushi from "../assets/Khushi.jpg";
// import dhriti from "../assets/Dhriti.jpg";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// const teamMembers = [
//   {
//     name: "Advocate Shonan K Mahajan",
//     prole: "Cyber Warrior",
//     image: ShonanMam,
//     bio: "Dedicated to spread awareness for Digital Safety and Digital Rights among Organizations, communities, Schools, Universities."
//   },
//   {
//     name: "Ms Rashmi Malik",
//     prole: "Educationist, Counsellor and Cyber Warrior",
//     image: principalMam,
//     bio: "A seasoned educationist with over 27 years of experience and a Postgraduate degree in Information Technology."
//   },
//   {
//     name: "Aastha",
//     prole: "Cyber Warrior | Forensic Science Graduate",
//     image: aasthu,
//     bio: "Forensic Science graduate from Amity University, Noida, with a strong interest in cyber security, digital safety, and community-focused cyber awareness."
//   },
//   {
//     name: "Mahi Chopra",
//     prole: "B.Tech Graduate in Cyber Security",
//     image: mahi,
//     bio: "B.Tech graduate in Cybersecurity with a strong technical background and a deep interest in securing digital systems."
//   },
//   {
//     name: "Vansh Sahni",
//     prole: "Life Coach | Cyber Warrior",
//     image: vansh,
//     bio: "Psychology Honours graduate from the University of Delhi, equipped with strong research acumen and practical experience in diverse psychological domains."
//   },
//   {
//     name: "Khushi",
//     prole: "B.Tech CSE | Full Stack Developer",
//     image: khushi,
//     bio: "B.Tech CSE student and Full Stack Developer. Dedicated to continuous learning and innovative problem-solving."
//   },
//   {
//     name: "Dhriti Saxena",
//     prole: "B.Tech CSE | Software Developer",
//     image: dhriti,
//     bio: "CSE student at VIT Vellore, passionate about building innovative and user-friendly software solutions."
//   }
// ];

// export default function OurTeam() {
//   const swiperRef = useRef(null);
//   const [reverse, setReverse] = useState(false);

//   const handleSlideChange = (swiper) => {
//     const lastIndex = teamMembers.length - 1;
//     if (swiper.activeIndex === lastIndex) {
//       setReverse(true);
//     } else if (swiper.activeIndex === 0) {
//       setReverse(false);
//     }

//     if (swiperRef.current && swiperRef.current.autoplay) {
//       swiperRef.current.autoplay.stop();
//       swiperRef.current.params.autoplay.reverseDirection = reverse;
//       swiperRef.current.autoplay.start();
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <section className="min-h-screen px-4 py-12 text-gray-800">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2 }}
//           className="max-w-7xl mx-auto text-center"
//         >
//           <h2 className="text-2xl sm:text-3xl font-bold text-red-500 mt-10 sm:mt-16 mb-4">
//             Meet Our Team
//           </h2>
//           <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-12">
//             A passionate team committed to digital safety, education, and innovation 🌐❤️
//           </p>
//         </motion.div>

//         <Swiper
//           modules={[Pagination, Navigation, Autoplay]}
//           onSwiper={(swiper) => (swiperRef.current = swiper)}
//           onSlideChange={handleSlideChange}
//           autoplay={{
//             delay: 4500,
//             reverseDirection: false,
//             disableOnInteraction: false
//           }}
//           navigation
//           pagination={{ clickable: true }}
//           spaceBetween={30}
//           breakpoints={{
//             320: { slidesPerView: 1 },
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//             1280: { slidesPerView: 4 }
//           }}
//           className="pb-20"
//         >
//           {teamMembers.map((member, i) => (
//             <SwiperSlide key={i}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.8, delay: i * 0.1 }}
//                 className="bg-white/30 backdrop-blur-md border border-white/40 shadow-xl rounded-xl p-6 sm:p-8 max-w-xs mx-auto text-center hover:scale-105 transition-transform duration-500"
//               >
//                 <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-300 mb-4 mx-auto shadow-md">
//                   <img
//                     src={member.image}
//                     alt={member.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                   {member.name}
//                 </h3>
//                 <p className="text-sm text-red-500 italic mb-2">
//                   {member.prole}
//                 </p>
//                 <p className="text-sm text-gray-700 leading-snug">
//                   {member.bio}
//                 </p>
//               </motion.div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Swiper arrows styling */}
//         <style>
//           {`
//             .swiper-button-prev, .swiper-button-next {
//               color: #f87171;
//               background-color: rgba(255, 255, 255, 0.6);
//               backdrop-filter: blur(8px);
//               border-radius: 9999px;
//               width: 32px;
//               height: 32px;
//               top: 48%;
//               transform: translateY(-50%);
//               box-shadow: 0 2px 6px rgba(0,0,0,0.1);
//             }
//             .swiper-button-prev:hover, .swiper-button-next:hover {
//               background-color: rgba(255, 255, 255, 0.85);
//             }
//             .swiper-button-prev::after, .swiper-button-next::after {
//               font-size: 14px;
//               font-weight: bold;
//             }
//           `}
//         </style>
//       </section>
//       <Footer />
//     </>
//   );
// }
