import React from "react";

const ContactUs = () => {
  return (
    <>
      {/* ================= BANNER SECTION ================= */}
      <section className="relative w-full h-[60vh] min-h-[420px]">
        {/* Background Image */}
        <img
          src="https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg"
          alt="Contact Us Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Banner Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-white text-5xl md:text-7xl font-semibold leading-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl">
              Media inquiries, brand collaborations, or general questions —
              we’re here to help.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-5xl md:text-6xl font-semibold leading-tight text-black">
              Let’s Start the
              <br />
              Conversation
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-md">
              Whether you’re looking to elevate your brand presence, explore media
              opportunities, or collaborate on a campaign — our team is ready to
              connect. Share a few details and we’ll be in touch shortly.
            </p>

            {/* Contact Card */}
            <div className="mt-12 bg-[#F3F0ED] rounded-2xl p-8 max-w-md">
              <h3 className="text-2xl font-medium text-black mb-6">
                Prefer to Reach Us Directly?
              </h3>

              <div className="space-y-6 text-gray-700">
                <div className="flex gap-4">
                  <span>📍</span>
                  <div>
                    <p className="font-medium text-black">Office</p>
                    <p>
                      1234 Wilshire Blvd, Suite 200
                      <br />
                      Los Angeles, CA 90017
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span>📞</span>
                  <div>
                    <p className="font-medium text-black">Phone</p>
                    <p>+1 (212) 123-4567</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span>✉️</span>
                  <div>
                    <p className="font-medium text-black">Email</p>
                    <p>press@youragency.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span>🕒</span>
                  <div>
                    <p className="font-medium text-black">Office Hours</p>
                    <p>
                      Monday – Saturday
                      <br />
                      9:00 AM – 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – FORM */}
          <form className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-full border border-gray-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-full border border-gray-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your number"
                className="w-full rounded-full border border-gray-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="6"
                placeholder="Tell us about your brand, campaign goals, or media inquiry..."
                className="w-full rounded-3xl border border-gray-300 px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#7A5C45] px-8 py-4 text-white font-medium hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
