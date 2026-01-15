import React, { useState, useEffect } from "react";
import { connectWS } from "../services/wsClient";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({ roomId, userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    const ws = connectWS(roomId, (msg) => {
      if (msg.type === "typing") {
        setTypingUsers(msg.users);
      } else {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => ws.close();
  }, [roomId]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const msg = { room_id: roomId, sender_id: userId, content: input };
    ws.send(JSON.stringify(msg));
    setInput("");
  };

  const sendTyping = () => {
    ws.send(JSON.stringify({ type: "typing", user: userId }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto flex-grow">
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} userId={userId} />
        ))}
      </div>
      <TypingIndicator users={typingUsers} />
      <div className="flex p-2">
        <input
          className="flex-grow border rounded p-2"
          value={input}
          onChange={(e) => { setInput(e.target.value); sendTyping(); }}
          placeholder="Type a message…"
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
