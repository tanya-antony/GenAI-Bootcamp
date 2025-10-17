/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  // Smooth scroll function
  const scrollToChatbox = () => {
    const chatboxSection = document.getElementById("chatbox-section");
    if (chatboxSection) {
      chatboxSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-gradient-to-r from-blue-700 to-blue-900 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand */}
        <Link
          to="/"
          className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 tracking-wide"
        >
          CivicConnect<span className="text-blue-200">AI</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 text-white font-medium">
          <Link
            to="/"
            className="hover:text-blue-200 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/bots"
            className="hover:text-blue-200 transition-colors duration-300"
          >
            Bots
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-200 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/docs"
            className="hover:text-blue-200 transition-colors duration-300"
          >
            Docs
          </Link>
        </div>

        {/* CTA Scroll Button */}
        <button
          onClick={scrollToChatbox}
          className="hidden md:block px-5 py-2 rounded-xl bg-white text-blue-800 font-semibold hover:bg-blue-100 transition duration-300 shadow-sm"
        >
          Get Started
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
