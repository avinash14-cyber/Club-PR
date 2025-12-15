import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-20">
        {/* Heading */}
        <div className="text-center pb-4">
          <h2
            className="text-4xl md:text-6xl lg:text-[4.5rem] mt-15 font-semibold tracking-[0.15em] uppercase"
             style={{ fontFamily: "Inter Tight, sans-serif" }}
          >
            Our Values
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-neutral-700 text-sm md:text-base">
            At the core of our digital agency are four guiding principles that
            shape everything we do.
          </p>
        </div>
      </div>

      {/* Cards container - minimal height before cards, then stacking section */}
      <div ref={containerRef} style={{ height: `${30 + CARDS.length * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-7xl w-full px-6 md:px-10 relative">
            {CARDS.map((card, index) => {
              const total = CARDS.length;

              // adjusted progress mapping (keeps buffer at top)
              const adjustedProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

              const cardProgress = 1 / total;
              const start = (30 / (30 + total * 100)) + (index * cardProgress * (total * 100) / (30 + total * 100));
              const end = (30 / (30 + total * 100)) + ((index + 1) * cardProgress * (total * 100) / (30 + total * 100));

              const y = useTransform(adjustedProgress, [start, end], ["150%", "0%"]);

              const imageOnLeft = index % 2 === 0;

              return (
                <motion.article
                  key={card.id}
                  style={{
                    y,
                    zIndex: index + 1,
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden"
                  initial={{ y: "150%" }}
                >
                  {/* Make the grid full height, and force each cell to fill the height */}
                  <div className="grid grid-cols-1 md:grid-cols-2 w-full h-[55vh] md:h-[70vh]">
                    {/* TEXT CELL - full height and centered */}
                    <div
                      className={
                        "flex items-center justify-center px-8 md:px-12 h-full " +
                        (imageOnLeft ? "order-2" : "order-1")
                      }
                    >
                      {/* This wrapper fills the cell and centers content both vertically & horizontally */}
                      <div className="w-full max-w-lg text-center h-full flex flex-col justify-center items-center px-2">
                        <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-neutral-400 font-light">
                          {card.id}
                        </span>

                        <h3
                          className="text-3xl md:text-5xl lg:text-6xl font-bold mt-4"
                          style={{ fontFamily: "Impact, sans-serif" }}
                        >
                          {card.title}
                        </h3>

                        <p className="mt-4 md:mt-6 text-neutral-600 text-base md:text-lg leading-relaxed">
                          {card.copy}
                        </p>
                      </div>
                    </div>

                    {/* IMAGE CELL - full height so the layout doesn't collapse */}
                    <div
                      className={
                        "h-full w-full " + (imageOnLeft ? "order-1" : "order-2")
                      }
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
