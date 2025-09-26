import React from "react";
import footerLogo from "../assets/svgs/footerLogo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#2a2a2a] backdrop-blur-sm text-gray-300 ring-1 ring-white/20 min-h-[64px] pt-5 pb-5">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Logo and Subscribe */}
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-4">
              <img src={footerLogo} alt="TOTC Logo" className="h-14 w-14" />
              <div>
                <h3 className="text-xl font-semibold text-white">TOTC</h3>
                <p className="text-sm text-gray-400 leading-tight">
                  Virtual Class <br /> for Zoom
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <p className="text-lg font-semibold text-white">
              Subscribe to get our Newsletter
            </p>
            <div className="mt-3 flex flex-col items-center sm:flex-row sm:space-x-4 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-full bg-[#3b3b3b] border border-gray-600 px-5 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#52D2E7] sm:w-auto transition"
              />
              <button className="mt-3 w-full rounded-full bg-[#204950] px-7 py-3 font-semibold text-white transition hover:bg-[#2f717b] sm:mt-0 sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between space-y-3 text-sm text-gray-400 md:flex-row md:space-y-0">
          <div className="flex flex-wrap justify-center space-x-6">
            <a href="#" className="hover:underline hover:text-white transition">
              Careers
            </a>
            <a href="#" className="hover:underline hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline hover:text-white transition">
              Terms & Conditions
            </a>
          </div>
          <p>© 2021 Class Technologies Inc.</p>
        </div>
      </div>
    </footer>
  );
}
