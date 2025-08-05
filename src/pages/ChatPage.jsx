import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../config";
import io from "socket.io-client";

const socket = io(BASE_URL); // Connect to your backend socket server

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const chatEndRef = useRef(null);
  const [username] = useState("User" + Math.floor(Math.random() * 1000)); // Replace with real username if needed

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMentors();

    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMentors = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/mentors/mentor`);
      const data = await res.json();
      setMentors(data);
    } catch (err) {
      console.error("Error fetching mentors:", err);
    }
  };

  const handleSend = () => {
    if (!input.trim() || !selectedMentor) return;

    const newMessage = {
      text: input,
      sender: username,
      receiver: selectedMentor.fullName,
    };

    socket.emit("send_message", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white flex items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl h-[calc(100vh-8rem)] bg-white border border-green-400 rounded-3xl shadow-xl flex flex-col overflow-hidden"
        >
          {!selectedMentor ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Talk to a Suraksha Buddy 💬
              </h2>
              <p className="text-gray-600 mb-6 max-w-md">
                Select a volunteer or consultant to begin your safe and private conversation.
              </p>
              <select
                onChange={(e) =>
                  setSelectedMentor(mentors.find((m) => m._id === e.target.value))
                }
                defaultValue=""
                className="w-full max-w-xs border border-gray-300 rounded-xl px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  -- Select a Buddy --
                </option>
                {mentors.map((mentor) => (
                  <option key={mentor._id} value={mentor._id}>
                    {mentor.fullName} ({mentor.userType})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="bg-green-600 text-white text-center font-semibold px-4 py-3 rounded-t-3xl flex justify-between items-center">
                <span>Chatting with {selectedMentor.fullName}</span>
                <button
                  onClick={() => {
                    setSelectedMentor(null);
                    setMessages([]);
                  }}
                  className="text-sm underline hover:text-gray-200"
                >
                  Change Buddy
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white">
                <AnimatePresence initial={false}>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`max-w-[75%] px-4 py-2 rounded-xl text-sm sm:text-base break-words shadow-sm ${
                        msg.sender === username
                          ? "ml-auto bg-blue-600 text-white"
                          : "mr-auto bg-green-100 text-gray-900"
                      }`}
                    >
                      <strong className="block mb-1 text-xs text-gray-500">
                        {msg.sender}
                      </strong>
                      {msg.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>

              {/* Input Section */}
              <div className="p-3 border-t flex items-center gap-2 bg-white rounded-b-3xl">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 ring-green-500 shadow-sm"
                />
                <button
                  onClick={handleSend}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm sm:text-base rounded-full transition shadow"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default ChatPage;
