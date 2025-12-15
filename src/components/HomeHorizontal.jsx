import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HomeHorizontal = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const iconsRef = useRef([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) return;

      // Horizontal scroll effect
      gsap.fromTo(
        track,
        { xPercent: -20 },
        {
          xPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            // markers: true,
          },
        }
      );

      // Rotate starburst icons
      gsap.fromTo(
        iconsRef.current,
        { rotate: 0 },
        {
          rotate: 360,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-6 mt-15 bg-neutral-800 border-b border-t border-white overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-24 whitespace-nowrap px-6"
      >
        {/* Repeat long phrase */}
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-10">
            
            {/* Entire text together */}
            <span className="text-[8vw] md:text-7xl font-extrabold tracking-[0.15em] uppercase leading-none text-white">
              Crafting Visual Stories
            </span>

            {/* Starburst AFTER the full phrase */}
            <svg
              ref={(el) => (iconsRef.current[idx] = el)}
              viewBox="0 0 100 100"
              className="w-12 h-12 fill-white"
            >
              <g transform="translate(50,50)">
                {Array.from({ length: 16 }).map((_, i) => (
                  <rect
                    key={i}
                    x="-4"
                    y="-40"
                    width="8"
                    height="40"
                    rx="2"
                    transform={`rotate(${(360 / 16) * i})`}
                  />
                ))}
              </g>
            </svg>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeHorizontal;
