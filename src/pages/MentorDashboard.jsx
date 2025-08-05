import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://suraksha-buddy-backend-4.onrender.com");

export default function MentorDashboard() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (room.trim() !== "") {
      socket.emit("join", "Mentor");
      socket.emit("join", room);
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", {
        sender: "Mentor",
        receiver: room,
        text: message,
      });

      setMessages((prev) => [...prev, { sender: "You", text: message }]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-2xl mx-auto shadow-lg border bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-700">Mentor Dashboard</h1>
          <Link
            to="/"
            className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition"
          >
            ⬅ Back to Home
          </Link>
        </div>

        {!joined ? (
          <div className="flex gap-2 mb-6">
            <input
              className="border border-gray-300 p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter User ID to chat with"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={joinRoom}
            >
              Join
            </button>
          </div>
        ) : (
          <>
            <div className="h-64 overflow-y-auto border rounded-md p-3 mb-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 ${
                    msg.sender === "You" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block px-3 py-2 rounded-lg ${
                      msg.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <strong>{msg.sender}: </strong>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="border border-gray-300 p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
