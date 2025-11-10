// src/components/FeatureCard.jsx
import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="rounded-xl bg-white/5 p-6 text-center shadow-xl backdrop-blur-md transition hover:shadow-cyan-500/20">
      {/* Icon */}
      <div className="-mt-16 mb-4 flex justify-center">
        <div className="h-[100px] w-[100px]">
          <img src={icon} alt="icon" className="h-full w-full object-contain" />
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
};

export default FeatureCard;
