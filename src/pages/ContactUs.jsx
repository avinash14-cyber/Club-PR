import { faEnvelope, faPhone, faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img from '../assets/contactus/contactus_PR.jpg'
import React from 'react'
import { socials } from '../constants/Constants'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
const ContactUs = () => {
     const introRef = useRef(null);
     const iconsRef = useRef(null);
     const socialsRef = useRef(null);

 useGSAP(
  () => {
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });

    tl.from(introRef.current, {
      y: 40,
      opacity: 0,
    })
    .from(iconsRef.current, {
      y: 40,
      opacity: 0,
    }, "-=0.3"); 
  },
  { scope: introRef } // just needs any parent for cleanup
);
useGSAP(
    () => {
      if (!socialsRef.current) return;

      gsap.from(socialsRef.current.querySelectorAll(".social-item"), {
        y: 40,
        opacity: 0,
        stagger:0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: socialsRef.current,
          start: "top 80%", 
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: socialsRef }
  );

  return (
    <div className='w-full '>
        <section className="w-full bg-white ">

            
 <div className="w-full h-[50vh] overflow-hidden relative">
  <img 
    src={img} 
    alt="" 
    className="w-full h-full object-cover"
  />

  
  <div className="absolute inset-0 bg-white/20"></div>
</div>


            <div ref={introRef} className="mx-auto max-w-5xl px-6 text-center">
        {/* Gradient heading */}
        <h1
          className="
            text-5xl font-extrabold leading-tight sm:text-6xl md:text-9xl
           
            bg-clip-text text-black
          "
        >
          Contact us
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm font-medium text-black/80 sm:text-lg">
          Reach out to us using the contact information below or fill out the contact
          form, and we will get back to you as soon as possible.
        </p>
      </div>

        <div ref={iconsRef} className="mx-auto flex max-w-5xl mt-8 mb-10 flex-row flex-wrap gap-10 px-4">
        {/* Email */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
            {/* Replace with your icon (SVG / img) */}
            <span className="text-xl"><FontAwesomeIcon icon={faEnvelope} /></span>
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Send an Email</p>
            <p className="text-sm text-[#6E505B]">
              info@launchpoint-venues.com
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
            <span className="text-xl"><FontAwesomeIcon icon={faPhone} /></span>
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Just Call Us</p>
            <p className="text-sm text-[#6E505B]">
              (+353) 123-4567-890
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
            <span className="text-xl"><FontAwesomeIcon icon={faThumbtack} /></span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#3B162A]">Come Visit Us</p>
            <p className="text-sm text-[#6E505B]">
              15th Ave NW Seattle | Washington 98107
            </p>
          </div>
        </div>
      </div>



        {/* form */}
      <div className="mx-auto py-12  max-w-3xl px-4">
        <div className="rounded-3xl bg-black p-8 text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          <form className="space-y-6">
            {/* Full name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-[0.15em] text-white/70">
                FULLNAME*
              </label>
              <input
                type="text"
                placeholder="Write your Fullname"
                className="w-full rounded-md border border-white/10 bg-white px-4 py-3 text-sm text-white placeholder:text-gray-700 focus:border-[#F7B7D0] focus:outline-none focus:ring-1 focus:ring-[#F7B7D0]"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-[0.15em] text-white/70">
                EMAIL ADDRESS*
              </label>
              <input
                type="email"
                placeholder="Share your best email"
                className="w-full rounded-md border border-white/10 bg-white px-4 py-3 text-sm text-white placeholder:text-gray-700 focus:border-[#F7B7D0] focus:outline-none focus:ring-1 focus:ring-[#F7B7D0]"
              />
            </div>

            {/* Phone + Company */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-[0.15em] text-white/70">
                  PHONE NUMBER*
                </label>
                <input
                  type="tel"
                  placeholder="Where shall we call you?"
                  className="w-full rounded-md border border-white/10 bg-white px-4 py-3 text-sm text-white placeholder:text-gray-700 focus:border-[#F7B7D0] focus:outline-none focus:ring-1 focus:ring-[#F7B7D0]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-[0.15em] text-white/70">
                  COMPANY NAME
                </label>
                <input
                  type="text"
                  placeholder="Write your company name"
                  className="w-full rounded-md border border-white/10 bg-white px-4 py-3 text-sm text-white placeholder:text-gray-700 focus:border-[#F7B7D0] focus:outline-none focus:ring-1 focus:ring-[#F7B7D0]"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-[0.15em] text-white/70">
                MESSAGE*
              </label>
              <textarea
                rows={5}
                placeholder="Tell us how can we assist you"
                className="w-full resize-none rounded-md border border-white/10 bg-white px-4 py-3 text-sm text-white placeholder:text-gray-700 focus:border-[#F7B7D0] focus:outline-none focus:ring-1 focus:ring-[#F7B7D0]"
              />
            </div>

            {/* Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="rounded-md bg-white px-10 py-3 text-sm font-semibold tracking-[0.12em] text-black shadow-md transition hover:text-white hover:bg-gray-600"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>
      </div>


    {/* socials */}

    {/* <div ref={socialsRef} className="mx-auto mt-20 flex max-w-5xl flex-wrap items-center justify-between gap-6 px-4">
       <div  className="flex  w-full divide-x divide-[#E0D0C4]">
    {socials.map((item) => (
      <button
        key={item.id}
        className="flex social-item flex-1 flex-col items-center justify-center gap-2 py-3 first:pl-0 last:pr-0 px-4"
      >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2B122F] text-[13px] font-semibold text-[#FFF7EC]">
              <FontAwesomeIcon className='text-3xl' icon={item.icon} />
            </span>
            
      </button>
    ))}
  </div>
      </div> */}

    </section>
    </div>
  )
}

export default ContactUs





 