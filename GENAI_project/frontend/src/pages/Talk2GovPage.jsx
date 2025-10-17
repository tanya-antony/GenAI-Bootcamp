import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function Talk2GovPage() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      structured: [
        { type: "text", text: "Hello! I’m Talk2Gov 🏛️. I can help you find government schemes. How can I assist you today?" },
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

      // Convert backend response to frontend-friendly structured array
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
          structured: [{ type: "text", text: "⚠️ Error connecting to Talk2Gov server." }],
        },
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
            <h1 className="text-2xl font-semibold">Talk2Gov 🏛️</h1>
            <p className="text-sm text-blue-100">Discover government schemes</p>
          </div>
          <div className="p-4 space-y-2 text-sm overflow-y-auto">
            <button className="w-full bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-left">
              + New Query
            </button>
            <div className="mt-4 text-blue-100 space-y-2">
              <p className="font-medium uppercase text-xs text-blue-200">Recent</p>
              <div className="bg-blue-500/40 px-3 py-2 rounded-md hover:bg-blue-500 cursor-pointer">
                PM Awas Yojana eligibility
              </div>
              <div className="bg-blue-500/40 px-3 py-2 rounded-md hover:bg-blue-500 cursor-pointer">
                Jan Dhan Yojana benefits
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
          <h2 className="text-lg font-semibold text-gray-800">Talk2Gov Chat</h2>
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
                    <div key={idx} className="mb-2">
                      {item.type === "summary" && (
                        <p className="font-semibold text-gray-700">🧭 Summary: {item.text}</p>
                      )}

                      {item.type === "section" && (
                        <div className="mt-2">
                          <h4 className="font-bold">{item.title}</h4>
                          <div className="prose text-gray-700 space-y-1">
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
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg italic text-gray-600">
                🤔 Talk2Gov is fetching schemes...
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t bg-white flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a government scheme..."
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

export default Talk2GovPage;
