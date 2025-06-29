import { useParams, Link } from "react-router-dom";
import { blogs } from "../assets/data/blogs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const found = blogs.find((b) => b.id === id);
    setBlog(found);
    window.scrollTo(0, 0); // Optional: scroll to top on load
  }, [id]);
  
  const relatedBlogs = blogs.filter(
    (b) => b.category === blog?.category && b.id !== blog.id
  );

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <h2 className="text-lg font-medium text-red-500">Blog not found.</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white px-4 py-10 md:px-10 text-gray-800 mt-8"
      >
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 p-5 md:p-8">
          {/* Blog Top Layout */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Reduced width image */}
            {blog.image && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                src={blog.image}
                alt={blog.title}
                className="w-full md:w-1/3 max-h-[300px] object-cover rounded-xl shadow-md border"
              />
            )}

            {/* Increased width content */}
            <div className="w-full md:w-2/3">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-800 mb-3"
              >
                {blog.title}
              </motion.h1>

              <p className="text-xs text-gray-600 mb-4 italic">
                Category: <span className="font-medium text-gray-700">{blog.category}</span>
              </p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm leading-relaxed whitespace-pre-line text-justify text-gray-700 mb-4"
              >
                {blog.content}
              </motion.p>

              {blog.description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-sm leading-relaxed whitespace-pre-line text-justify text-gray-600"
                >
                  {blog.description}
                </motion.p>
              )}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-10 text-center">
            <Link
              to="/blogs"
              className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-full text-sm shadow-md transition duration-300 ease-in-out"
            >
              ← Back to Blog List
            </Link>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16">
            <h2 className="text-xl font-semibold text-cyan-800 mb-6 text-center">
              🔗 Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedBlogs.slice(0, 3).map((related) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white/70 border border-blue-200 rounded-lg shadow-md p-4"
                >
                  <img
                    src={related.image}
                    alt={related.title}
                    className="h-36 w-full object-cover rounded-md mb-3"
                  />
                  <h3 className="text-sm font-semibold text-cyan-700 mb-1">
                    {related.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {related.content}
                  </p>
                  <Link
                    to={`/blogs/${related.id}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Read More →
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <Footer />
    </>
  );
}
