import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full sticky top-0 z-40 bg-black/90 backdrop-blur-md shadow-lg">
      <div className="mx-auto max-w-7xl px-3 py-3 flex items-center justify-between">
        
        {/* Left: Brand */}
        <div
          onClick={() => navigate("/")}
          className="text-white font-semibold text-xl tracking-tight cursor-pointer"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          PR CLUB
        </div>

        {/* Right: Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium text-white">
          
          <button
            onClick={() => navigate("/")}
            className="relative after:absolute after:left-0 after:-bottom-1 
                       after:h-px after:w-0 after:bg-white 
                       hover:after:w-full after:transition-all duration-500"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/about")}
            className="relative after:absolute after:left-0 after:-bottom-1 
                       after:h-px after:w-0 after:bg-white 
                       hover:after:w-full after:transition-all duration-500"
          >
            About Us
          </button>

          <button
            onClick={() => navigate("/ourservices")}
            className="relative after:absolute after:left-0 after:-bottom-1 
                       after:h-px after:w-0 after:bg-white 
                       hover:after:w-full after:transition-all duration-500"
          >
            Services
          </button>

          <button
            onClick={() => navigate("/contactus")}
            className="relative after:absolute after:left-0 after:-bottom-1 
                       after:h-px after:w-0 after:bg-white 
                       hover:after:w-full after:transition-all duration-500"
          >
            Contact Us
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
