import React from 'react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white px-4">
      
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to ChatBuddy</h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto">
          Your intelligent AI chatbot, ready to answer your questions and assist you 24/7.
        </p>
      </header>

      {/* Chat Preview */}
      <div className="bg-white text-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-indigo-100 text-indigo-800 rounded-xl px-4 py-2 max-w-xs">
              Hi! I am ChatBuddy 🤖. How can I help you today?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-gray-200 text-gray-900 rounded-xl px-4 py-2 max-w-xs">
              Hello! I want to know about your services.
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition">
        Start Chatting
      </button>

      {/* Footer */}
      <footer className="mt-12 text-gray-200 text-sm">
        © 2025 ChatBuddy. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;

