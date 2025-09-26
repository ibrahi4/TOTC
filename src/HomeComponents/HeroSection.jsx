import ActionButton from "./ActionButton";
import InfoCard from "./InfoCard";
import p1 from "../assets/images/p1.jpg";
import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <section className="relative overflow-hidden pt-20 pb-10 text-white bg-transparent">
        {/* Gradient overlay for soft fade effect */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A192F] via-[#0A192F]/90 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 md:flex-row md:items-center md:justify-between">
          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight text-gray-100 md:text-5xl">
              <span className="text-[#00CBB8]">Studying</span> Online is now
              <br />
              much easier
            </h1>

            <p className="text-lg text-white/80 leading-relaxed max-w-xl mx-auto md:mx-0">
              TOTC is an immersive platform that delivers knowledge in a more
              dynamic, flexible, and interactive way — anytime, anywhere.
            </p>

            <div className="flex flex-col items-center justify-center gap-5 pt-6 sm:flex-row sm:justify-start">
              <ActionButton type="join" />
              <ActionButton type="video" />
            </div>
          </div>

          {/* RIGHT SIDE - Info Cards */}
          <div className="flex w-full flex-col items-center gap-6 md:w-1/2 md:items-end">
            <InfoCard
              type="stat"
              title="250k"
              subtitle="Assisted Students"
              className="w-full max-w-xs"
            />
            <InfoCard
              type="notification"
              image={p1}
              title="User Experience Class"
              subtitle="Today at 12:00 PM"
              hasButton
              buttonText="Join Now"
              className="w-full max-w-xs"
            />
            <InfoCard
              type="congratulations"
              title="Congratulations"
              subtitle="Your admission is complete"
              className="w-full max-w-xs"
            />
          </div>
        </div>

        {/* Decorative elements (subtle & soft) */}
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-[#00CBB8]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-[#00CBB8]/20 blur-2xl" />
      </section>
    </motion.section>
  );
}
