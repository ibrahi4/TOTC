import React from "react";
import WhatIsTOTC from "../HomeComponents/WhatIsTOTC";
import StatsSection from "../HomeComponents/StatsSection";

const About = () => {
  return (
    <div>
      <section>
        <WhatIsTOTC />
      </section>
      <section>
        <StatsSection />
      </section>
    </div>
  );
};

export default About;
