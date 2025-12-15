import { faFacebookF,faInstagram,faXTwitter,faLinkedin  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from '../assets/services/pitch_event.jpg'
import img2 from '../assets/services/product_launch.jpg'
import img3 from '../assets/services/training_session.jpg'
import img4 from '../assets/services/presentation.jpg'
import img5 from '../assets/services/networking_event.jpg'
import img6 from '../assets/services/conference.jpg'
export const logos = [
  "Alt+Shift",
  "Eclipseful",
  "Euphoria",
  "45 Degrees°",
  "Ephemeral",
  "3Portals",
];


   export const steps = [
  {
    id: "01",
    title: "Planning",
    description:
      "Understand client needs and develop a detailed event plan. Initial meetings with clients, defining event goals, creating a proposal, and setting a timeline.",
  },
  
  {
    id: "03",
    title: "Preparation",
    description:
      "Designing branding and presentations, booking venues, and coordinating with vendors to ensure everything is ready.",
  }
  
];

export const steps2=[{
    id: "02",
    title: "Preparation",
    description:
      "Designing branding and presentations, booking venues, and coordinating with vendors to ensure everything is ready.",
  },
{
    id: "04",
    title: "Preparation",
    description:
      "Designing branding and presentations, booking venues, and coordinating with vendors to ensure everything is ready.",
  }];

export const events = [
  "Inquiry & Consultation",
  "Plan & Customise",
  "Setup & Support",
  "Event & Wrap‑Up",
];

export const socials = [
    { id: "facebook", label: "Facebook", icon:faFacebookF },
    { id: "instagram", label: "Instagram", icon:faInstagram },
    { id: "x", label: "X (Twitter)", icon:faXTwitter },
    { id: "linkedin", label: "LinkedIn", icon:faLinkedin },
  ];


export const services = [
  {
    id: "01.",
    title: "Pitch Event",
    desc: "Designed for startups focused on delivering compelling presentations to captivate and secure investor interest.",
    image:img1
  },
  {
    id: "02.",
    title: "Product Launch",
    desc: "Enhance your product launch with style and sophistication for an unforgettable event.",
    image:img2
  },
  {
    id: "03.",
    title: "Training Session",
    desc: "Comprehensive professional training designed to elevate your staff's capabilities and productivity.",
    image:img3
  },
  {
    id: "04.",
    title: "Presentation",
    desc: "Ideal for impactful corporate presentations that keep your audience engaged throughout.",
    image:img4
  },
  {
    id: "05.",
    title: "Networking Event",
    desc: "Connect with top professionals and build relationships that create new opportunities.",
    image:img5
  },
  {
    id: "06.",
    title: "Conference",
    desc: "Guarantee a smooth conference experience with top‑notch facilities and a committed team.",
    image:img6
  },
];


