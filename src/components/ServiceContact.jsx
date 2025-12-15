import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ServiceContact = () => {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const textContainer = textContainerRef.current;
      if (!section || !textContainer) return;

      gsap.fromTo(
        textContainer,
        {
          scale: 0.5,
          opacity: 0,
          transformOrigin: "center center",
        },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "center center",
            end: "+=" + window.innerHeight,
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="h-[85vh] w-[95vw] mx-auto bg-white mb-10 overflow-hidden flex items-center justify-center relative"
    >
      {/* Background grid layout with images */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Top left image */}
        <div className="absolute top-20 left-20 w-80 h-80">
          <img
            src="https://i.pinimg.com/1200x/3e/43/bb/3e43bbe3369aa024d0ca4189d1a5073f.jpg"
            alt="img1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom left image */}
        <div className="absolute bottom-18 left-25 w-64 h-64">
          <img
            src="https://i.pinimg.com/736x/3b/51/c9/3b51c993abf75b4afd5f93cc6602eea6.jpg"
            alt="img2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top right image */}
        <div className="absolute top-20 right-20 w-80 h-80">
          <img
            src="https://i.pinimg.com/1200x/4c/44/32/4c443271fd96c26e129ef214ff03569d.jpg"
            alt="img3"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom right image */}
        <div className="absolute bottom-18 right-25 w-64 h-64">
          <img
            src="https://i.pinimg.com/736x/b3/99/04/b3990487e9792ffa9f99be5a4aeff829.jpg"
            alt="img4"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

     
      <div
        ref={textContainerRef}
        className="relative z-10 text-center flex flex-col items-center justify-center gap-0"
        style={{ fontFamily: "Inter Tight, sans-serif" }}
      >
        
        <p className="text-sm md:text-base uppercase tracking-[0.25em] text-gray-900 mb-4 font-normal">
          THER - LET'S WORK TOG
        </p>

       
        
        <div className="text-center">
         <div className="text-6xl md:text-8xl font-bold text-black  bg-clip-text  mb-2">
  Elevate your brand
</div>

          <div className="text-2xl text-gray-900 mb-4">with</div>
          <div className="text-5xl md:text-8xl font-bold text-black">
            Club PR
          </div>
        </div>
       

       
        <button
          onClick={() => navigate("/contactus")}
          className="mt-12 px-8 py-3 rounded-full bg-black text-white text-lg font-bold 
                     transition duration-300 hover:scale-105 hover:bg-gray-800"
        >
          CONTACT US
        </button>
      </div>

      
    </section>
  );
};

export default ServiceContact;
