import React from "react";
import SectionTitle from "./SectionTitle";

export default function LastSection() {
  return (
    <section className="py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        <SectionTitle
          title="Latest News and"
          highlight="Resources"
          align="center"
          size="text-2xl md:text-3xl"
          highlightColor="#00CBB8"
        />
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-300">
          See the developments that have occurred to TOTC in the world
        </p>

        {/* News Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Main News Card */}
          <div className="relative overflow-hidden rounded-2xl bg-white/10 shadow-xl backdrop-blur-md transition-transform hover:scale-[1.02]">
            <img
              src="/src/assets/images/labtop.png"
              alt="Zoom meeting on laptop"
              className="w-full object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <span className="inline-block bg-blue-600/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white rounded-full">
                NEWS
              </span>
              <h3 className="mt-4 text-xl font-bold text-white">
                Class adds $30 million to its balance sheet for a Zoom-friendly
                edtech solution
              </h3>
              <p className="mt-2 text-sm text-gray-300">
                Class, launched less than a year ago by Blackboard co-founder
                Michael Chasen, integrates exclusively...
              </p>
              <a
                href="#"
                className="mt-4 block text-sm font-semibold text-[#00CBB8] hover:underline"
              >
                Read more
              </a>
            </div>
          </div>

          {/* Side News Cards */}
          <div className="space-y-6">
            {/* Small Card 1 */}
            <div className="flex bg-white/10 rounded-2xl shadow-md backdrop-blur-md transition hover:scale-[1.01]">
              <img
                src="/src/assets/images/child.png"
                alt="Student with tablet"
                className="h-40 w-40 flex-shrink-0 object-cover rounded-l-2xl"
              />
              <div className="relative p-4 text-white">
                <span className="inline-block bg-blue-600/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full">
                  PRESS RELEASE
                </span>
                <h4 className="mt-2 text-base font-bold">
                  Class Technologies Inc. Closes $30 Million Series A Financing
                  to Meet High Demand
                </h4>
                <p className="mt-1 text-sm text-gray-300">
                  Class Technologies Inc., the company that created Class...
                </p>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="flex bg-white/10 rounded-2xl shadow-md backdrop-blur-md transition hover:scale-[1.01]">
              <img
                src="/src/assets/images/emploee.png"
                alt="Person on laptop with video call"
                className="h-40 w-40 flex-shrink-0 object-cover rounded-l-2xl"
              />
              <div className="relative p-4 text-white">
                <span className="inline-block bg-blue-600/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full">
                  NEWS
                </span>
                <h4 className="mt-2 text-base font-bold">
                  Zoom’s earliest investors are betting millions on a better
                  Zoom for schools
                </h4>
                <p className="mt-1 text-sm text-gray-300">
                  Zoom was never created to be a consumer product. Nonetheless,
                  the...
                </p>
              </div>
            </div>

            {/* Small Card 3 */}
            <div className="flex bg-white/10 rounded-2xl shadow-md backdrop-blur-md transition hover:scale-[1.01]">
              <img
                src="/src/assets/images/cat.png"
                alt="Dog on video call"
                className="h-40 w-40 flex-shrink-0 object-cover rounded-l-2xl"
              />
              <div className="relative p-4 text-white">
                <span className="inline-block bg-blue-600/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full">
                  NEWS
                </span>
                <h4 className="mt-2 text-base font-bold">
                  Former Blackboard CEO Raises $16M to Bring LMS Features to
                  Zoom Classrooms
                </h4>
                <p className="mt-1 text-sm text-gray-300">
                  This year, investors have reaped big financial returns from
                  betting on Zoom...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
