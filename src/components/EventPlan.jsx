import React, { useState } from 'react'
import {events} from '../constants/Constants'
import image1 from "../assets/constant_images/conference.jpg";
import image2 from "../assets/constant_images/events.jpg";
import image3 from "../assets/constant_images/planning.jpg";
import image4 from "../assets/constant_images/support.jpg";
const Images = [image1, image2, image3, image4];

const EventPlan = () => {
    const [hoverState, setHoverState] = useState({
    index: null,
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x inside li
    const y = e.clientY - rect.top;  // y inside li

    setHoverState({ index, x, y });
  };
  return (
    <>
    <section className="w-full bg-[#F3F1EE] py-16">
        <h1 className='text-6xl font-semibold text-center mb-10'>Event Planning</h1>
      <div className="mx-auto max-w-5xl px-6">
        <ul className="divide-y divide-[#5B3148]/30">
          {events.map((label, index) => (
           <li
  key={label}
  className="
    group
    relative flex items-baseline gap-10 py-5
     px-4
    transition-colors duration-300
    hover:bg-[#3B162A]
  "
//   onMouseEnter={() => setHoverState((prev) => ({ ...prev, index }))}
//   onMouseMove={(e) => handleMouseMove(e, index)}
//   onMouseLeave={() => setHoverState({ index: null, x: 0, y: 0 })}
>
  <span className="
    text-xs font-semibold tracking-[0.25em]
    text-[#5B3148]/70
    transition-colors duration-200
    group-hover:text-white/70
  ">
    {String(index + 1).padStart(2, "0")}.
  </span>

  <h3
    className="
      text-3xl font-semibold leading-tight sm:text-4xl md:text-4xl
      text-[#3B162A]
      transition-colors duration-200
      group-hover:text-white
    "
  >
    {label}
  </h3>

  {hoverState.index === index && (
    <img
      src={Images[index]}
      alt=""
      className="
        pointer-events-none
        absolute h-32 w-42 rounded-xl object-cover shadow-xl
        transition-transform duration-75
      "
      style={{
        left: hoverState.x,
        top: hoverState.y,
        transform: "translate(-50%, -50%)",
      }}
    />
  )}
</li>

          ))}
        </ul>
      </div>
      <div className="flex max-w-5xl justify-center mt-8 gap-4">
  {/* Primary button */}
  <button
    className="
      rounded-xl bg-[#2B122F] px-10 py-4
      text-sm font-semibold tracking-[0.12em] text-[#FFF7EC]
      shadow-sm
      transition-all duration-200
      hover:bg-[#3a183e] hover:-translate-y-0.5 hover:shadow-md
      active:translate-y-0 active:shadow-sm
    "
  >
    BOOK A TOUR
  </button>

  {/* Secondary outline button */}
  <button
    className="
      rounded-xl border border-[#2B122F] bg-transparent
      px-10 py-4 text-sm font-semibold tracking-[0.12em] text-[#2B122F]
      transition-all duration-200
      hover:bg-[#2B122F] hover:text-[#FFF7EC]
      active:translate-y-0.5
    "
  >
    SEE OUR PACKAGES
  </button>
</div>

    </section>

    
    </>
  )
}

export default EventPlan