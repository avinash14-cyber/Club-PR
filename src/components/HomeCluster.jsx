import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  {
    src: "https://i.pinimg.com/1200x/b1/26/58/b12658fbf08087979ba1f9ab0b02f4be.jpg",
    title: "Storyline Campaign",
    subtitle:
      "Multi-channel storytelling that elevates brand voice, engages audiences, and drives consistent press coverage.",
  },
  {
    src: "https://i.pinimg.com/1200x/e4/e3/c5/e4e3c5cfba2c21eed8e551d5cb12a8a0.jpg",
    title: "Impact Launch",
    subtitle:
      "Launch strategies combining press outreach, influencer partnerships, and content-led storytelling to generate maximum buzz.",
  },
  {
    src: "https://i.pinimg.com/736x/35/90/d2/3590d224cdeb3137603ea7e18dbc2398.jpg",
    title: "Narrative Shift",
    subtitle:
      "Positioning work that reshapes brand perception, builds trust, and secures premium media placements.",
  },
  {
    src: "https://i.pinimg.com/736x/c3/4a/78/c34a7864260389f2a0095c172e57b97f.jpg",
    title: "Reputation Pulse",
    subtitle:
      "Ongoing reputation management and thought-leadership programs designed for long-term credibility and crisis readiness.",
  },
  {
    src: "https://i.pinimg.com/1200x/e6/92/15/e692151bfc86c7d523697aa0dbd1a5d0.jpg",
    title: "Media Architecture",
    subtitle:
      "Strategic media relations and bespoke press kits that connect brands with the right journalists and outlets.",
  },
];

const HomeCluster = () => {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const buttonRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const images = imageRefs.current.filter(Boolean);

    if (!section || !images.length) return;

    // Wait for previous section's ScrollTriggers to settle
    const setup = () => {
      // Kill any existing animations on this section
      if (tlRef.current) {
        tlRef.current.scrollTrigger?.kill();
        tlRef.current.kill();
        tlRef.current = null;
      }

      // Set initial states (centered stack)
      gsap.set(images, {
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        scale: 1,
      });

      gsap.set([headingRef.current, subRef.current, buttonRef.current], {
        opacity: 0,
        scale: 0.85,
      });

      const targets = [
        { x: -600, y: -200 },
        { x: 0, y: -220 },
        { x: 600, y: -200 },
        { x: -600, y: 200 },
        { x: 600, y: 200 },
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      // Images spread outward
      images.forEach((img, i) => {
        const t = targets[i] || { x: 0, y: 0 };
        tl.to(
          img,
          {
            x: t.x,
            y: t.y,
            scale: 1,
            ease: "power2.out",
            duration: 1.2,
          },
          0
        );
      });

      // Text fades in
      tl.to(
        [headingRef.current, subRef.current, buttonRef.current],
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          ease: "power2.out",
          duration: 0.8,
        },
        0.25
      );

      tlRef.current = tl;
    };

    // Delay setup to ensure previous section is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      setup();
    }, 100);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);

      if (tlRef.current) {
        tlRef.current.scrollTrigger?.kill();
        tlRef.current.kill();
        tlRef.current = null;
      }

      gsap.killTweensOf([
        ...images,
        headingRef.current,
        subRef.current,
        buttonRef.current,
      ]);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen bg-white text-black flex items-center justify-center relative overflow-hidden"
      style={{ marginTop: 0 }}
    >
      {/* Center Text */}
      <div className="relative z-20 mt-60 flex flex-col items-center text-center px-4">
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl ml-2 font-semibold tracking-[0.12em] leading-tight"
          style={{ fontFamily: "Inter Tight, sans-serif" }}
        >
          LET&apos;S BUILD
          <br />
          SOMETHING AMAZING
        </h2>

        <p
          ref={subRef}
          className="mt-4 max-w-xl text-sm md:text-2xl font-medium text-black"
          style={{ fontFamily: "Inter Tight, sans-serif" }}
        >
          We craft stories that influence perception and build lasting brand trust.
          <br />
          From strategy to visibility, we make your voice impossible to ignore.
        </p>

        <button
          ref={buttonRef}
          className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-full bg-black text-white font-bold text-sm md:text-base hover:bg-gray-800 transition-colors"
        >
          GET IN TOUCH
          <span className="ml-2 text-lg">↑</span>
        </button>
      </div>

      {/* Floating Images (interactive cards) */}
      <div className="absolute inset-0">
        {IMAGES.map((item, index) => (
          <div
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            className="group absolute w-40 h-[190px] md:w-[200px] md:h-[230px] lg:w-[230px] lg:h-[260px] shadow-xl shadow-black/50 rounded-sm overflow-hidden cursor-pointer"
            role="button"
            aria-label={`${item.title} — ${item.subtitle}`}
            tabIndex={0}
            style={{ transform: "translate(-50%, -50%)", left: "50%", top: "50%" }}
          >
            <img
              src={item.src}
              className="w-full h-full object-cover block"
              alt={item.title}
              loading="lazy"
            />

            {/* Black sliding mask — now with text-white and reliable Tailwind transitions */}
           {/* Black sliding mask */}
<div
  className="
    absolute inset-0 bg-black/90 flex items-center justify-center overflow-hidden
    -translate-y-full group-hover:translate-y-0
    transition-transform duration-750 ease-[cubic-bezier(0.16,1,0.3,1)]
  "
>
  {/* Text appears ONLY after mask finishes sliding */}
  <div
    className="
      opacity-0 translate-y-3
      group-hover:opacity-100 group-hover:translate-y-0
      transition-all duration-500 ease-out
    "
    style={{ transitionDelay: "0.75s" }}   // mask slides ~750ms → text appears right after
  >
    <h3 style={{ fontFamily: "Inter Tight, sans-serif" }} className="font-semibold text-center text-sm md:text-base lg:text-xl leading-tight text-white">
      {item.title}
    </h3>
    <p style={{ fontFamily: "Inter Tight, sans-serif" }} className="mt-2 text-center text-[11px] md:text-sm lg:text-md opacity-90 max-w-48 text-white">
      {item.subtitle}
    </p>
  </div>
</div>


            {/* bottom subtle gradient */}
            <div className="absolute left-0 right-0 bottom-0 h-6 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeCluster;
