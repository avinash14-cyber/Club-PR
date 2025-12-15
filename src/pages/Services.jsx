import React from 'react'
import ServicesTitle from '../components/ServicesTitle'
import AllServices from '../components/AllServices'
import SlidingText from '../components/SlidingText'
import ServiceWorks from '../components/ServiceWorks'
import img from '../assets/services/range_services.jpg'
import ServicesHorizontal from '../components/ServicesHorizontal'
import ServiceContact from '../components/ServiceContact'

const Services = () => {
  return (
    <div className='w-full bg-white'>
       
        {/* title section */}
        <ServicesTitle/>
        {/* Allservices */}
        <AllServices/>

        {/* Sliding texts */}
        <SlidingText/>

        {/* our works */}
        <ServiceWorks/>

        {/* range of services */}

        <section className="relative h-[80vh] w-[95vw] mt-10 mb-10 mx-auto bg-black text-white">
  {/* background image */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-60"
    style={{
       backgroundImage: `url(${img})`,
    }}
  />

  {/* dark overlay for better contrast */}
  <div className="absolute inset-0 bg-black/60" />

  {/* content */}
  <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col justify-center">
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
      We provide
      <br />
      different range
      <br />
      of services
    </h1>

    <p className="mt-8 max-w-3xl text-base md:text-lg text-white/80">
      Explore our comprehensive suite of services designed to meet your unique
      needs and exceed your expectations. Our expert team is dedicated to
      delivering top‑quality solutions for every project.
    </p>
  </div>
</section>

{/* horizontal scroll for services */}
<ServicesHorizontal/>

{/* contactus */}
<ServiceContact/>
    </div>
  )
}

export default Services