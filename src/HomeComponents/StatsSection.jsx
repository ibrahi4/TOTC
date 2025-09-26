import React from "react";

const stats = [
  { value: "15K+", label: "Students" },
  { value: "75%", label: "Total success" },
  { value: "35", label: "Main questions" },
  { value: "26", label: "Chief experts" },
  { value: "16", label: "Years of experience" },
];

const StatsSection = () => {
  return (
    <section className="relative z-10 px-6 pt-10 pb-20 text-center text-white md:px-12">
      {/* ✅ Background Layer */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-5xl" />
      </div>

      {/* ✅ Title */}
      <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
        Our <span className="text-[#00CBB8]">Success</span>
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
        TOTC is helping thousands of students and educators achieve their goals
        through powerful tools and smart learning experiences.
      </p>

      {/* ✅ Stats Grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl bg-white/5 px-4 py-6 backdrop-blur-md transition hover:scale-105"
          >
            <p className="text-3xl font-extrabold text-white sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-white/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ✅ Bottom CTA */}
      <div className="mt-16">
        <h3 className="text-xl font-bold md:text-3xl">
          <span className="text-white">All-In-One </span>
          <span className="text-[#00CBB8]">Cloud Software.</span>
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/70 md:text-base">
          TOTC is one powerful online software suite that combines all the tools
          needed to run a successful school or office.
        </p>
      </div>
    </section>
  );
};

export default StatsSection;
