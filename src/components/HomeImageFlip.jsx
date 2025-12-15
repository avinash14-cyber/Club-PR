import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  {
    src: "https://i.pinimg.com/1200x/a3/a1/87/a3a1878251e74f54949fa7786923b6dc.jpg",
    title: "Narrative Shift",
    subtitle: "A positioning overhaul campaign designed to reshape brand perception and strengthen media visibility across key markets.",
  },
  {
    src: "https://i.pinimg.com/1200x/b6/18/11/b6181147f14cbf318253d7e31db659a8.jpg",
    title: "Impact Launch",
    subtitle: "Full PR launch strategy blending press outreach, influencer partnerships, and story-driven content to create maximum buzz.",
  },
  {
    src: "https://i.pinimg.com/1200x/fb/6e/5d/fb6e5d44b447327e3d391ea322b9e8a3.jpg",
    title: "Reputation Pulse",
    subtitle: "An ongoing reputation management program focused on narrative control, thought leadership, and crisis-readiness.",
  },
  {
    src: "https://i.pinimg.com/1200x/b1/26/58/b12658fbf08087979ba1f9ab0b02f4be.jpg",
    title: "Storyline Campaign",
    subtitle: "A multi-channel storytelling initiative crafted to elevate brand voice, engage audiences, and secure consistent press coverage.",
  },
];

const HomeImagePanels = () => {
  const sectionRef = useRef(null);
  const panelRefs = useRef([]);
  const imgRefs = useRef([]);
  const textRefs = useRef([]);

  useGSAP(
    () => {
      const panels = panelRefs.current.filter(Boolean);
      const imgs = imgRefs.current.filter(Boolean);
      const texts = textRefs.current.filter(Boolean);
      if (!panels.length) return;

      panels.forEach((panel, i) => {
        const img = imgs[i];
        const text = texts[i];
        if (!img || !text) return;

        gsap.set(img, {
          scale: 1,
          transformOrigin: "center center",
        });
        gsap.set(text, { y: 60, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "+=100%", // Changed from "bottom top" to relative percentage
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        // image scale – smaller change and softer ease
        tl.to(img, {
          scale: 0.9,
          ease: "power3.out",
        });

        // text slide – longer duration & same smooth ease
        tl.to(
          text,
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
          },
          "<0.15"
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black text-black"
    >
      {/* Heading */}
      <div className="w-full bg-white px-6 md:px-12 lg:px-20 pt-12 pb-6">
        <h2
          className="text-4xl md:text-6xl lg:text-[4.5rem] font-semibold tracking-[0.15rem] text-center uppercase"
          style={{ fontFamily: "Bueno, Impact, sans-serif" }}
        >
          Our Works
        </h2>
      </div>

      {/* Panels */}
      {WORKS.map((work, index) => (
        <section
          key={work.src}
          ref={(el) => (panelRefs.current[index] = el)}
          className="relative w-full h-screen overflow-hidden"
        >
          {/* Image full-bleed */}
          <div
            ref={(el) => (imgRefs.current[index] = el)}
            className="absolute inset-0"
          >
            <img
              src={work.src}
              alt={work.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom black info strip */}
          <div
            ref={(el) => (textRefs.current[index] = el)}
            className="absolute left-0 right-0 bottom-0 bg-black/90 px-8 md:px-16 py-6 md:py-8"
          >
            <h3 className="text-2xl md:text-3xl text-white font-semibold">
              {work.title}
            </h3>
            <p className="mt-1 text-sm md:text-base text-white/70">
              {work.subtitle}
            </p>
          </div>
        </section>
      ))}
    </section>
  );
};

export default HomeImagePanels;