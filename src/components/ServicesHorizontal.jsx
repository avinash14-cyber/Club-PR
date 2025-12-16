import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { faPhone,faMessage,faCompassDrafting,faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    step: "01",
    title: "Call with Us",
    text: "Let’s discuss your vision, goals, and challenges to understand what success looks like for you.",
    icon: faPhone,
  },
  {
    step: "02",
    title: "Strategy & Concept",
    text: "We shape big ideas into bold concepts that align with your goals and audience.",
    icon: faMessage,
  },
  {
    step: "03",
    title: "Design & Development",
    text: "Our team transforms ideas into reality through thoughtful design and seamless execution.",
    icon: faCompassDrafting,
  },
  {
    step: "04",
    title: "Launch & Support",
    text: "We ensure a smooth rollout and stay by your side for ongoing improvements and growth.",
    icon: faRocket,
  },
];

const ServiceHorizontal = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const cards = track.querySelectorAll(".step-card");
      if (!cards.length) return;

      // total horizontal scroll = (cardCount - 1) * cardWidth
      const totalScroll = track.scrollWidth - section.offsetWidth;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`, // how long the section stays pinned
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-15 bg-white text-black"
    >
      {/* Heading */}
      <div className="w-full px-6 md:px-12 lg:px-20 pt-12 pb-8 bg-white">
        <h2
          className="text-4xl md:text-6xl lg:text-8xl font-semibold tracking-[0.15rem] uppercase"
           style={{ fontFamily: "Inter Tight, sans-serif" }}
        >
          WHAT NEXT
        </h2>
      </div>

      {/* Horizontal cards */}
      <div className="overflow-hidden mt-10">
        <div
          ref={trackRef}
          className="flex gap-8 px-6 md:px-12 lg:px-20 pb-16"
        >
          {STEPS.map((step) => (
            <article
              key={step.step}
              className="step-card shrink-0 w-[85vw] md:w-[55vw] lg:w-[45vw] bg-white text-black rounded-4xl border border-black/15 shadow-[0_0_0_1px_rgba(0,0,0,0.03)]"
            >
              <div className="p-8 md:p-10 flex flex-col justify-between h-full"  style={{ fontFamily: "Inter Tight, sans-serif" }}>
                <div className="flex items-center gap-3 mb-8">
                  <span className="inline-flex items-center px-5 py-2 rounded-full bg-black text-white text-xs tracking-[0.18em]">
                    STEP
                  </span>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-sm font-semibold">
                    {step.step}
                  </span>
                </div>

                <div className="flex justify-between items-start gap-8">
                  <div className="max-w-[60%]">
                    <h3 className="text-2xl md:text-4xl font-semibold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-lg text-black/70 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                  <div className="flex-1 flex justify-center items-center text-[96px] md:text-[140px] text-gray-600 select-none">
                    <FontAwesomeIcon icon={step.icon} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHorizontal;
