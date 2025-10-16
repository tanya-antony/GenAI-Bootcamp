/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "../components/Features";

const LandingPage = () => {
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

        <div className="w-full max-w-xl bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl mb-6">
          <div className="h-64 overflow-y-auto text-left p-3 rounded-lg bg-white/10 mb-4">
            <p className="text-white italic">
              CivicConnect AI: <span className="font-bold text-cyan-200">Hello! 👋</span> I can help you understand laws, find government schemes, or translate documents. How can I assist you today?
            </p>
          </div>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-gray-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="px-5 py-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl shadow-md hover:opacity-90 transition font-semibold text-white">
              Send
            </button>
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
            <button className="flex-1 bg-white/20 hover:bg-white/30 transition rounded-xl py-2 font-medium text-white">
              Find Government Schemes
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 transition rounded-xl py-2 font-medium text-white">
              Simplify a Law
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 transition rounded-xl py-2 font-medium text-white">
              Translate Document
            </button>
          </div>
        </div>
      </motion.section>


      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
