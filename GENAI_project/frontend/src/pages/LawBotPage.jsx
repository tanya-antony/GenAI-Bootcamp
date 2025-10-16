import React, { useState } from "react";

function LawBotPage() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I’m LawBot ⚖️. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const botReply = {
      role: "bot",
      text: "I'm processing your query... (In a real app, this would fetch an AI-generated legal explanation or draft.)",
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-blue-500">
            <h1 className="text-2xl font-semibold">LawBot ⚖️</h1>
            <p className="text-sm text-blue-100">Your AI Legal Aid</p>
          </div>
          <div className="p-4 space-y-2 text-sm overflow-y-auto">
            <button className="w-full bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-left">
              + New Chat
            </button>
            <div className="mt-4 text-blue-100 space-y-2">
              <p className="font-medium uppercase text-xs text-blue-200">Recent</p>
              <div className="bg-blue-500/40 px-3 py-2 rounded-md hover:bg-blue-500 cursor-pointer">
                Drafting a rental agreement
              </div>
              <div className="bg-blue-500/40 px-3 py-2 rounded-md hover:bg-blue-500 cursor-pointer">
                Understanding cyber law
              </div>
              <div className="bg-blue-500/40 px-3 py-2 rounded-md hover:bg-blue-500 cursor-pointer">
                Filing a complaint letter
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-blue-500 text-sm text-blue-100">
          © 2025 LawBot <br />
          <span className="text-blue-200 text-xs">Not a substitute for legal advice.</span>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 border-b bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">LawBot Chat</h2>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xl px-4 py-3 rounded-lg shadow-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t bg-white flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a legal question..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
}

export default LawBotPage;
