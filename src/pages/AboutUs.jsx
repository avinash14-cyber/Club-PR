import React, { useRef } from "react";
import AboutHero from "../components/AboutHero";

import AboutTimeline from "../components/AboutTimeline";
import AboutQualities from "../components/AboutQualities";
import AboutConclusion from "../components/AboutConclusion";
import AboutValues from "../components/AboutValues";


const AboutSection = () => {
  

  return (
    <>
     
    <AboutHero/>
    <AboutValues/>
    <AboutTimeline/>

       
    <AboutQualities/>

    <AboutConclusion/>

    
    </>
  );
};

export default AboutSection;
