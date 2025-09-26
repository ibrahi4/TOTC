import React from "react";
import HeroSection from "../HomeComponents/HeroSection";
import FeaturesSection from "../HomeComponents/FeaturesSection";
import ShowcaseSection from "../HomeComponents/ShowcaseSection";
import HighlightsSection from "../HomeComponents/HighlightsSection";
import LastSection from "../HomeComponents/LastSection";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section>
        <HeroSection />
      </section>

      {/* Features Section */}
      <section>
        <FeaturesSection />
      </section>
      {/* Showcase Section */}
      <section>
        <ShowcaseSection />
      </section>

      {/* Highlights Section */}
      <section>
        <HighlightsSection />
      </section>

      {/* Last Section */}
      <section className="mb-16">
        <LastSection />
      </section>
    </div>
  );
}
