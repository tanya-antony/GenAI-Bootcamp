/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Sidebar from "../components/Sidebar";
import FeatureNavbar from "../components/FeatureNavbar";

function Talk2GovPage() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      structured: [
        {
          type: "text",
          text: <i>Hello! I’m Talk2Gov 🏛️. I can help you find government schemes. How can I assist you today?</i>,
        },
      ],
    },
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
      const response = await axios.post("http://localhost:8080/api/talk2gov", { message: input });
      const aiReply = response.data.reply;

      const formattedReply = [];

      if (aiReply.summary) {
        formattedReply.push({ type: "summary", text: aiReply.summary });
      }

      if (aiReply.sections?.length) {
        aiReply.sections.forEach((section) => {
          formattedReply.push({ type: "section", title: section.title, content: section.content });
        });
      }

      setMessages((prev) => [...prev, { role: "bot", structured: formattedReply }]);
    } catch (error) {
      console.error("Talk2Gov frontend error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          structured: [{ type: "text", text: <i>⚠️ Error connecting to Talk2Gov server.</i> }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-blue-50 text-gray-900 pt-16">
      <FeatureNavbar
        pageActionLabel="+ New Chat"
        onActionClick={() => {
          // clear messages or start a new chat
          setMessages([
            { role: "bot", structured: [{ type: "text", text: "Hello! I’m LawBot ⚖️. How can I help you today?" }] },
          ]);
        }}
      />
      {/* Sidebar */}
      <Sidebar
        title="Talk2Gov 🏛️"
        subtitle="Discover government schemes"
        themeColor="blue"
        newChatLabel="+ New Query"
        recentChats={["PM Awas Yojana eligibility", "Jan Dhan Yojana benefits"]}
        footerNote="Empowering Citizens, Simplifying Governance."
        appName="CivicConnect AI"
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white/80 backdrop-blur-sm border-l border-white/20">
        {/* Header */}
        <header className="p-4 border-b border-white/20 bg-blue-100/50 flex items-center">
          <h2 className="text-lg font-semibold text-blue-800">Talk2Gov Chat</h2>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xl px-4 py-3 rounded-2xl shadow-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-blue-800 border border-blue-200 rounded-bl-none italic"
                }`}
              >
                {msg.role === "user" ? (
                  <p>{msg.text}</p>
                ) : (
                  Array.isArray(msg.structured) &&
                  msg.structured.map((item, idx) => (
                    <div key={idx} className="mb-2">
                      {item.type === "summary" && (
                        <p className="font-semibold text-blue-800">🧭 Summary: {item.text}</p>
                      )}

                      {item.type === "section" && (
                        <div className="mt-2">
                          <h4 className="font-bold text-blue-700 text-base mb-2">{item.title}</h4>
                          <div className="prose text-blue-800 space-y-1">
                            {item.content.map((c, jdx) => (
                              <div key={jdx}>

                                
                                {c.subheading && <p><strong>{c.subheading}:</strong> {c.text}</p>}
                                {!c.subheading && 
                                  <div className="prose prose-blue max-w-none prose-p:my-1 prose-li:my-0 prose-headings:mb-1">
                                  <ReactMarkdown>{c.text}</ReactMarkdown>
                                </div>
                                
                                
                                }

                              </div>
                            ))}
                          </div>
                          <hr className="my-3 border-blue-200" />
                        </div>
                      )}

                      {item.type === "text" && <p>{item.text}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-blue-200 px-4 py-2 rounded-2xl italic text-blue-600">
                🤔 Talk2Gov is fetching schemes...
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t border-white/20 bg-blue-100/50 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a government scheme..."
            className="flex-1 border border-blue-200 rounded-full px-4 py-2 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`px-5 py-2 rounded-full text-white font-semibold transition ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Fetching..." : "Send"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Talk2GovPage;
