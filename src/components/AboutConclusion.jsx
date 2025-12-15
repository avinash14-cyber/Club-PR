import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutConclusion = () => {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
  const section = sectionRef.current;
  const overlay = overlayRef.current;
  const img = imgRef.current;
  if (!section || !overlay || !img) return;

  gsap.set(overlay, {
    xPercent: 0,
    skewX: 0,
    transformOrigin: "left center",
  });
  gsap.set(img, { scale: 1.02 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top center",   // just as section enters viewport
      end: "top top",        // when section top reaches top → fully unmasked
      scrub: true,
      // markers: true,
    },
  });

  tl.to(
    overlay,
    {
      xPercent: 110,
      skewX: -12,
      ease: "power1.out",
      duration: 1,
    },
    0
  );

  tl.to(
    img,
    {
      scale: 1,
      ease: "power1.out",
      duration: 1,
    },
    0
  );

  return () => {
    tl.scrollTrigger && tl.scrollTrigger.kill();
    tl.kill();
  };
}, []);


  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-black py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left image column */}
          <div className="md:col-span-6 relative">
            <div className="relative overflow-hidden">
              <img
                ref={imgRef}
                src="https://i.pinimg.com/736x/29/ff/1f/29ff1f1539dfc3282884ab31c47430bf.jpg"
                alt="mission"
                className="w-full h-[80vh] object-cover block"
                style={{ transformOrigin: "center center" }}
              />
              <div
                ref={overlayRef}
                className="absolute inset-0 bg-white pointer-events-none"
              />
            </div>
          </div>

          {/* Right text column */}
          <div className="md:col-span-6 flex flex-col justify-center">
            <h2
              className="text-4xl md:text-6xl font-bold tracking-[0.12em] mb-6"
               style={{ fontFamily: "Inter Tight, sans-serif" }}
            >
              OUR MISSION
            </h2>

            <p className="text-base md:text-xl text-black mb-8 max-w-xl"   style={{ fontFamily: "Inter Tight, sans-serif" }}>
              We are dedicated to helping businesses harness the power of
              digital to thrive in an ever-changing world. Our mission is to
              craft innovative solutions that not only meet immediate goals but
              also set the stage for long-term growth.
            </p>

            <div style={{ fontFamily: "Inter Tight, sans-serif" }} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 max-w-2xl">
              <div>
                <h4 className="font-semibold text-2xl tracking-wider mb-2">
                  INSPIRING CREATIVITY
                </h4>
                <p className="text-lg  text-neutral-600">
                  At the heart of our mission lies a passion for creativity. We
                  believe every brand has a story to tell, and we strive to
                  bring it to life in bold, imaginative ways.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-2xl tracking-wider mb-2">
                  DELIVERING RESULTS
                </h4>
                <p className="text-lg text-neutral-600">
                  We measure our success by the impact we create. Our mission is
                  to deliver tangible results that elevate brands and foster
                  growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutConclusion;
