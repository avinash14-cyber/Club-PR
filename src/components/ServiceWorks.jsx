import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

import img1 from '../assets/services/wroks1.jpg'
import img2 from '../assets/services/works2.jpg'
import img3 from '../assets/services/works3.jpg'
import img4 from '../assets/services/works4.jpg'

const images = [
  img1,img2,img3,img4
];
const ServiceWorks = () => {
    const sectionRef = useRef(null);
  const imagesWrapperRef = useRef(null);

 useGSAP(
  () => {
    const wrapper = imagesWrapperRef.current;
    const section = sectionRef.current;
    if (!wrapper || !section) return;

   
    const cards = wrapper.querySelectorAll(".image-card");
    const totalSlides = cards.length;

    
    const extraScroll = (totalSlides - 1) * window.innerHeight;

    gsap.to(wrapper, {
      
      yPercent: -100 * (totalSlides - 1),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",                 
        end: "+=" + extraScroll,          
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
      className="bg-white  py-8 text-black"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 h-[90vh] overflow-hidden">
        {/* left column: text, stays fixed while pinned */}
        <div className="flex flex-col justify-center  py-16 space-y-8 md:pr-16">
          <p className="text-3xl md:text-4xl font-semibold leading-snug">
            Consider the world's most renowned and prosperous brands. They
            possess distinct visibility, easy discoverability, and significant
            impact.
          </p>
          <p className="text-lg text-black leading-relaxed">
            We contend that the human touch is indispensable to initiate any
            successful project, fostering splendid emotional connections between
            the company and individuals.
          </p>
          <button className="mt-4 inline-flex items-center justify-center rounded-full bg-neutral-200 text-black px-8 py-3 transition duration-300  text-lg font-medium hover:bg-black hover:text-white">
            Meet the team
          </button>
        </div>

        {/* right column: vertical image track */}
       {/* right column: vertical image track */}
<div className="relative h-screen overflow-hidden">
  <div
    ref={imagesWrapperRef}
    className="flex flex-col  h-full"
  >
    {images.map((src, i) => (
      <div
        key={i}
        className="image-card h-full shrink-0"
      >
        <img
          src={src}
          alt={`Work ${i + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
    ))}
  </div>
</div>


      </div>
    </section>
  )
}

export default ServiceWorks