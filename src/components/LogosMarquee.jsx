import React from 'react'
import Marquee from "react-fast-marquee";
import {logos} from '../constants/Constants'
const LogosMarquee = () => {
  return (
    <div className="border-t mb-8 border-white/10 bg-black/40 py-4">
    <Marquee gradient={false} speed={40} pauseOnHover>
     {logos.map(item=>{
        return <span className="mx-10 text-sm font-semibold text-neutral-200">{item}</span>
     })}
     
    </Marquee>
  </div>
  )
}

export default LogosMarquee;