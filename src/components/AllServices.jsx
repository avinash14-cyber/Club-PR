import React from "react";

const SERVICES = [
   {
    title: "Design",
    tag: "Web design",
    image: "https://i.pinimg.com/736x/96/53/af/9653af9a8e31edb6ac493e9a99c07124.jpg",
  },
  {
    title: "Marketing",
    tag: "SEO",
    image: "https://i.pinimg.com/736x/6a/2a/02/6a2a028b78fc1b9f89d2299c9ae58d4b.jpg",
  },
  {
    title: "Prototype",
    tag: "Front-end",
    image: "https://i.pinimg.com/1200x/5e/01/44/5e0144b15c18f1fe86c2e18957ea508b.jpg",
  },
  {
    title: "Branding",
    tag: "Business",
    image: "https://i.pinimg.com/1200x/f0/9d/fe/f09dfebe1a0ec2be16040a54197a65c9.jpg",
  },
];

const AllServices = () => {
  return (
    <section className="w-full bg-white text-black py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
       

        {/* List */}
        <div className="space-y-10 md:space-y-0">
          {SERVICES.map((service) => (
            <div
            style={{ fontFamily: "Inter Tight, sans-serif" }}
              key={service.title}
              className="relative group overflow-visible border-t border-gray-200"
            >
              {/* Full-width black background: opacity toggle */}
              <div
                aria-hidden
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none"
              />

              {/* Row content on top of the bg */}
              <div className="relative z-10 flex items-center justify-between gap-6 py-5 px-2 md:px-6">
                {/* Left text */}
                <div
                  className="flex flex-col gap-4 transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-4"
                >
                  <h2 className="text-3xl md:text-6xl font-medium transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h2>

                  <span className="inline-flex px-4 py-1 rounded-full bg-black  text-white text-xs uppercase tracking-wide w-max">
                    {service.tag}
                  </span>
                </div>

                {/* Right image — moves left and scales on hover */}
                <div className="relative flex items-center justify-end w-40 md:w-56 h-[120px] md:h-[180px]">
                  <div
                    className="w-full h-full rounded-2xl overflow-hidden shadow-2xl transform translate-x-8 group-hover:-translate-x-6 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-30"
                    style={{ willChange: "transform" }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover block"
                      loading="lazy"
                    />
                  </div>

                  {/* small floating thumb at extreme right */}
                  <div className="hidden md:block absolute -right-7 top-1/2 -translate-y-1/2 w-16 h-16 rounded-lg overflow-hidden shadow-md z-40">
                    <img
                      src={service.image}
                      alt={`${service.title} thumb`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* bottom border */}
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </section>
  );
};

export default AllServices;
