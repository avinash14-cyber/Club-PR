// ScrollStackFM.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// your images
import img1 from "../assets/scrollstack_imgs/card1.jpg";
import img2 from "../assets/scrollstack_imgs/card2.jpg";
import img3 from "../assets/scrollstack_imgs/card3.jpg";
import img4 from "../assets/scrollstack_imgs/card4.jpg";

const events = [
  {
    id: 1,
    image: img1,
    name: "Tomas Roa",
    position: "Head of Company",
    title: "I had an idea which I believed. Others came after years of hard work.",
    description: "Seamlessly generate plug-and-play benefits with turnkey results. Distinctively leverage off-the-shelf quality materials via standardized compatible models. Monotonically engineer focused niches and strategically empower quality markets. Authoritatively insist humanized e-commerce rather than orthogonal leadership skill. Collaboratively integrate visionary schemas for open-source products. Professionally impact cooperative benefits rather than standardized compliant results. Distinctively foster granular initiatives through magnetic engaged edges. Enthusiastically conduct e-commerce and deliver quality markets.",
    website: "www.tomasroaaddress.com",
    logo: "R", // placeholder for logo
  },
  {
    id: 2,
    image: img2,
    name: "Jane Smith",
    position: "CEO",
    title: "Vision and execution are the keys to success.",
    description: "Seamlessly generate plug-and-play benefits with turnkey results.",
    website: "www.company.com",
    logo: "J",
  },
  {
    id: 3,
    image: img3,
    name: "John Doe",
    position: "Founder",
    title: "Innovation drives our company forward.",
    description: "Seamlessly generate plug-and-play benefits with turnkey results.",
    website: "www.company.com",
    logo: "D",
  },
  {
    id: 4,
    image: img4,
    name: "Sarah Johnson",
    position: "Director",
    title: "Leadership is about inspiring others.",
    description: "Seamlessly generate plug-and-play benefits with turnkey results.",
    website: "www.company.com",
    logo: "S",
  },
];

const ScrollStackCard = ({ event, index, total }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const depth = total - index - 1;
  const targetScale = 1 - depth * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="sticky top-[10vh] h-[85vh] w-full overflow-hidden bg-white shadow-2xl"
    >
      <div className="flex h-full">
        {/* Left: Circular Image */}
        <div className="w-2/5 flex items-center justify-center bg-linear-to-br from-gray-600 to-gray-800 p-12">
          <div className="relative w-72 h-72 rounded-full overflow-hidden border-8 border-white/20 shadow-2xl">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-3/5 flex flex-col justify-between p-16 bg-white">
          {/* Top Section */}
          <div>
            {/* Logo & Name Section */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-sm font-light text-gray-600 mb-3">
                  {event.name}
                </p>
                <p className="text-xs text-gray-500 tracking-wider">
                  {event.position}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                <span className="text-lg font-semibold text-gray-600">
                  {event.logo}
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-5xl font-bold text-black leading-tight mb-8">
              {event.title}
            </h2>

            {/* Label */}
            <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-4 font-medium">
              Productively Aggregate
            </p>

            {/* Description */}
            <p className="text-sm text-gray-700 leading-relaxed font-light">
              {event.description}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <a
              href={`https://${event.website}`}
              className="text-xs text-gray-600 hover:text-black transition font-light"
            >
              {event.website}
            </a>

            {/* Social Icons */}
            <div className="flex gap-4">
              <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-xs font-medium">
                f
              </button>
              <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-xs font-medium">
                𝕏
              </button>
              <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-xs font-medium">
                in
              </button>
              <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-xs font-medium">
                ▶
              </button>
              <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-xs font-medium">
                ⬗
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ScrollStackSection() {
  return (
    <section className="w-full bg-[#F3F1EE] py-24">
      <div className="max-w-full mx-auto">
        {/* Heading */}
        <div className="px-8 md:px-12 mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 font-medium">
            testimonials
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
            What our leaders say
          </h1>
        </div>

        {/* ScrollStack */}
        <div className="relative space-y-0 pb-[30vh] px-8 md:px-12">
          {events.map((event, idx) => (
            <ScrollStackCard
              key={event.id}
              event={event}
              index={idx}
              total={events.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
