import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-800 to-blue-950 text-blue-100 py-6 border-t border-blue-400/20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Left Section */}
        <div className="text-center md:text-left">
          <p className="text-sm md:text-base">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">CivicConnect AI</span>
          </p>
          <p className="text-xs md:text-sm text-blue-200 mt-1 italic">
            Empowering Citizens, Simplifying Governance.
          </p>
        </div>

        {/* Right Section - Links */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm md:text-base">
          <a
            href="#terms"
            className="hover:text-white transition duration-300"
          >
            Terms
          </a>
          <span className="hidden md:inline text-blue-300">•</span>
          <a
            href="#privacy"
            className="hover:text-white transition duration-300"
          >
            Privacy
          </a>
          <span className="hidden md:inline text-blue-300">•</span>
          <a
            href="#contact"
            className="hover:text-white transition duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
