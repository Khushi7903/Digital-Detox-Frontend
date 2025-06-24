// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import heroVideo from "../assets/cyber-bg.mp4";

// export default function HeroSection() {
//   return (
//     <section className="relative w-full h-screen overflow-hidden bg-[#FFFDF6]">
//       {/* Background Video */}
//       <video
//         className="absolute inset-0 w-full h-full object-cover z-0"
//         src={heroVideo}
//         autoPlay
//         muted
//         loop
//         playsInline
//       />

//       {/* Transparent Overlay for contrast */}
//       <div className="absolute inset-0 bg-black/40 z-10" />

//       {/* Content */}
//       <div className="relative z-20 w-full h-full flex items-center justify-start px-6 md:px-20 pt-16">
//         <motion.div
//           className="text-left max-w-2xl"
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.h1
//             className="text-lg sm:text-2xl font-semibold text-white mb-2"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//           >
//             Suraksha Buddy
//           </motion.h1>

//           <motion.p
//             className="text-2xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.5 }}
//           >
//             Empowering kids,<br />
//             informing parents,<br />
//             supporting schools.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7 }}
//           >
//             <Link
//               to="/test"
//               className="bg-[#F25C5C] hover:bg-red-600 text-white text-sm sm:text-base px-6 py-3 rounded-full shadow-md transition duration-300"
//             >
//               Start Self-Test
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
