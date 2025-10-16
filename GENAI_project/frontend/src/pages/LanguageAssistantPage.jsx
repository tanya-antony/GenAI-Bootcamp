// 📁 src/pages/LanguageAssistantPage.jsx
import React, { useState } from "react";

const LanguageAssistantPage = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [detectedLang, setDetectedLang] = useState("English 🇬🇧");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);

  // 💬 Mock language detection logic
  const detectLanguage = (text) => {
    if (text.includes("नमस्ते")) return "Hindi 🇮🇳";
    if (text.includes("vanakkam")) return "Tamil 🇮🇳";
    if (text.includes("hola")) return "Spanish 🇪🇸";
    return "English 🇬🇧";
  };

  // 🧠 Mock simplifier + translator
  const simplifyText = (text) =>
    text
      .replace(/[.,;]/g, "")
      .split(" ")
      .slice(0, 15)
      .join(" ") + " ... (simplified)";

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

  // 🪄 Handle user typing
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setDetectedLang(detectLanguage(text));
  };

  // 🔄 Simulate translation process
  const handleTranslate = () => {
    if (!inputText.trim()) {
      setOutputText("⚠️ Please enter some text to translate.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setOutputText(
        `✅ Translated to ${getLangName(targetLang)}:\n\n"${simplifyText(
          inputText
        )}"`
      );
      setLoading(false);
    }, 1000);
  };

  // 🎤 Placeholder for voice input
  const handleVoiceInput = () => {
    alert("🎙️ Voice input feature coming soon!");
  };

  // 🔊 Placeholder for voice output
  const handleVoiceOutput = () => {
    alert("🔊 Text-to-speech feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 drop-shadow-sm mb-2">
          🌐 Local Language Accessibility Assistant
        </h1>
        <p className="text-gray-600 text-lg italic">
          “Civic help in your own language.”
        </p>
      </header>

      {/* Main Card */}
      <main className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-8 max-w-2xl w-full transition hover:shadow-2xl">
        {/* Detected Language */}
        <div className="text-sm text-indigo-600 font-semibold mb-4 text-right">
          Detected Language: {detectedLang}
        </div>

        {/* Input */}
        <label className="block text-gray-700 font-medium mb-2">
          Enter or Paste Text:
        </label>
        <textarea
          rows="4"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Paste legal or civic text here..."
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition resize-none mb-6"
        ></textarea>

        {/* Language Selector & Translate */}
        <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="font-semibold text-gray-700">Translate to:</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
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
          </div>

          <button
            onClick={handleTranslate}
            disabled={loading}
            className={`${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white px-5 py-2 rounded-xl font-medium transition active:scale-95`}
          >
            {loading ? "Translating..." : "🔄 Translate"}
          </button>
        </div>

        {/* Output */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 min-h-[100px] text-gray-800 mb-6 whitespace-pre-wrap transition-all duration-500">
          {outputText ? (
            outputText
          ) : (
            <p className="text-sm text-gray-400 italic">
              Your translated text will appear here...
            </p>
          )}
        </div>

        {/* Voice Controls */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleVoiceInput}
            className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition"
          >
            🎙️ Speak Input
          </button>
          <button
            onClick={handleVoiceOutput}
            className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition"
          >
            🔊 Listen Output
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm text-center">
        Built with ❤️ using React + Tailwind CSS • Smart Civic Tech for Everyone
      </footer>
    </div>
  );
};

export default LanguageAssistantPage;
