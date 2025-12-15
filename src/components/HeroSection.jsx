import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const bigTextRef = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const scrollTlRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const big = bigTextRef.current;
    const left = leftRef.current;
    const center = centerRef.current;
    const right = rightRef.current;
    if (!container || !big || !left || !center || !right) return;

    // initial setups
    gsap.set(left, { opacity: 0, x: -60, y: 0 });
    gsap.set([center, right], { opacity: 0, y: 100 });

    const [clubLine, prLine] = big.querySelectorAll(".big-line");

    const scaleDuration = 1.1;
    const scaleDelay = 1.0; // 1 second delay

    // scale animation that runs once
    gsap.to(big, {
      scale: 2,
      color: "#000000",
      duration: scaleDuration,
      ease: "power3.out",
      delay: scaleDelay,
      onStart() {
        gsap.set(big, { opacity: 1 });
      },
      onComplete() {
        // reveal left panel once
        gsap.to(left, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        });

        // kill previous timeline if exists
        if (scrollTlRef.current) {
          try {
            scrollTlRef.current.scrollTrigger.kill();
          } catch (e) {}
          try {
            scrollTlRef.current.kill();
          } catch (e) {}
          scrollTlRef.current = null;
        }

        // pick the sticky element inside container
        const stickyEl = container.querySelector(".sticky");

        // compute end pixels (350% of viewport height)
        const endPercent = 350;
        const endPx = Math.round((window.innerHeight * endPercent) / 100);

        // ensure container has enough height for the pin duration (viewport + pinned distance)
        // this prevents ScrollTrigger from finishing too early and causing a jump
        container.style.minHeight = `${window.innerHeight + endPx}px`;

        // force ScrollTrigger to recalc before creating the timeline
        ScrollTrigger.refresh();

        // create scroll timeline, pin the sticky element (not the entire section)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: `+=${endPx}`, // px based end avoids percent/height mismatch
            scrub: 1,
            pin: stickyEl,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // markers: true,
          },
        });

        // Add BRANDING/STRATEGY scroll-controlled movement
        // BRANDING moves left, STRATEGY moves right while scrolling (medium speed)
        tl.to(clubLine, { x: "-30vw", duration: 2.5, ease: "none" }, 0);
        tl.to(prLine, { x: "30vw", duration: 2.5, ease: "none" }, 0);

        // timeline animations - all content animations happen simultaneously with text movement
        tl.to(left, { opacity: 1, y: 0, duration: 0, ease: "none" }, 0);
        tl.to(left, { opacity: 0, y: 120, duration: 1, ease: "power2.out" }, 0.3);
        
        tl.to(center, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.5);
        tl.to(center, { opacity: 0, y: 120, duration: 1, ease: "power2.inOut" }, 1.5);
        
        tl.to(right, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 1.7);
        tl.to(right, { opacity: 0, y: 120, duration: 1, ease: "power2.inOut" }, 2.5);

        scrollTlRef.current = tl;
      },
    });

    // line split animation in parallel with the scale
    gsap.to(clubLine, {
      y: "-7vh",
      duration: scaleDuration,
      ease: "power3.out",
      delay: scaleDelay,
    });
    gsap.to(prLine, {
      y: "7vh",
      duration: scaleDuration,
      ease: "power3.out",
      delay: scaleDelay,
    });

    // refresh on resize to keep calculations correct
    const handleResize = () => {
      // if there's an active timeline, let ScrollTrigger recompute on refresh
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollTlRef.current) {
        try {
          scrollTlRef.current.scrollTrigger.kill();
        } catch (e) {}
        try {
          scrollTlRef.current.kill();
        } catch (e) {}
        scrollTlRef.current = null;
      }
      gsap.killTweensOf([big, left, center, right, clubLine, prLine]);
      // clear any inline minHeight we set
      if (container) container.style.minHeight = "";
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="w-full bg-white text-black relative"
        style={{ minHeight: "200vh" }} // fallback initial minHeight
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          {/* CLUB PR big text */}
          <div
            ref={bigTextRef}
            className="text-center leading-none select-none absolute"
            style={{
              fontFamily: "sans-serif",
              fontSize: "10vw",
              lineHeight: 0.8,
              transformOrigin: "center center",
            }}
          >
            <div className="big-line">BRANDING</div>
            <div className="big-line" style={{ marginTop: "3vw" }}>
              STRATEGY
            </div>
          </div>

          {/* Panels row - flex-around */}
          <div className="absolute inset-0 flex items-center justify-around px-8 pointer-events-none">
            {/* LEFT (initially hidden; appears after scale completes) */}
            <div
              ref={leftRef}
              className="max-w-md pointer-events-auto"
              style={{ opacity: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                The online
                <br />
                revolution is
                <br />
                here
              </h1>
              <p className="mt-6 text-base md:text-lg text-black/70">
                We craft narratives that make brands impossible to ignore.
              </p>
            </div>

            {/* CENTER (hidden until its turn) */}
            <div ref={centerRef} className="max-w-md text-center" style={{ opacity: 0 }}>
              <div className="text-6xl md:text-8xl lg:text-9xl font-normal">15.</div>
              <div className="text-5xl md:text-7xl lg:text-8xl font-normal mt-2">August</div>
              <div className="text-5xl md:text-7xl lg:text-8xl font-normal">.2024</div>
            </div>

            {/* RIGHT (hidden until its turn) */}
            <div ref={rightRef} className="max-w-md text-right" style={{ opacity: 0 }}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal leading-tight">
                Join us for a
                <br />
                virtual
                <br />
                conference
              </h2>
            </div>
          </div>
        </div>
      </section>
      
     
    </>
  );
};

export default HeroSection;