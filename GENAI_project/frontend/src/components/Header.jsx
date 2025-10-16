/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="text-center mb-12 mt-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-3"
      >
        <div className="bg-blue-500/10 p-2 rounded-full shadow-md">
          <Sparkles className="text-yellow-400 w-6 h-6" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent"
      >
        Welcome to CivicConnectAI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="text-base md:text-lg text-gray-200 max-w-xl mx-auto mt-3 leading-relaxed"
      >
        Your smart AI assistant — always ready to chat, guide, and help you with
        answers that matter.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mx-auto mt-5 w-20 h-[3px] bg-gradient-to-r from-blue-400 to-indigo-300 rounded-full"
      />
    </header>
  );
};

export default Header;
