import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    title: "Branding",
    desc: "Branding creates a unique identity, builds trust, and enhances recognition.",
  },
  {
    title: "Social Media",
    desc: "Social media connects people, promotes brands, and drives engagement globally.",
  },
  {
    title: "Advertising",
    desc: "Advertising promotes products, services, or brands to attract and engage audiences.",
  },
  {
    title: "Marketing",
    desc: "Marketing creates, communicates, and delivers value to attract and retain customers.",
  },
];

const Arrow = ({ className = "" }) => (
  <svg
    className={`w-14 h-14 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M5 19L19 5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 5h4v4"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Cards = () => {
  const itemsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    if (!items.length) return;

    // store timelines we create so we only kill these later
    const createdTimelines = [];

    items.forEach((el, i) => {
      const fromX = i % 2 === 0 ? "-18vw" : "18vw";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 55%",
          scrub: 1,
          // markers: true,
        },
      });

      tl.fromTo(
        el,
        { x: fromX, y: 28, opacity: 0 },
        {
          x: "0vw",
          y: -8,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        }
      );

      tl.to(el, {
        y: 0,
        duration:1.5,
        ease: "bounce.out",
      });

      createdTimelines.push(tl);
    });

    // ensure all scrollTriggers recalc positions after we add ours
    ScrollTrigger.refresh();

    return () => {
      // only kill timelines/triggers we created here
      createdTimelines.forEach((tl) => {
        try {
          tl.scrollTrigger && tl.scrollTrigger.kill();
        } catch (e) {}
        try {
          tl.kill();
        } catch (e) {}
      });

      // kill any tweens of our item elements specifically
      try {
        gsap.killTweensOf(items);
      } catch (e) {}
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white text-black py-16">
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <h2
          className="text-7xl font-semibold mb-15 text-center"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Services We Offer
        </h2>

        <div className="space-y-10">
          {ITEMS.map((item, idx) => (
            <div
              key={item.title}
              ref={(el) => (itemsRef.current[idx] = el)}
              className={`flex items-start gap-6 pb-6 opacity-0 transform-gpu ${
                idx < ITEMS.length - 1 ? "border-b-2 border-black" : ""
              }`}
            >
              <div className="shrink-0 mt-1 text-emerald-400">
                <Arrow />
              </div>

              <div className="min-w-0">
                <h3 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-black">
                  {item.title}
                </h3>
                <p className="mt-3 text-black text-sm md:text-xl max-w-2xl">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
