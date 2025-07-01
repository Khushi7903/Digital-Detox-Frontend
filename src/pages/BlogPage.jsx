import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { blogs } from "../assets/data/blogs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ✅ Image & Video imports
import kidsImage from "../assets/kids.jpg";
import cyberImage from "../assets/cyberSecurity.jpg";
// import surakshashortfilm from "../assets/surakshashortfilm.mp4";

export default function BlogPage() {
  const [search, setSearch] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.content.toLowerCase().includes(search.toLowerCase())
  );

  const kidsBlogs = filteredBlogs.filter(
    (blog) => blog.category === "Digital Wellness"
  );

  const cyberBlogs = filteredBlogs.filter(
    (blog) => blog.category === "Cyber Psychology"
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 md:px-20 py-12 mt-8 bg-gradient-to-b from-white via-blue-50 to-white text-gray-800 font-sans">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-10 text-cyan-700"
        >
          📚 Blogs & Articles
        </motion.h1>

        {/* 🎞️ Video + Info Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 rounded-2xl border border-cyan-200 bg-white/40 backdrop-blur-lg shadow-lg p-6 md:p-10 flex flex-col lg:flex-row items-center lg:items-start gap-10"
        >
          {/* Info Cards on Left */}
          <div className="flex flex-col gap-6 w-full lg:w-2/3">
            {/* Card 1 */}
            <div className="p-5 bg-white/60 backdrop-blur-md border border-cyan-200 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-cyan-800 mb-2">🎮 Gaming Addiction in Kids</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                The video highlights how innocent online games can lead to addiction. Excessive screen time affects sleep, studies, and emotional development. Open dialogue is key to prevention.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5 bg-white/60 backdrop-blur-md border border-cyan-200 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-cyan-800 mb-2">⚠️ Cyber Scams Targeting Children</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Children are often lured into traps by strangers pretending to be gamers or friends. Fake rewards and identity theft are common threats shown in the video.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-5 bg-white/60 backdrop-blur-md border border-cyan-200 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-cyan-800 mb-2">🛡️ How to Stay Safe Online</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Teach children to never share personal info, avoid chatting with strangers, and always talk to a parent before clicking unknown links. Safety starts with awareness.
              </p>
            </div>
          </div>

          {/* Video on Right */}
          <div className="w-full lg:w-[240px] flex justify-center">
            <video
              src="https://res.cloudinary.com/dr8ynvwv8/video/upload/v1751375033/Suraksha-short-film_ouwsih.mp4"
              controls
              className="h-[420px] w-[230px] sm:w-[240px] rounded-2xl object-cover shadow-md border border-cyan-300"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        {/* 🔍 Search */}
        <div className="mb-12 text-center">
          <input
            type="text"
            placeholder="🔍 Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-3/4 md:w-1/2 px-4 py-2 rounded-full border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />
        </div>

        {/* 👧 Kids Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <img
              src={kidsImage}
              alt="Kids Digital Wellness"
              className="w-full max-w-[400px] object-cover rounded-xl shadow-md"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">
                👧 Stories for Kids
              </h2>
              <p className="text-gray-600">
                Simple and relatable rhymes to teach children about digital habits.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {kidsBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur border border-blue-300 rounded-xl p-5 shadow-md transition hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-cyan-800 mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-700 line-clamp-3">{blog.content}</p>
                <Link
                  to={`/blogs/${blog.id}`}
                  className="inline-block mt-3 text-sm text-blue-600 hover:underline"
                >
                  🔗 Read More
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🧠 Cyber Psychology Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row-reverse items-center gap-6 mb-6">
            <img
              src={cyberImage}
              alt="Cyber Psychology"
              className="w-full max-w-[400px] object-cover rounded-xl shadow-md"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-700 mb-2">
                🧠 Cyber Psychology Insights
              </h2>
              <p className="text-gray-600">
                Explore the science behind screen time, gaming, online friendships, and more.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {cyberBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur border border-cyan-300 rounded-xl p-5 shadow-md transition hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-cyan-800 mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-700 line-clamp-3">{blog.content}</p>
                <Link
                  to={`/blogs/${blog.id}`}
                  className="inline-block mt-3 text-sm text-blue-600 hover:underline"
                >
                  🔗 Read More
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
