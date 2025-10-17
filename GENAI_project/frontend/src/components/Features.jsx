/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scale, Landmark, Languages } from "lucide-react";

const features = [
  {
    id: 1,
    title: "LawBot",
    tagline: "AI Legal Aid",
    description: "Simplifies laws and generates documents like agreements or complaints.",
    icon: Scale,
    iconColor: "text-blue-100",
    hoverColor: "text-blue-300",
    link: "/lawbot",
  },
  {
    id: 2,
    title: "Talk2Gov",
    tagline: "Scheme Finder",
    description: "Finds eligible government schemes and guides you in filling forms.",
    icon: Landmark,
    iconColor: "text-indigo-100",
    hoverColor: "text-indigo-300",
    link: "/talk2gov",
  },
  {
    id: 3,
    title: "Language Assistant",
    tagline: "Regional Support",
    description: "Translates legal & government info into local languages.",
    icon: Languages,
    iconColor: "text-blue-100",
    hoverColor: "text-blue-300",
    link: "/language",
  },
];

const Features = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="flex flex-col md:flex-row justify-center gap-8 px-6 mb-20"
    >
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <Link
            key={feature.id}
            to={feature.link}
            className="group flex-1 bg-gradient-to-br from-blue-700 to-blue-900 border border-white/10 rounded-2xl p-6 text-center text-white
              hover:from-blue-600 hover:to-blue-800 hover:-translate-y-1 hover:shadow-xl
              transition-all duration-300 cursor-pointer"
          >
            <Icon
              className={`w-10 h-10 mx-auto mb-3 ${feature.iconColor} group-hover:${feature.hoverColor} transition-colors duration-300`}
            />
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-blue-200 font-semibold mb-2">{feature.tagline}</p>
            <p className="text-gray-100 text-sm">{feature.description}</p>
          </Link>
        );
      })}
    </motion.section>
  );
};

export default Features;
