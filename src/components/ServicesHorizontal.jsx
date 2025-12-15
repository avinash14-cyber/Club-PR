
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// your images
import img1 from '../assets/services/wroks1.jpg'
import img2 from '../assets/services/works2.jpg'
import img3 from '../assets/services/works3.jpg'
import img4 from '../assets/services/works4.jpg'
// you can add more if you want
const images = [img1, img2, img3,img4,img1,img2];
const ServicesHorizontal = () => {
    const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const totalScroll = track.scrollWidth - track.clientWidth;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "center center",          // pin when section center hits viewport center
          end: () => "+=" + totalScroll,   // how long it stays pinned
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
      className="w-full h-[70vh] bg-[#FFF7EC] flex items-center justify-center "
    >
      {/* 90vw viewport */}
      <div className="w-[95vw] mb-15 mt-10 overflow-hidden">
        {/* horizontal track */}
        <div
          ref={trackRef}
          className="flex flex-nowrap"
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-[31.7vw] h-[70vh] " // 3 columns in 90vw => 30vw each
            >
              <img
                src={src}
                alt={`Artwork ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesHorizontal