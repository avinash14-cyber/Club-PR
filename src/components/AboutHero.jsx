import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PANELS = [
  "https://i.pinimg.com/736x/7b/fe/83/7bfe83704540586589a1837018637a2f.jpg",
  "https://i.pinimg.com/1200x/c2/6e/c9/c26ec96935d9e27d7f5b6e241ba2f37b.jpg",
  "https://i.pinimg.com/1200x/5f/e6/6d/5fe66d8336a073feb8127919be7c4cdd.jpg",
  "https://i.pinimg.com/736x/49/2c/be/492cbe801d7f8bd8609c2df85a3bb191.jpg",
  "https://i.pinimg.com/736x/2b/05/db/2b05dbbd82a0c1cb70635112ef1fc084.jpg",
  "https://i.pinimg.com/1200x/fd/8d/f5/fd8df513df48279e6337c10ba381a5c4.jpg",
];

const AboutHero = () => {
  const sectionRef = useRef(null);
  const spinnerRef = useRef(null);

  useGSAP(
    () => {
      const spinner = spinnerRef.current;
      if (!spinner) return;

      gsap.set(spinner, {
        transformStyle: "preserve-3d",
        rotationY: 0,
      });

      // continuous auto‑spin
      gsap.to(spinner, {
        rotationY: 360,
        duration: 18,      // slower = smoother
        ease: "none",
        repeat: -1,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-black py-24 md:py-16 flex flex-col items-center"
    >
      <div className="max-w-5xl w-full px-6 text-center mb-16">
        <h2
          className="text-5xl md:text-7xl w-full lg:text-[6rem] font-semibold tracking-[0.15em] uppercase leading-tight"
           style={{ fontFamily: "Inter Tight, sans-serif" }}
        >
          WHO ARE WE?
        </h2>
        <p className="mt-6 text-base md:text-xl font-medium text-neutral-900" style={{ fontFamily: "Inter Tight, sans-serif" }}>
A digital agency blending strategy, design, and technology to craft brand experiences that not only stand out visually but also shape the way audiences think, feel, and engage.
        </p>
      </div>

      {/* 3D spinning ring */}
      <div
        className="relative w-full mt-5 flex justify-center"
        style={{ perspective: "1400px" }}
      >
        <div
          ref={spinnerRef}
          className="relative w-[260px] h-[360px] md:w-[340px] md:h-[460px]"
        >
          {PANELS.map((src, i) => {
            const angle = (360 / PANELS.length) * i;
            const translateZ = 280; // depth of ring
            return (
              <div
                key={src}
                className="absolute inset-0 origin-center overflow-hidden shadow-xl rounded-sm"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  src={src}
                  alt={`who-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutHero
