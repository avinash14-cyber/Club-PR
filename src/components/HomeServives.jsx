import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeServices = () => {
  const sectionRef = useRef(null);
  const leftMaskRef = useRef(null);
  const rightMaskRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);
  const tlRef = useRef(null);

  // header / spacer refs
  const floatingHeaderRef = useRef(null);
  const headerSpacerRef = useRef(null);

  // store triggers so we can kill them on cleanup
  const revealTriggerRef = useRef(null);
  const progressTriggerRef = useRef(null);
  const stickTriggerRef = useRef(null);
  const fadeTriggerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftMask = leftMaskRef.current;
    const rightMask = rightMaskRef.current;
    const leftImg = leftImgRef.current;
    const rightImg = rightImgRef.current;
    const floatingHeader = floatingHeaderRef.current;
    const headerSpacer = headerSpacerRef.current;

    if (!section || !leftMask || !rightMask || !leftImg || !rightImg || !floatingHeader) {
      return;
    }

    // --------------------------
    // Image reveal timeline (unchanged behavior)
    // --------------------------
    gsap.set([leftMask, rightMask], { xPercent: 0 });
    gsap.set([leftImg, rightImg], { scale: 1.03 });

    const tl = gsap.timeline({ paused: true });

    tl.to(leftMask, { xPercent: 100, duration: 0.9, ease: "power2.out" }, 0);
    tl.to(rightMask, { xPercent: -100, duration: 0.9, ease: "power2.out" }, 0);
    tl.to([leftImg, rightImg], { scale: 1, duration: 1.1, ease: "power3.out" }, 0);

    tlRef.current = tl;

    revealTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => tl.play(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
    });

    // --------------------------
    // Header initial state (inside section)
    // --------------------------
    // Place header absolutely inside section initially
    floatingHeader.style.position = "absolute";
    floatingHeader.style.top = "0";
    floatingHeader.style.left = "0";
    floatingHeader.style.right = "0";
    floatingHeader.style.zIndex = "30";

    // Start hidden and slightly lower; will fade in at 80%
    gsap.set(floatingHeader, { opacity: 0, y: 10, pointerEvents: "none" });

    // spacer initially zero height — will be set when header becomes fixed
    if (headerSpacer) headerSpacer.style.height = "0px";

    // --------------------------
    // Fade-in trigger at 80%
    // --------------------------
    fadeTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      onEnter: () => {
        gsap.killTweensOf(floatingHeader);
        gsap.to(floatingHeader, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          pointerEvents: "auto",
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf(floatingHeader);
        gsap.to(floatingHeader, {
          opacity: 0,
          y: 10,
          duration: 0.25,
          ease: "power2.in",
          pointerEvents: "none",
        });
      },
    });

    // --------------------------
    // Progress trigger: move header along with section from 80% -> top
    // --------------------------
    progressTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "top top",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress; // 0 -> 1
        // move header up as progress increases so it looks like it's traveling with the section
        const y = (1 - p) * 18; // tweak this value to change how much it moves
        gsap.set(floatingHeader, { y });
      },
    });

    // --------------------------
    // Stick trigger: when section top reaches viewport top, fix header
    // --------------------------
    stickTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      // keep active forward so header remains fixed until we scroll back above the section
      end: "+=99999",
      onEnter: () => {
        // set spacer height equal to header height to avoid layout jump
        const rect = floatingHeader.getBoundingClientRect();
        const headerHeight = Math.round(rect.height || 60);
        if (headerSpacer) headerSpacer.style.height = `${headerHeight}px`;

        // move header to fixed at top of viewport
        floatingHeader.style.position = "fixed";
        floatingHeader.style.top = "0";
        floatingHeader.style.left = "0";
        floatingHeader.style.right = "0";
        floatingHeader.style.zIndex = "60";

        floatingHeader.classList.add("header-stuck"); // optional class for styling

        // ensure final placement/visibility
        gsap.killTweensOf(floatingHeader);
        gsap.set(floatingHeader, { y: 0, opacity: 1, pointerEvents: "auto" });
      },
      onLeaveBack: () => {
        // restore header into section
        if (headerSpacer) headerSpacer.style.height = `0px`;
        floatingHeader.style.position = "absolute";
        floatingHeader.style.top = "0";
        floatingHeader.style.left = "0";
        floatingHeader.style.right = "0";
        floatingHeader.style.zIndex = "30";

        floatingHeader.classList.remove("header-stuck");

        gsap.killTweensOf(floatingHeader);
        // keep it visible but in-section; if you want fade-out here, change to hide
        gsap.to(floatingHeader, { y: 0, opacity: 1, duration: 0.15, ease: "power2.out" });
      },
    });

    // final refresh
    ScrollTrigger.refresh();

    // --------------------------
    // cleanup
    // --------------------------
    return () => {
      try {
        revealTriggerRef.current && revealTriggerRef.current.kill();
      } catch (e) {}
      try {
        fadeTriggerRef.current && fadeTriggerRef.current.kill();
      } catch (e) {}
      try {
        progressTriggerRef.current && progressTriggerRef.current.kill();
      } catch (e) {}
      try {
        stickTriggerRef.current && stickTriggerRef.current.kill();
      } catch (e) {}
      try {
        tl.kill();
      } catch (e) {}
      gsap.killTweensOf([leftMask, rightMask, leftImg, rightImg, floatingHeader]);
    };
  }, []);

  return (
    <>
      {/* Spacer used to avoid layout jump when header becomes fixed */}
      <div ref={headerSpacerRef} />

      <section ref={sectionRef} className="w-full mt-20 bg-white text-black py-5 relative">
        {/* Floating header initially INSIDE the section (absolute) */}
        <div ref={floatingHeaderRef} className="w-full" aria-hidden={false}>
          <div className="w-full mx-auto ">
            <div className="bg-black px-5 backdrop-blur-sm border-b border-black text-white py-3">
             <div className="flex items-center py-3 justify-between">
  {/* Left: Logo / Brand */}
  <div className="font-semibold text-xl tracking-tight">
    PR CLUB
  </div>

  {/* Right: Navigation */}
  <nav className="flex items-center gap-6 text-lg font-medium">
    <a
      href="/"
      className="hover:opacity-80 transition-opacity"
    >
      Home
    </a>
    <a
      href="/aboutus"
      className="hover:opacity-80 transition-opacity"
    >
      About Us
    </a>
    <a
      href="/ourservices"
      className="hover:opacity-80 transition-opacity"
    >
      Services
    </a>
    <a
      href="/contactus"
      className="hover:opacity-80 transition-opacity"
    >
      Contact Us
    </a>
  </nav>
</div>

            </div>
          </div>
        </div>

        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-10 pt-20">
          {/* ============ ROW 1 ============ */}
          {/* Left Image (masked) */}
          <div className="w-full h-[45vh] md:h-[50vh] overflow-hidden rounded-lg shadow-sm relative">
            <img
              ref={leftImgRef}
              src="https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg"
              className="w-full h-full object-cover block"
              alt="audience at a PR workshop"
            />
            {/* mask overlay (sits above image) */}
            <div
              ref={leftMaskRef}
              className="absolute inset-0 bg-gray-600/90 pointer-events-none"
              style={{ transform: "translateZ(0)" }}
            />
          </div>

          {/* Right Text */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">PR Strategy Workshop</h2>

            <p className="text-lg text-gray-700 max-w-xl">
              A hands-on half-day workshop where we teach brands how to shape narratives,
              craft media-friendly stories and build long-term visibility plans. Learn
              how to pitch press, create shareable content, and measure the impact of your campaigns.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-sm font-semibold">CL</div>
                <div className="text-sm text-gray-600">CodeLab</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-sm font-semibold">E2</div>
                <div className="text-sm text-gray-600">Earth2.0</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-sm font-semibold">HX</div>
                <div className="text-sm text-gray-600">HexLab</div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#register"
                className="inline-block bg-black text-white px-5 py-3 rounded-md text-sm font-medium hover:opacity-90"
              >
                Reserve your seat
              </a>
              <a
                href="#learn"
                className="ml-4 text-sm text-gray-600 underline"
              >
                Learn more
              </a>
            </div>
          </div>

          {/* ============ ROW 2 ============ */}
          {/* Left Text */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Opening Party & Early Registration</h2>

            <p className="text-lg text-gray-700 max-w-xl">
              Kick off the event with a networking evening — meet journalists,
              creatives and brand leaders in a casual setting. Early registrants
              get priority access to speaker roundtables and a special media kit.
            </p>

            <ul className="mt-2 text-gray-600 space-y-2">
              <li>• Networking with top-tier journalists</li>
              <li>• Media kit & press list for attendees</li>
              <li>• Priority access to workshops</li>
            </ul>

            <div className="pt-4">
              <a
                href="#tickets"
                className="inline-block bg-black text-white px-5 py-3 rounded-md text-sm font-semibold hover:opacity-90"
              >
                Buy early-bird ticket
              </a>
              <a
                href="#schedule"
                className="ml-4 text-sm text-gray-600 underline"
              >
                View schedule
              </a>
            </div>
          </div>

          {/* Right Image (masked) */}
          <div className="w-full h-[45vh] md:h-[50vh] overflow-hidden rounded-lg shadow-sm relative">
            <img
              ref={rightImgRef}
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg"
              className="w-full h-full object-cover block"
              alt="conference opening party"
            />
            {/* mask overlay */}
            <div
              ref={rightMaskRef}
              className="absolute inset-0 bg-gray-600/70 pointer-events-none"
              style={{ transform: "translateZ(0)" }}
            />
          </div>
        </div>
      </section>

      {/* Optional inline styles for stuck header visuals (you can move to global CSS) */}
      <style>{`
        .header-stuck {
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          backdrop-filter: blur(6px);
        }
      `}</style>
    </>
  );
};

export default HomeServices;
