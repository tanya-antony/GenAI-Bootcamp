/* eslint-disable no-unused-vars */
import Sidebar from "../components/Sidebar";
import FeatureNavbar from "../components/FeatureNavbar";
import React, { useState } from "react";
import axios from "axios";

function LanguageAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: <i>👋 Hello! I’m your Local Language Assistant. Paste or type any text and I’ll simplify or translate it.</i>,
    },
  ]);
  const [input, setInput] = useState("");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);

  const getLangName = (code) => {
    const map = {
      hi: "Hindi",
      bn: "Bengali",
      ta: "Tamil",
      te: "Telugu",
      mr: "Marathi",
      ml: "Malayalam",
      gu: "Gujarati",
      kn: "Kannada",
      pa: "Punjabi",
      ur: "Urdu",
    };
    return map[code] || "Unknown";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input; // preserve current message before clearing
    setInput("");
    setLoading(true);

    try {
      // ✅ Call updated backend route
      const res = await axios.post("http://localhost:8080/api/translate", {
        message: input,
        language: targetLang,
      });

      const { reply } = res.data;

      // ✅ Since backend returns plain text, we use reply directly
      const botReply = {
        role: "bot",
        text: reply || "⚠️ Sorry, translation not available.",
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Translation API error:", err);
      const botReply = {
        role: "bot",
        text: "⚠️ Sorry, there was an error processing your request.",
      };
      setMessages((prev) => [...prev, botReply]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };


  return (
    <div className="flex h-screen bg-blue-50 text-gray-900 pt-16">
      <FeatureNavbar
        pageActionLabel="+ New Chat"
        onActionClick={() => {
          setMessages([
            { role: "bot", structured: [{ type: "text", text: "Hello! I’m LawBot ⚖️. How can I help you today?" }] },
          ]);
        }}
      />

      <Sidebar
        title="Language Assistant 🌐"
        subtitle="Your Regional AI Guide"
        themeColor="blue"
        newChatLabel="+ New Translation"
        recentChats={[]}
        footerNote="Not a substitute for professional advice."
        appName="CivicConnect AI"
        className="pt-16"
      />

      <main className="flex-1 flex flex-col bg-white/80 backdrop-blur-sm border-l border-white/20">
        <header className="p-4 border-b border-white/20 bg-blue-100/50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-blue-800">
            Local Language Chat
          </h2>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="border border-blue-200 rounded-lg px-3 py-1 text-blue-800 focus:ring-2 focus:ring-blue-400 outline-none transition"
          >
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="mr">Marathi</option>
            <option value="ml">Malayalam</option>
            <option value="gu">Gujarati</option>
            <option value="kn">Kannada</option>
            <option value="pa">Punjabi</option>
            <option value="ur">Urdu</option>
          </select>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xl px-4 py-3 rounded-2xl shadow-sm whitespace-pre-wrap ${msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-blue-800 border border-blue-200 rounded-bl-none italic"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/20 bg-blue-100/50 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text here..."
            className="flex-1 border border-blue-200 rounded-full px-4 py-2 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`px-5 py-2 rounded-full text-white font-semibold transition ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Translating..." : "Send"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default LanguageAssistantPage;
