import React, { useRef, useEffect, useState } from "react";

const AboutQualities = () => {
  const statsRef = useRef(null);
  const [hasRun, setHasRun] = useState(false);
  const [years, setYears] = useState(0);
  const [projects, setProjects] = useState(0);
  const [awards, setAwards] = useState(0);

  // simple counting helper
  const animateNumber = (to, setter, duration = 1200) => {
    const start = 0;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(start + (to - start) * progress);
      setter(value);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun) {
            setHasRun(true);
            animateNumber(10, setYears);
            animateNumber(75, setProjects);
            animateNumber(25, setAwards);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasRun]);

  return (
    <section className="w-full bg-white text-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Top: heading + intro */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6 flex items-start">
            <h1
              className="text-[6.5rem] md:text-[6.5rem] leading-none font-medium tracking-tight"
              style={{ fontFamily: "Inter Tight, sans-serif" }}
            >
              ABOUT
              <br />
              US
            </h1>
          </div>

          <div className="md:col-span-6 flex flex-col justify-center md:pl-12">
            <div className="max-w-lg">
              <p className="text-base md:text-xl font-medium text-black mb-8 leading-relaxed"
              style={{ fontFamily: "Inter Tight, sans-serif" }}>
                Founded by a passionate team of designers, strategists, and
                innovators, we’ve grown into a powerhouse that transforms ideas
                into impactful experiences. With every project, we aim to tell
                stories that connect, design solutions that inspire, and build
                partnerships that last.
              </p>

              <div className="mt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-4 bg-black px-6 py-3 rounded shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#d59bff]"
                  aria-label="Get in touch"
                >
                  <span className="text-white font-semibold tracking-wide text-lg">
                    GET IN TOUCH
                  </span>
                  <span className="inline-flex items-center justify-center w-9 h-9 bg-white text-black rounded-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="mt-20 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Stat 1 */}
            <div className="flex items-center justify-center">
              <div className="pr-8 md:pr-12 border-r border-gray-200 mr-8">
                <div className="flex items-end gap-3">
                  <div className="text-4xl md:text-5xl text-neutral-500 font-extrabold">
                    +
                  </div>
                  <div className="text-[4.5rem] md:text-[6rem] font-bold leading-none">
                    {years}
                  </div>
                </div>
                <div className="mt-6 text-sm md:text-base text-neutral-600 uppercase tracking-widest">
                  Years of Experience
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center justify-center">
              <div className="pr-8 md:pr-12 border-r border-gray-200 mr-8">
                <div className="flex items-end gap-3">
                  <div className="text-4xl md:text-5xl text-neutral-500 font-extrabold">
                    +
                  </div>
                  <div className="text-[4.5rem] md:text-[6rem] font-bold leading-none">
                    {projects}
                  </div>
                </div>
                <div className="mt-6 text-sm md:text-base text-neutral-600 uppercase tracking-widest">
                  Successful Projects
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center justify-center">
              <div className="pr-8 md:pr-12 mr-8">
                <div className="flex items-end gap-3">
                  <div className="text-4xl md:text-5xl text-neutral-500 font-extrabold">
                    +
                  </div>
                  <div className="text-[4.5rem] md:text-[6rem] font-bold leading-none">
                    {awards}
                  </div>
                </div>
                <div className="mt-6 text-sm md:text-base text-neutral-600 uppercase tracking-widest">
                  Awards Won
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutQualities;
