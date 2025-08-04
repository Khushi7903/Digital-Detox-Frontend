import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import userImage from "../assets/chat.jpg";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Suraksha Buddy. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const botReply = {
        text: "Thanks for sharing. I'm here with you. 💙",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 600);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white flex items-center justify-center px-4 pt-28 pb-16">
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="w-full max-w-2xl mt-12 h-[80vh] bg-white border-2 border-[#2e8b57] rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden"
>

          {/* Image Section – always visible */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-green-50 p-4">
            <img
              src={userImage}
              alt="Suraksha Buddy"
              className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover"
            />
          </div>

          {/* Chat Section */}
          <div className="w-full md:w-1/2 flex flex-col">
            {/* Title */}
            <div className="bg-[#2e8b57] text-white text-lg font-semibold px-4 py-3 text-center rounded-t-xl md:rounded-t-none md:rounded-tr-xl">
              Chat with Suraksha Buddy
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white">
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[75%] px-4 py-2 rounded-xl text-sm break-words ${
                      msg.sender === "user"
                        ? "ml-auto bg-[#0066cc] text-white"
                        : "mr-auto bg-green-100 text-gray-900"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t flex items-center gap-2 bg-white rounded-b-xl">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 ring-[#2e8b57]"
              />
              <button
                onClick={handleSend}
                className="bg-[#2e8b57] hover:bg-green-700 text-white px-4 py-2 text-sm rounded-full transition"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default ChatPage;
