import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Sample = () => {
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const imageRef = useRef(null);

  const contents = [
    {
      title: "CLUB PR",
      description:
        "Your strategic partner in building powerful brand narratives. We craft stories that resonate and drive meaningful engagement.",
    },
    {
      title: "We Grow Ideas",
      description:
        "From concept to execution, we nurture your vision into reality. Innovation meets strategy in everything we create.",
    },
    {
      title: "Stories That Stick",
      description:
        "Memorable campaigns that capture attention and inspire action. We create content that leaves a lasting impression.",
    },
    {
      title: "Visibility With Intent",
      description:
        "Strategic positioning that puts your brand where it matters most. Every move is calculated for maximum impact.",
    },
    {
      title: "Let's Connect",
      description:
        "Ready to elevate your brand? Let's collaborate and create something extraordinary together.",
    },
  ];

  useGSAP(() => {
    // Set initial state - make first slide and image visible
    if (itemsRef.current[0]) {
      const firstLetters = itemsRef.current[0].querySelectorAll(".letter");
      const firstLines = itemsRef.current[0].querySelectorAll(".line");

      gsap.set(firstLetters, { opacity: 1, filter: "blur(0px)" });
      gsap.set(firstLines, {
        opacity: 1,
        filter: "blur(0px)",
        rotateX: 0,
        rotateZ: 0,
        translateY: 0,
      });
    }

    if (imageRef.current) {
      gsap.set(imageRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: sectionRef.current,
      },
    });

    contents.forEach((_, index) => {
      const current = itemsRef.current[index];
      const prev = itemsRef.current[index - 1];

      const currentLetters = current?.querySelectorAll(".letter");
      const prevLetters = prev?.querySelectorAll(".letter");

      const currentLines = current?.querySelectorAll(".line");
      const prevLines = prev?.querySelectorAll(".line");

      // fade OUT previous lines
      if (prevLines && prevLines.length > 0) {
        tl.to(prevLines, {
          opacity: 0,
          filter: "blur(8px)",
          rotateX: 75,
          rotateZ: 8,
          translateY: 30,
          duration: 0.25,
          stagger: 0.08,
          ease: "power2.in",
        });
      }

      // fade OUT previous letters
      if (prevLetters && prevLetters.length > 0) {
        tl.to(
          prevLetters,
          {
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.25,
            stagger: 0.02,
            ease: "power2.in",
          },
          "-=0.15"
        );
      }

      // fade OUT image before going to next slide (except first)
      if (index > 0 && imageRef.current) {
        tl.to(
          imageRef.current,
          {
            opacity: 0,
            filter: "blur(8px)",
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
            immediateRender: true,
          },
          "-=0.15"
        );
      }

      // fade IN current letters
      if (currentLetters && currentLetters.length > 0) {
        tl.to(
          currentLetters,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.35,
            stagger: 0.03,
            ease: "power2.out",
          },
          "-=0.05"
        );
      }

      // fade IN current lines
      if (currentLines && currentLines.length > 0) {
        tl.to(
          currentLines,
          {
            opacity: 1,
            filter: "blur(0px)",
            rotateX: 0,
            rotateZ: 0,
            translateY: 0,
            duration: 0.3,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.15"
        );
      }

      // fade IN image AFTER text is visible
      if (imageRef.current) {
        tl.to(
          imageRef.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            immediateRender: false,
          },
          "-=0.1"
        );
      }
    });
  });

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: "400vh" }}>
      <section
        ref={sectionRef}
        className="sticky top-0 w-full h-[70vh] flex items-center justify-center bg-[#020617]"
      >
        <div className="relative flex flex-col items-center justify-center gap-8">
          {/* Slides */}
          {contents.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="absolute flex flex-col items-center justify-center max-w-4xl"
            >
              <h1 className="text-4xl md:text-7xl font-bold tracking-[0.25em] text-white text-center px-4 mb-6">
                <span className="inline-flex">
                  {item.title.split("").map((char, i) => (
                    <span
                      key={i}
                      className="inline-block letter"
                      style={{ opacity: 0, filter: "blur(4px)" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              </h1>
              <p
                className="text-lg md:text-xl text-gray-300 text-center px-8 leading-relaxed"
                style={{ perspective: "1000px" }}
              >
                {item.description.split(". ").map((line, i) => (
                  <span
                    key={i}
                    className="block line"
                    style={{
                      opacity: 0.3,
                      filter: "blur(4px)",
                      transform:
                        "rotateX(75deg) rotateZ(8deg) translateY(30px)",
                      transformOrigin: "center bottom",
                    }}
                  >
                    {line}
                    {i < item.description.split(". ").length - 1 ? "." : ""}
                  </span>
                ))}
              </p>
            </div>
          ))}

          {/* Rocket image */}
          <img
            ref={imageRef}
            src="https://i.pinimg.com/736x/05/d3/b6/05d3b671e1e75baf56202c3ab889b30f.jpg"
            alt="Market rocket"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-auto object-contain pointer-events-none"
            style={{
              opacity: 0,
              filter: "blur(8px)",
              transform: "scale(0.8)",
              willChange: "opacity, filter, transform",
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default Sample;