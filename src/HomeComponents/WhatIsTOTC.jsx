import SectionTitle from "./SectionTitle";
import InfoCard from "../HomeComponents/InfoCard";
import student from "../assets/images/student.png";
import instructor from "../assets/images/instruction.png";
import React from "react";

export default function WhatIsTOTC() {
  return (
    <section className="px-4 pt-20 pb-10 md:px-10 text-white bg-transparent">
      {/*Section Title*/}
      <SectionTitle title="What is" highlight="TOTC?" />

      {/* Description */}
      <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-white/80">
        TOTC is a platform that allows educators to create online classes
        whereby they can store the course materials online; manage assignments,
        quizzes and exams; monitor due dates; grade results and provide students
        with feedback — all in one place.
      </p>

      {/* Cards */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        <InfoCard
          promo
          title="FOR INSTRUCTORS"
          buttonText="Start a class today"
          image={instructor}
          overlayColor="bg-black/40"
          buttonBg="border border-white hover:bg-white/10 transition"
          buttonTextColor="text-white"
        />

        <InfoCard
          promo
          title="FOR STUDENTS"
          buttonText="Enter access code"
          image={student}
          overlayColor="bg-black/40"
          buttonBg="bg-[#49BBBD] hover:bg-[#3ba6a7] transition"
          buttonTextColor="text-white"
        />
      </div>
    </section>
  );
}
