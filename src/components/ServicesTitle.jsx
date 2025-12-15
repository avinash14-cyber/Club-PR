import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const LINES = ["We Bring", "Boldest Ideas", "To Life"];

const ServicesTitle = () => {
  const containerRef = useRef(null);
  const linesRef = useRef([]);

  useGSAP(
    () => {
      const trigger = containerRef.current;
      const lines = linesRef.current.filter(Boolean);
      if (!trigger || !lines.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top 40%",   // start reacting a bit later (all gray at first)
          end: "bottom 50%",  // all letters black before end
          scrub: true,
        },
      });

      const totalLines = LINES.length;

      lines.forEach((lineEl, lineIndex) => {
        const letters = Array.from(lineEl.querySelectorAll(".letter"));
        const lettersCount = letters.length;

        letters.forEach((el, i) => {
          // fast progression: pack inside 0.1–0.9 range so it completes early
          const base = 0.1;
          const span = 0.8;

          const relative =
            (lineIndex + i / lettersCount) / (totalLines - 1 || 1); // 0..1 across all lines

          const pos = base + relative * span;

          tl.to(
            el,
            {
              onUpdate() {
                const p = this.progress();
                if (p > 0.3) {
                  // quick flip once tween has begun
                  el.classList.add("text-black");
                  el.classList.remove("text-gray-400");
                } else {
                  el.classList.add("text-gray-400");
                  el.classList.remove("text-black");
                }
              },
              duration: 0.001,
            },
            pos
          );
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="min-h-[120vh] bg-white flex flex-col items-center">
      <h1 style={{ fontFamily: "Inter Tight, sans-serif" }} className="text-5xl md:text-8xl font-bold mt-10">Our Services</h1>

      <div
        ref={containerRef}
        className="relative mt-20 px-6 overflow-hidden"
      >
        <h1
          className="font-extrabold uppercase tracking-[0.08em] text-[10vw] leading-tight text-center"
          style={{ fontFamily: "Impact, sans-serif" }}
        >
          {LINES.map((line, li) => (
            <span
              key={li}
              ref={(el) => (linesRef.current[li] = el)}
              className="block"
            >
              {line.split("").map((ch, i) => (
                <span
                  key={i}
                  className="letter inline-block text-gray-400"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
};

export default ServicesTitle;
