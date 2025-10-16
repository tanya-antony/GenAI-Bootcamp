/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "../components/Features";

const LandingPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 I can help you understand laws, find government schemes, or translate documents. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      const botMessage = {
        sender: "bot",
        text: data.reply || "No response from server.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: Unable to reach the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen pt-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col">
      <Navbar />

      <Header />

      <Features />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-12"
      >
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200">
          Empowering Citizens, Simplifying Governance
        </h2>
        <p className="text-center text-sm md:text-base text-indigo-100 mb-6">
          Ask about laws, find eligible schemes, or translate government info instantly.
        </p>

        {/* Chatbox */}
        <div className="w-full max-w-xl bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl mb-6">
          <div className="h-64 overflow-y-auto text-left p-3 rounded-lg bg-white/10 mb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-2">
                {msg.sender === "bot" && (
                  <span className="font-bold text-cyan-200">CivicConnect AI: </span>
                )}

                {/* Render string or structured object */}
                {typeof msg.text === "string" ? (
                  <span
                    className={
                      msg.sender === "user"
                        ? "text-blue-200 text-right"
                        : "text-cyan-100 italic"
                    }
                  >
                    {msg.text}
                  </span>
                ) : msg.text && typeof msg.text === "object" ? (
                  <div className="text-cyan-100 italic">
                    {msg.text.summary && <p className="font-semibold">{msg.text.summary}</p>}
                    {msg.text.sections &&
                      msg.text.sections.map((section, sIdx) => (
                        <div key={sIdx} className="mt-2">
                          <h4 className="font-bold">{section.title}</h4>
                          <ul className="list-disc ml-4">
                            {section.content.map((line, lIdx) => (
                              <li key={lIdx}>{line}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                ) : null}
              </div>
            ))}
            {loading && <p className="text-gray-300 italic">Thinking...</p>}
          </div>

          {/* Input */}
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-gray-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={handleSend}
              className="px-5 py-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl shadow-md hover:opacity-90 transition font-semibold text-white"
            >
              Send
            </button>
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
            <button
              onClick={() => setInput("Find government schemes for me")}
              className="flex-1 bg-white/20 hover:bg-white/30 transition rounded-xl py-2 font-medium text-white"
            >
              Find Government Schemes
            </button>
            <button
              onClick={() => setInput("Simplify a law about traffic rules")}
              className="flex-1 bg-white/20 hover:bg-white/30 transition rounded-xl py-2 font-medium text-white"
            >
              Simplify a Law
            </button>
            <button
              onClick={() => setInput("Translate this government notice into Tamil")}
              className="flex-1 bg-white/20 hover:bg-white/30 transition rounded-xl py-2 font-medium text-white"
            >
              Translate Document
            </button>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default LandingPage;
