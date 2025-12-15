import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";



gsap.registerPlugin(ScrollTrigger);



const wordsTop = ["Digital Design","   /    ", "Marketing","/", "Branding"];
const wordsBottom = ["Illustration",".", "Art Direction",".", "Strategy"];



// repeat list many times for infinite loop effect
const repeat = (arr, times = 20) =>
  Array.from({ length: times }, () => arr).flat();



const SlidingText = () => {
  const sectionRef = useRef(null);



  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });



      // Odd columns move in alternating directions with separate timelines
      gsap.utils.toArray(".col").forEach((col, index) => {
        if (index % 2 === 1) {
          // Column 1 moves down, Column 3 moves up (alternating)
          const isDownward = Math.floor(index / 2) % 2 === 0;
          
          gsap.fromTo(
            col,
            { yPercent: isDownward ? 0 : -60 },
            { 
              yPercent: isDownward ? -60 : 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );



  // create 4 columns alternating between top and bottom words
  const columns = Array.from({ length: 4 }, (_, colIndex) => {
    const isTopWords = colIndex % 2 === 0;
    return repeat(isTopWords ? wordsTop : wordsBottom, 20);
  });



  return (
    <section
      ref={sectionRef}
      className="bg-white h-[130vh] mt-25 mb-10 overflow-hidden flex items-center"
    >
      <div className="w-full h-full px-4 md:px-0">
        {/* slanted full-height wrapper */}
        <div className="h-full transform -rotate-6 md:-rotate-8 origin-center overflow-hidden">
          <div className="grid h-full grid-cols-4 gap-8 md:gap-12 lg:gap-32 max-w-8xl mx-auto">
            {columns.map((colWords, colIndex) => (
              <div
                key={colIndex}
                className="col flex flex-col justify-start gap-6 md:gap-8 -my-40"
                style={{ fontFamily: "Inter Tight, sans-serif" }}
              >
                {colWords.map((word, i) => (
                  <span
                    key={word + i}
                    className={`text-3xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap ${
                      colIndex % 2 === 0 ? "text-gray-300" : "text-black"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



export default SlidingText;
