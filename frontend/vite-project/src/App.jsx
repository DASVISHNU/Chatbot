import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

 const sendMessage = async () => {
  if (!message.trim()) return;

  const userMsg = { role: "user", text: message };

  // UI me user message add
  setChat((prev) => [...prev, userMsg]);

  try {
    const res = await axios.post("http://localhost:8000/chat", {
      message,
    });

    const botMsg = {
      role: "bot",
      text: res.data.reply,
    };

    // bot reply add
    setChat((prev) => [...prev, botMsg]);

  } catch (err) {
    console.log(err);
  }

  setMessage("");
};

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-700 text-xl font-semibold">
        FRIDAY 💃
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.role === "user"
                  ? "bg-blue-600"
                  : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 flex gap-2 border-t border-gray-700">
        <input
          className="flex-1 p-2 rounded bg-gray-800 outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
  if (e.key === "Enter") sendMessage();
}}
        />

        <button
          onClick={sendMessage}
          className="px-4 bg-blue-600 rounded hover:bg-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;