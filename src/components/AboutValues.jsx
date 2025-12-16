import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: "01",
    title: "INNOVATION",
    copy: "We embrace creativity and forward-thinking to deliver groundbreaking solutions tailored to your unique needs.",
    image: "https://images.pexels.com/photos/1030896/pexels-photo-1030896.jpeg",
  },
  {
    id: "02",
    title: "COLLABORATION",
    copy: "Great results come from teamwork. We partner with clients to turn shared ideas into extraordinary outcomes.",
    image: "https://images.pexels.com/photos/1707823/pexels-photo-1707823.jpeg",
  },
  {
    id: "03",
    title: "CLARITY",
    copy: "Transparent processes and clear communication keep every project moving with confidence and focus.",
    image: "https://images.pexels.com/photos/2892258/pexels-photo-2892258.jpeg",
  },
  {
    id: "04",
    title: "IMPACT",
    copy: "We design experiences that connect with people and create measurable, lasting impact for your brand.",
    image: "https://images.pexels.com/photos/3568540/pexels-photo-3568540.jpeg",
  },
];

const AboutValues = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: "120%", opacity: 0, scale: 0.95 },
        {
          y: "0%",
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: () => `top+=${window.innerHeight * index} top`,
            end: () => `top+=${window.innerHeight * (index + 1)} top`,
            scrub: true,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white"
      style={{ height: `${(CARDS.length + 1) * 100}vh` }}
    >
      {/* STICKY WRAPPER */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* HEADING */}
        <div className="absolute inset-0 mb-25 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <h2
            className="text-4xl md:text-6xl lg:text-[4.5rem] font-semibold tracking-[0.15em] uppercase"
            style={{ fontFamily: "Inter Tight, sans-serif" }}
          >
            Our Values
          </h2>
          <p className="mt-4 max-w-xl text-neutral-700 text-sm md:text-base">
            At the core of our digital agency are four guiding principles that
            shape everything we do.
          </p>
        </div>

        {/* CARDS */}
        <div className="relative w-full mb-15 max-w-7xl px-6 md:px-10">
          {CARDS.map((card, index) => {
            const imageOnLeft = index % 2 === 0;

            return (
              <article
                key={card.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[65vh] md:h-[70vh] bg-white shadow-2xl rounded-3xl overflow-hidden"
                style={{ zIndex: index + 1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* TEXT CELL */}
                  <div
                    className={`${
                      imageOnLeft ? "order-2" : "order-1"
                    } flex items-center justify-center px-8 md:px-12`}
                  >
                    <div className="text-center max-w-md w-full">
                      <span className="block text-xs md:text-sm tracking-[0.3em] uppercase text-neutral-400 font-light">
                        {card.id}
                      </span>

                      <h3
                        className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold"
                        style={{ fontFamily: "Impact, sans-serif" }}
                      >
                        {card.title}
                      </h3>

                      <p className=" text-neutral-600 text-base md:text-lg leading-relaxed">
                        {card.copy}
                      </p>
                    </div>
                  </div>

                  {/* IMAGE CELL */}
                  <div className={`${imageOnLeft ? "order-1" : "order-2"} h-full`}>
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;