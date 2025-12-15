import React from "react";
import { socials } from '../constants/Constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Top area: quote + links */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] items-start">
          {/* Left: big quote + email subscribe */}
          <div>
            <p className="text-3xl font-extrabold leading-tight sm:text-4xl">
              WHERE EVERY
              <br />
              HEADLINE STARTS
              <br />
              <span className="text-[#FF4C7F]">WITH YOUR STORY</span>
            </p>

            {/* Email form */}
            <form className="mt-6 flex max-w-md overflow-hidden rounded-md bg-[#5A001A]">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-[#F6B9C4]/80 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white px-5 text-sm font-semibold text-[#7A0024] hover:bg-[#FBE4EB]"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs text-[#F6B9C4]">
              We will not flood your inbox, just sweet updates and offers.
            </p>
          </div>

          {/* Quick links */}
          <div className="text-sm space-y-2">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#F6B9C4]">
              QUICK LINKS
            </h4>
            <ul className="mt-2 space-y-1">
              <li className="text-lg">
                <a href="#home" className="hover:text-[#F6B9C4]">
                  Homepage
                </a>
              </li>
              <li className="text-lg">
                <a href="#about" className="hover:text-[#F6B9C4]">
                  About us
                </a>
              </li>
              <li className="text-lg">
                <a href="#menu" className="hover:text-[#F6B9C4]">
                  Our Menu
                </a>
              </li>
              <li className="text-lg">
                <a href="#offer" className="hover:text-[#F6B9C4]">
                  What we offer
                </a>
              </li>
              <li className="text-lg">
                <a href="#testimonials" className="hover:text-[#F6B9C4]">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Socials column */}
          <div className="text-sm space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#F6B9C4]">
              SOCIALS
            </h4>

            <div className="mt-2 flex flex-row gap-2">
             {socials.map((item) => (
      <button
        key={item.id}
        className="flex social-item flex-1 flex-col items-start ml-2 justify-center gap-0 py-3 first:pl-0 last:pr-0 px-0"
      >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2B122F] text-[13px] font-semibold text-[#FFF7EC]">
              <FontAwesomeIcon className='text-3xl' icon={item.icon} />
            </span>
            
      </button>
    ))}
            </div>
          </div>
        </div>

     
        

        {/* Divider */}
        <div className="mt-8 border-t border-[#9B1236]" />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-[#F6B9C4] md:flex-row">
          <div className="space-x-4">
            <a href="#privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white">
              Terms and Conditions
            </a>
            <a href="#cookies" className="hover:text-white">
              Cookie Policy
            </a>
          </div>

          <p className="text-center">
            Design by Your Studio © {new Date().getFullYear()}. All Rights
            Reserved.
          </p>

          {/* you can remove these if you don't want text links as well */}
          <div className="space-x-4">
            <a href="#facebook" className="hover:text-white">
              Facebook
            </a>
            <a href="#instagram" className="hover:text-white">
              Instagram
            </a>
            <a href="#pinterest" className="hover:text-white">
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
