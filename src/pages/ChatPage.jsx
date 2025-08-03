import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Suraksha Buddy. How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate buddy reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: input, sender: "user" },
        { text: "Thanks for sharing. I'm here with you. 💙", sender: "bot" }
      ]);
    }, 600);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 py-8 mt-12">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white text-xl font-semibold px-6 py-4 rounded-t-xl">
          Chat with Suraksha Buddy
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-sm px-4 py-2 rounded-xl text-sm ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="p-4 border-t flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 ring-blue-300"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ChatPage;
