import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://suraksha-buddy-backend-4.onrender.com");

export default function ChatBox({ currentUser, targetUser }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Join unique room between two users
    const roomId = [currentUser, targetUser].sort().join("-");
    socket.emit("join_room", roomId);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [currentUser, targetUser]);

  const sendMessage = () => {
    const roomId = [currentUser, targetUser].sort().join("-");
    socket.emit("send_message", {
      room: roomId,
      username: currentUser,
      message,
    });
    setMessage("");
  };

  return (
    <div className="p-4 border rounded w-[400px] mx-auto mt-10 shadow">
      <h2 className="text-xl font-bold mb-2">Chat with {targetUser}</h2>
      <div className="h-[200px] overflow-y-auto border p-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1">
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        className="border p-2 w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
