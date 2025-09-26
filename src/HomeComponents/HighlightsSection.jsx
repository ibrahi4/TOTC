import SectionTitle from "./SectionTitle";
import { PiSquaresFourFill } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { BsBarChartSteps } from "react-icons/bs";
import ActionButton from "./ActionButton";
import React from "react";

export default function HighlightsSection() {
  return (
    <section className="py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          {/* Video UI */}
          <div className="relative mx-auto w-full max-w-2xl lg:w-1/2">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">
              {/* Grid of user cards */}
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {[
                  { src: "/src/assets/images/img1.png", label: "Teacher" },
                  {
                    src: "/src/assets/images/img2.png",
                    label: "Teresa Mendoza",
                  },
                  { src: "/src/assets/images/img3.jpg", label: "Adam Smith" },
                  {
                    src: "/src/assets/images/img4.png",
                    label: "Martha Howard",
                    large: true,
                  },
                  {
                    src: "/src/assets/images/img5.png",
                    label: "Patricia Mendoza",
                  },
                ].map(({ src, label, large }, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-2xl shadow-md ${
                      large ? "col-span-2 aspect-[2.5/2]" : "aspect-[1/1]"
                    }`}
                  >
                    <img
                      src={src}
                      alt={label}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2 text-white">
                      <span className="text-sm font-semibold">{label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-center gap-4">
                <ActionButton type="present" />
                <ActionButton type="call" />
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="flex-1 space-y-6 lg:w-1/2">
            <SectionTitle
              title="A user interface"
              highlight="designed"
              align="left"
              highlightColor="#00CBB8"
              size="text-4xl leading-tight md:text-5xl"
            />
            <p className="text-left text-2xl font-semibold text-gray-200">
              for the classroom
            </p>

            <ul className="space-y-6">
              {[
                {
                  icon: (
                    <PiSquaresFourFill className="h-6 w-6 text-[#00CBB8]" />
                  ),
                  text: "Teachers don’t get lost in the grid view and have a dedicated Podium space.",
                },
                {
                  icon: <IoIosPeople className="h-6 w-6 text-[#00CBB8]" />,
                  text: "TA’s and presenters can be moved to the front of the class.",
                },
                {
                  icon: <BsBarChartSteps className="h-6 w-6 text-[#00CBB8]" />,
                  text: "Teachers can easily see all students and class data at one time.",
                },
              ].map(({ icon, text }, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    {icon}
                  </div>
                  <p className="text-base text-gray-300">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 flex flex-col items-center gap-12 md:flex-row-reverse"></div>
      </div>
    </section>
  );
}
