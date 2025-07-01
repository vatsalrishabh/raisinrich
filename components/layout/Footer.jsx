import React from "react";
import Title from "../ui/Title";

const Footer = () => {
  return (
    <div className="bg-secondary text-white">
      <div className="container mx-auto pt-16 pb-6">
        <div className="flex md:justify-between justify-center text-center flex-wrap md:gap-y-0 gap-y-6">
          {/* Contact Us */}
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Contact Us</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <a
                href="https://www.google.com/maps/place/31+4th+Floor,+12th+Main+Road,+Near+Deep+Agarbatti,+Kurubarahalli,+Bangalore+560086"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-map-marker"></i>
                <span className="inline-block ml-2">
                  #31 4th Floor, 12th Main Rd, Near Deep Agarbatti, Kurubarahalli, Bangalore 560086
                </span>
              </a>
              <div>
                <i className="fa fa-phone"></i>
                <a className="inline-block ml-2" href="tel:+919035188516">
                  +91 90351 88516
                </a>
              </div>
              <a href="mailto:raisinrich@gmail.com">
                <i className="fa fa-envelope"></i>
                <span className="inline-block ml-2">raisinrich@gmail.com</span>
              </a>
            </div>
          </div>

          {/* About Us */}
          <div className="md:flex-1">
            <Title addClass="text-[38px]">Raisinrich</Title>
            <p className="mt-3">
              Empowering lives through wellness, fitness, and personal health coaching. Tailored plans, expert guidance, and lifestyle transformation.
            </p>
            <div className="flex items-center justify-center mt-5 gap-x-2">
              {/*
              <a
                href="https://facebook.com/raisinrich"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:text-white hover:bg-primary transition-all transform hover:scale-110"
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                href="https://instagram.com/raisinrich"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:text-white hover:bg-primary transition-all transform hover:scale-110"
              >
                <i className="fa fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com/company/raisinrich"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:text-white hover:bg-primary transition-all transform hover:scale-110"
              >
                <i className="fa fa-linkedin"></i>
              </a>
              */}
            </div>
          </div>

          {/* Opening Hours */}
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Opening Hours</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <div>
                <span className="inline-block ml-2">Monday – Saturday</span>
              </div>
              <div>
                <span className="inline-block ml-2">9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-10">
          &copy; {new Date().getFullYear()} Raisinrich. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
