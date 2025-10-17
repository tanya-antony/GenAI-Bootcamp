import React from "react";
import { Link, useLocation } from "react-router-dom";

const FeatureNavbar = ({ pageActionLabel = "New Chat", onActionClick, themeColor = "blue" }) => {
  const location = useLocation();

  const themeStyles = {
    blue: "bg-gradient-to-b from-indigo-800 via-blue-900 to-indigo-800",
    indigo: "bg-gradient-to-b from-indigo-800 via-indigo-900 to-blue-800",
    emerald: "bg-gradient-to-b from-emerald-800 via-emerald-900 to-blue-800",
  };

  const bgClass = themeStyles[themeColor] || themeStyles.blue;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${bgClass} shadow-md backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Brand */}
        <Link
          to="/"
          className="font-extrabold text-xl md:text-2xl text-white tracking-wide"
        >
          CivicConnect<span className="text-blue-200">AI</span>
        </Link>

        {/* Page Links */}
        <div className="hidden md:flex gap-6 text-white font-medium">
          <Link
            to="/lawbot"
            className={`hover:text-blue-200 transition-colors duration-300 ${
              location.pathname === "/lawbot" ? "text-blue-100 font-semibold" : ""
            }`}
          >
            LawBot
          </Link>
          <Link
            to="/talk2gov"
            className={`hover:text-blue-200 transition-colors duration-300 ${
              location.pathname === "/talk2gov" ? "text-blue-100 font-semibold" : ""
            }`}
          >
            Talk2Gov
          </Link>
          <Link
            to="/language"
            className={`hover:text-blue-200 transition-colors duration-300 ${
              location.pathname === "/language" ? "text-blue-100 font-semibold" : ""
            }`}
          >
            Language Assistant
          </Link>
        </div>

        {/* Action Button */}
        {onActionClick && (
          <button
            onClick={onActionClick}
            className="hidden md:block px-4 py-2 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition duration-300 shadow-sm"
          >
            {pageActionLabel}
          </button>
        )}
      </div>
    </nav>
  );
};

export default FeatureNavbar;
