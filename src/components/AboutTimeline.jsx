import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutTimeline = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const yearRef = useRef(null);
  const circlesRef = useRef([]);

  useGSAP(
    () => {
      // Title slides in from left
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Year slides in from right
      gsap.fromTo(
        yearRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Circles rotate into place
      circlesRef.current.forEach((circle, index) => {
        gsap.fromTo(
          circle,
          { opacity: 0, rotation: -180, scale: 0 },
          {
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1,
            ease: "back.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 20%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full h-[70vh]  py-20 px-8 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl">
          {/* Top Section */}
          <div className="flex items-start justify-between mb-20">
            {/* Left: Title */}
            <div ref={titleRef} className="w-1/3">
             
              <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
                Our <span className="border-b-4 border-white">Timeline</span>
              </h2>
              <p className="text-black leading-relaxed text-xl font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor
                sed gravida.
              </p>
            </div>

            {/* Right: Year */}
            <div ref={yearRef} className="text-8xl font-bold text-black">
              2013
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center justify-between gap-8">
            {/* Founded */}
            <div
              ref={(el) => (circlesRef.current[0] = el)}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center bg-gray-200">
                <svg
                  className="w-10 h-10"
                  fill="black"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 6h2v12H3V6zm4 0h2v12H7V6zm4 0h2v12h-2V6zm4 0h2v12h-2V6zm4 0h2v12h-2V6z" />
                </svg>
              </div>
              <p className="font-semibold text-black">FOUNDED</p>
            </div>

            {/* Connecting Line */}
            <div className="flex-1 h-0.5 bg-black"></div>

            {/* Expand */}
            <div
              ref={(el) => (circlesRef.current[1] = el)}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center bg-gray-200">
                <svg
                  className="w-10 h-10"
                  fill="black"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14h8V5H8zm3 11h-1v-3H7v-1h3v4zm5 0h-1v-4h3v1h-2v3z" />
                </svg>
              </div>
              <p className="font-semibold text-black">EXPAND</p>
            </div>

            {/* Connecting Line */}
            <div className="flex-1 h-0.5 bg-black"></div>

            {/* Today */}
            <div
              ref={(el) => (circlesRef.current[2] = el)}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center bg-gray-200">
                <svg
                  className="w-10 h-10"
                  fill="black"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <p className="font-semibold text-black">TODAY</p>
            </div>
          </div>
        </div>
      </section>

    
    </>
  );
};

export default AboutTimeline;
