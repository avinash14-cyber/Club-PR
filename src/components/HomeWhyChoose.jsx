import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeWhyChoose = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const pinRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const wrapper = section ? section.querySelector(".pin-wrapper") : null;
    if (!section || !left || !right || !wrapper) return;

    let pinTween = null;
    let introTL = null;
    let introTrigger = null;

    const headingEl = left.querySelector("h2");

    // Avoid flashes
    gsap.set(section, { backgroundColor: "#000" });
    gsap.set(headingEl, { opacity: 0, y: 20, color: "#fff" });
    gsap.set(right, { opacity: 0, y: 20, pointerEvents: "none" });

    const setupPin = () => {
      // Cleanup
      if (pinTween) {
        try { pinTween.scrollTrigger.kill(); } catch (e) {}
        try { pinTween.kill(); } catch (e) {}
        pinTween = null;
      }
      if (pinRef.current) {
        try { pinRef.current.kill(); } catch (e) {}
        pinRef.current = null;
      }

      // Measurements
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const lastCard = right.lastElementChild;
      
      if (!lastCard) return;

      // Calculate how much we need to scroll to center the last card
      const lastCardHeight = lastCard.offsetHeight;
      const lastCardTop = lastCard.offsetTop;
      
      const lastCardCenter = lastCardTop + (lastCardHeight / 2);
      const viewportCenter = viewport / 2;
      const scrollNeeded = lastCardCenter - viewportCenter;
      
      // Add intro duration to the pin distance (convert seconds to scroll distance)
      const introScrollBuffer = viewport * 0.5; // Extra distance for intro
      const pinDistance = Math.max(scrollNeeded + introScrollBuffer + 100, viewport);

      // Make section tall enough
      section.style.minHeight = `${viewport + pinDistance}px`;

      ScrollTrigger.refresh();

      // Create timeline, pin wrapper
      pinTween = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${pinDistance}`,
          scrub: 1.2,
          pin: wrapper,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
          onEnter: () => {
            // Disable scrubbing during intro
            if (scrollTriggerRef.current) {
              scrollTriggerRef.current.getTween().vars.scrub = false;
            }
          },
        },
      });

      scrollTriggerRef.current = pinTween.scrollTrigger;

      // Add a delay at the start before any movement
      pinTween.to({}, { duration: 0.3 }); // Buffer at start
      
      // Animate right column
      pinTween.to(right, {
        y: -scrollNeeded,
        ease: "power3.inOut",
        duration: 1,
      }, 0.3);

      pinRef.current = pinTween.scrollTrigger;
    };

    const setupIntro = () => {
      if (introTL) {
        try { introTL.kill(); } catch (e) {}
        introTL = null;
      }

      introTL = gsap.timeline({ 
        paused: true,
        onComplete: () => {
          // Re-enable scrubbing after intro completes
          if (scrollTriggerRef.current) {
            scrollTriggerRef.current.getTween().vars.scrub = 1.2;
          }
        }
      });
      
      // 0.8 second delay before anything happens
      introTL.to({}, { duration: 0.8 });
      
      // Then animate heading
      introTL.to(headingEl, { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        ease: "power2.out" 
      }, "+=0");
      
      // Background changes
      introTL.to(section, { 
        backgroundColor: "#fff", 
        duration: 0.6, 
        ease: "power2.out" 
      }, "+=0");
      
      introTL.to(headingEl, { 
        color: "#000", 
        duration: 0.4, 
        ease: "power1.out" 
      }, "<");
      
      // Right content appears
      introTL.to(right, { 
        opacity: 1, 
        y: 0, 
        pointerEvents: "auto", 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.15");
    };

    // Initial setup
    setupPin();
    setupIntro();

    // Intro trigger
    introTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        introTL.restart(true);
      },
      onEnterBack: () => {
        introTL.restart(true);
      },
      onLeave: () => {
        try { introTL.pause(0); } catch (e) {}
        gsap.set(section, { backgroundColor: "#000" });
        gsap.set(headingEl, { opacity: 0, y: 20, color: "#fff" });
        gsap.set(right, { opacity: 0, y: 20, pointerEvents: "none" });
      },
      onLeaveBack: () => {
        try { introTL.pause(0); } catch (e) {}
        gsap.set(section, { backgroundColor: "#000" });
        gsap.set(headingEl, { opacity: 0, y: 20, color: "#fff" });
        gsap.set(right, { opacity: 0, y: 20, pointerEvents: "none" });
      },
      invalidateOnRefresh: true,
    });

    const handleResize = () => {
      try { section.style.minHeight = ""; } catch (e) {}
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        setupPin();
        setupIntro();
      });
    };
    window.addEventListener("resize", handleResize);

    const t = setTimeout(() => ScrollTrigger.refresh(), 160);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(t);

      try { introTrigger && introTrigger.kill(); } catch (e) {}
      try { pinRef.current && pinRef.current.kill(); } catch (e) {}
      try { pinTween && pinTween.kill(); } catch (e) {}
      try { introTL && introTL.kill(); } catch (e) {}

      try { section.style.minHeight = ""; } catch (e) {}
      gsap.killTweensOf([section, headingEl, right, left]);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24">
      <div className="pin-wrapper max-w-8xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
        <div ref={leftRef} className="pt-8 md:pt-0">
          <h2 className="text-8xl md:text-[7rem] ml-10 mt-25 font-semibold leading-32 tracking-normal" style={{ fontFamily: "Inter Tight, sans-serif" }}>
            Why client
            <br />
            choose us
          </h2>
        </div>

        <div style={{ fontFamily: "Inter Tight, sans-serif" }} ref={rightRef} className="space-y-12">
          <div className="w-full bg-white rounded-xl p-8 shadow-sm">
            <div className="text-6xl font-bold">92%</div>
            <p className="mt-4 text-2xl text-black">Client satisfaction rate, fostering long-term relationships.</p>
          </div>

          <div className="w-full bg-white rounded-xl p-8 shadow-sm">
            <div className="text-6xl font-bold">100+</div>
            <p className="mt-4 text-xl text-black">Active users experiencing our design every day.</p>
          </div>

          <div className="w-full bg-white rounded-xl p-8 shadow-sm">
            <div className="text-6xl font-bold">30K</div>
            <p className="mt-4 text-xl text-black">Delivered projects with exceptional attention to detail.</p>
          </div>

          <div className="w-full bg-white rounded-xl p-8 shadow-sm">
            <div className="text-6xl font-bold">50+</div>
            <p className="mt-4 text-xl text-black">Years of combined team experience.</p>
          </div>

          <div className="w-full bg-black rounded-xl p-8 shadow-sm">
            <p className="mt-4 text-5xl text-white">We deliver creative solutions that make an impact.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeWhyChoose;