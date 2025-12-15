import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HomeWhat = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const letters = section.querySelectorAll(".what-letter");

      gsap.fromTo(
  letters,
  { color: "rgb(107 114 128)", filter: "blur(6px)" },
  {
    color: "#000000",
    filter: "blur(0px)",
    stagger: 0.02,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 50%",
      end: "bottom 40%",
      scrub: true,
    },
  }
);

    },
    { scope: sectionRef }
  );

  const text =
    "We turn ideas into stories people care about. Through thoughtful strategy, bold creativity, and strong media relationships, we help brands express who they are and why they matter. Our work spans content, campaigns, and communication — all designed to grow your visibility and deepen your impact.";

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 bg-white text-black flex items-center justify-center px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto text-center space-y-6">

        <h2
          className="text-4xl md:text-8xl font-semibold tracking-normal"
          style={{ fontFamily: 'Poppins, sans-serif'
 }}
        >
          What We Do
        </h2>

        
        <p className="text-gray-500 text-base md:text-5xl font-normal text-justify max-w-6xl leading-relaxed mx-auto"  style={{ fontFamily: "Inter Tight, sans-serif" }}>
          {text.split("").map((char, i) => (
            <span
              key={i}
              className="what-letter"
              style={{
                display: "inline-block",
                color: "rgb(107 114 128)", 
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>

      </div>
    </section>
  );
};

export default HomeWhat;
