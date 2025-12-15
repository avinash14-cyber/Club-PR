import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


import Cards from "../components/Cards";
import EventPlan from "../components/EventPlan";


import { useNavigate } from "react-router-dom";

import HeroSection from "../components/HeroSection";

import HomeServices from "../components/HomeServives";
import HomeWhat from "../components/HomeWhat";
import HomeImageFlip from "../components/HomeImageFlip";
import HomeCluster from "../components/HomeCluster";
import HomeWhyCHoose from "../components/HomeWhyChoose";


gsap.registerPlugin(ScrollTrigger, useGSAP);


const Home = () => {

    

    const navigate=useNavigate()
    const heroHeadingRef=useRef(null)
    const trackRef=useRef(null)
    const sectionRef = useRef(null);
    const worksectionRef = useRef(null);
  //        useGSAP(
  //   () => {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: "top 90%",         
  //         toggleActions: "play none none play", 
  //       },
  //     });

     
  //     tl.from(".why-left", {
  //       x: -80,
  //       opacity: 0,
  //       duration: 0.8,
  //       ease: "power3.out",
  //     });

      
      

  //     tl.from(
  //       ".why-right-item",
  //       {
  //         y: 20,
  //         opacity: 0,
  //         duration: 0.5,
  //         stagger: 0.15,
  //         ease: "power3.out",
  //       },
        
  //     );
  //   },
  //   { scope: sectionRef }
  // );


  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth - track.clientWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: worksectionRef.current,
          start: "center center",
         end: `+=${totalWidth}`, 
          scrub: 1,
          pin: true,
        },
      });
    },
    { scope: worksectionRef }
  );
useGSAP(() => {
    
    const heading = heroHeadingRef.current;
    if (!heading) return;

    const words = heading.textContent.split(" ");
    heading.innerHTML = words
      .map((word) => `<span class="inline-block">${word}</span>`)
      .join(" ");

    gsap.from("h1 span", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.18,
      ease: "power3.out",
    });
  });
  return (
   <div className=''>

    {/* hero */}

<HeroSection/>

   
{/* horizontal scrolling banner */}
{/* <HomeHorizontal/> */}


{/* flying cards */}

<HomeServices />


{/* What we do */}
<HomeWhat/>


{/* services */}

<Cards/>
 {/* work process */}
   
<HomeImageFlip/>

 <HomeWhyCHoose/>

<HomeCluster/>

  
  

   

    


    {/* Event planning */}
    {/* <EventPlan/> */}

    {/* Stacking cards */}
    
    {/* <ScrollStack/> */}

   
   </div>
  )
}

export default Home



