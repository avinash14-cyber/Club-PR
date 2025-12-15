import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {items} from '../constants/Constants'
gsap.registerPlugin(ScrollTrigger);



const HomeImageFlip = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const scrollLength = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${track.scrollWidth * 1.1}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white text-black overflow-hidden"
    >
      {/* Section Header */}
      <div className="absolute top-10 left-0 right-0 z-20 px-8 md:px-20">
        <span className="inline-block text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded">
          In the News
        </span>

        <h2 className="mt-6 max-w-5xl text-4xl md:text-6xl font-semibold leading-tight">
          Discover How Our Clients Are Making Headlines Worldwide
        </h2>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="absolute bottom-16  left-0 flex gap-10 px-20"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="min-w-[70vw] md:min-w-[38vw]"
          > 
            {/* Image container */}
           <div className="group relative h-[45vh] overflow-hidden rounded-lg bg-gray-800">
              <img
                src={item.src}
                alt={item.title}
                className="
                  w-full h-full object-cover
                  transform scale-100
                  transition-transform duration-700 ease-out
                  group-hover:scale-110
                "
              />
            </div>

            {/* Title */}
            <h3 className="mt-4 text-lg md:text-xl font-medium leading-snug">
              {item.title}
            </h3>

            {/* CTA */}
            <button className="mt-2 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition">
              {item.cta}
              <span className="text-lg">→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeImageFlip;
