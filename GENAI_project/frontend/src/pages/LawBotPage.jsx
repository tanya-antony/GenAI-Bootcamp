import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function LawBotPage() {
  const [messages, setMessages] = useState([
    { role: "bot", structured: [{ type: "text", text: "Hello! I’m LawBot ⚖️. How can I help you today?" }] },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/lawbot", { message: input });
      const aiReply = response.data.reply;

      const formattedReply = [];

      if (aiReply.summary) {
        formattedReply.push({ type: "summary", text: aiReply.summary });
      }

      if (aiReply.sections?.length) {
        aiReply.sections.forEach((sec) => {
          formattedReply.push({ type: "section", title: sec.title, content: sec.content });
        });
      }

      setMessages((prev) => [...prev, { role: "bot", structured: formattedReply }]);
    } catch (error) {
      console.error("LawBot frontend error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", structured: [{ type: "text", text: "⚠️ Error connecting to LawBot server." }] },
      ]);
    } finally {
      setLoading(false);
    }
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
          © 2025 CivicConnect AI <br />
          <span className="text-blue-200 text-xs">Empowering Citizens, Simplifying Governance.</span>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <header className="p-4 border-b bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">LawBot Chat</h2>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xl px-4 py-3 rounded-lg shadow-sm ${msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
              >
                {msg.role === "user" ? (
                  <p>{msg.text}</p>
                ) : (
                  Array.isArray(msg.structured) &&
                  msg.structured.map((item, idx) => (
                    <div key={idx} className="mb-4">
                      {item.type === "summary" && (
                        <p className="font-semibold text-gray-700 mb-2">🧭 Summary: {item.text}</p>
                      )}

                      {item.type === "section" && (
                        <div className="mt-2">
                          <h4 className="font-bold text-blue-700 text-base mb-2">{item.title}</h4>
                          <div className="space-y-2">
                            {item.content.map((c, jdx) => (
                              <div key={jdx}>
                                {c.subheading ? (
                                  <p className="font-semibold">{c.subheading}: <span className="font-normal">{c.text}</span></p>
                                ) : (
                                  
                                <div className="prose prose-blue max-w-none prose-p:my-1 prose-li:my-0 prose-headings:mb-1">
                                  <ReactMarkdown>{c.text}</ReactMarkdown>
                                </div>

                                    
                                )}
                              </div>
                            ))}
                          </div>
                          <hr className="my-3 border-gray-300" />
                        </div>
                      )}

                      {item.type === "text" && <p>{item.text}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg italic text-gray-600">
                🤔 LawBot is thinking...
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-white flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a legal question..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading}
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
