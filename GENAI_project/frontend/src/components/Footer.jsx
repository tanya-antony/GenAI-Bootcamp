import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-indigo-950 text-gray-300 py-4 border-t border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="text-center md:text-left">
          <p className="text-sm md:text-base">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-indigo-300">CivicConnect AI</span>
          </p>
          <p className="text-xs md:text-sm text-indigo-200 mt-1">
            Empowering Citizens, Simplifying Governance.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm md:text-base">
          <a href="#terms" className="hover:text-white transition-colors">Terms</a>
          <span className="hidden md:inline">•</span>
          <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
          <span className="hidden md:inline">•</span>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
