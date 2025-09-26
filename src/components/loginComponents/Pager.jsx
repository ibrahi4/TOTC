// src/components/Pager.jsx
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import React from "react";

export default function Pager({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onGo, // optional direct jump
  rangeStart,
  rangeEnd,
  totalItems,
  className = "",
}) {
  if (totalPages <= 1) {
    return (
      <div className={`mt-4 text-sm text-gray-300 ${className}`}>
        Showing {totalItems} item{totalItems === 1 ? "" : "s"}
      </div>
    );
  }

  return (
    <div
      className={`mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      {/* Info Text */}
      <div className="text-sm text-gray-300">
        Showing{" "}
        <span className="font-semibold text-[#d2b200]">
          {rangeStart}-{rangeEnd}
        </span>{" "}
        of <span className="font-semibold text-white">{totalItems}</span>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={onPrev}
          disabled={currentPage <= 1}
          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white hover:bg-[#2f717b] hover:text-white transition disabled:opacity-50"
        >
          <FiChevronLeft /> Prev
        </button>

        {/* Quick Page Numbers */}
        {totalPages <= 7 && (
          <div className="hidden items-center gap-1 sm:flex">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const active = p === currentPage;
              return (
                <button
                  key={p}
                  onClick={() => onGo?.(p)}
                  className={`h-8 w-8 rounded-md text-sm font-medium transition ${
                    active
                      ? "bg-[#d2b200] text-black shadow"
                      : "bg-white/10 border border-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        )}

        {/* Next */}
        <button
          onClick={onNext}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white hover:bg-[#2f717b] hover:text-white transition disabled:opacity-50"
        >
          Next <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
