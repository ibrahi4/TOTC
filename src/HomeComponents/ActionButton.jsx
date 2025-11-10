import React from "react";
import { useNavigate } from "react-router-dom";

export default function ActionButton({ type }) {
  const navigate = useNavigate();

  // Common style for glass buttons
  const baseStyles =
    "rounded-full px-6 py-3 text-sm font-semibold shadow-md transition backdrop-blur-md";

  const handleClick = () => {
    if (type === "join") {
      navigate("/login"); // زرار join يودي للصفحة اللوجن
    } else if (type === "video") {
      navigate("/courses"); // زرار video يودي لصفحة الكورسات
    }
  };

  if (type === "join") {
    return (
      <button
        onClick={handleClick}
        className={`${baseStyles} bg-white/30 text-white hover:bg-white/40`}
      >
        Join for free
      </button>
    );
  }

  if (type === "video") {
    return (
      <div
        onClick={handleClick}
        className="flex cursor-pointer items-center space-x-3 text-white"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/40 text-[#00CBB8] shadow-lg backdrop-blur-xl transition hover:bg-white/60">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 4l10 6-10 6V4z" />
          </svg>
        </div>
        <span className="font-medium text-white/90">Watch how it works</span>
      </div>
    );
  }

  if (type === "present") {
    return (
      <button
        className={`${baseStyles} bg-[#00CBB8]/30 text-white hover:bg-[#00CBB8]/50`}
      >
        Present
      </button>
    );
  }

  if (type === "call") {
    return (
      <button
        className={`${baseStyles} bg-pink-600/30 text-white hover:bg-pink-600/50`}
      >
        Call
      </button>
    );
  }

  return null;
}
