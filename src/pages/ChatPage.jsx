// src/pages/ChatPage.jsx
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const socket = io("https://digital-detox-backend-1.onrender.com/"); // your backend URL

const mentors = [
  { id: "mentor123", name: "👩‍🏫 Mentor Maya" },
  { id: "buddy456", name: "🧑‍🤝‍🧑 Cyber Buddy Alex" },
];

export default function ChatPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState(mentors[0].id);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const room = [user.id, activeTab].sort().join("_");

  useEffect(() => {
    socket.emit("joinRoom", room);

    socket.on("chatHistory", (data) => setMessages(data));
    socket.on("chatMessage", (msg) => setMessages((prev) => [...prev, msg]));

    return () => socket.off("chatMessage");
  }, [room]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socket.emit("chatMessage", {
      room,
      sender: user.id,
      receiver: activeTab,
      senderName: user.name,
      text,
    });
    setText("");
  };

  return (
    <><Navbar />
    <section className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-white px-4 py-10 mt-12">
      <div className="mx-auto w-full sm:max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-cyan-700 text-white p-4 text-center font-semibold">
          Cyber Support Chat
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 bg-cyan-50 p-3">
          {mentors.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setActiveTab(m.id);
                setMessages([]);
              } }
              className={`text-sm px-3 py-1 rounded-full font-medium transition ${activeTab === m.id
                  ? "bg-cyan-600 text-white"
                  : "bg-white border border-cyan-600 text-cyan-700"}`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className="h-72 overflow-y-auto px-4 py-3 space-y-3 bg-white text-sm">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.sender === user.id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md ${msg.sender === user.id
                    ? "bg-cyan-100 text-cyan-800"
                    : "bg-gray-100 text-gray-800"}`}
              >
                <p className="text-[11px] font-semibold text-gray-500 mb-1">
                  {msg.senderName}
                </p>
                <p>{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-grow px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          <button
            onClick={sendMessage}
            className="bg-cyan-600 text-white px-4 py-2 rounded-full hover:bg-cyan-700 text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
