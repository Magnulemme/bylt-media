"use client";
import React from "react";

const StackCard = ({ logo, name, tag }) => {
  const getTagColor = (tag) => {
    switch (tag) {
      case "SEO":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Paid Media":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Web Dev":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    }
  };

  return (
    <div className="relative w-[220px] h-[200px] bg-[#22223b]/80 backdrop-blur-sm border border-[#4a4e69]/50 rounded-2xl group overflow-hidden hover:border-[#4a4e69] transition-all duration-300">
      {/* Tag */}
      <div className="absolute top-3 right-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTagColor(
            tag
          )} backdrop-blur-sm`}
        >
          {tag}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
        {/* Logo */}
        <div className="w-20 h-20 flex items-center justify-center">
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/80x80/4a4e69/FFFFFF?text=" +
                name.charAt(0);
            }}
          />
        </div>

        {/* Name */}
        <p className="text-white font-semibold text-base text-center group-hover:text-purple-300 transition-colors">
          {name}
        </p>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </div>
  );
};

export default StackCard;
