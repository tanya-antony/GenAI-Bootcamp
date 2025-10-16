/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10 hover:text-accent transition-colors"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <Link
          to="/"
          className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent"
        >
          CivicConnectAI
        </Link>

        <div className="hidden md:flex gap-6 text-gray-200 font-medium">
          <Link to="/" className="hover:text-blue-300 transition">
            Home
          </Link>
          <Link to="/bots" className="hover:text-blue-300 transition">
            Bots
          </Link>
          <Link to="/about" className="hover:text-blue-300 transition">
            About
          </Link>
          <Link to="/docs" className="hover:text-blue-300 transition">
            Docs
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
