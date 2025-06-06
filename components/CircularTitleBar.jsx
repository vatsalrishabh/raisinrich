import React from 'react';


const CircularTitleBar = ({image,title,subtitle}) => {
  return (
    <div
      className="h-[400px] w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${image?.src || image})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto flex flex-col items-center justify-center h-full text-white relative z-10">
        <h1 className="text-4xl font-bold mb-2">{title || "Subscribe Now"}</h1>
        <p className="text-lg">{subtitle || "Join our newsletter for updates"}</p>
      </div>
      {/* Inward (concave) white shape at the bottom */}
      <div className="absolute left-0 bottom-0 w-full overflow-hidden leading-none z-20">
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-32"
          style={{ transform: "rotate(180deg)" }} // Flip for inward curve
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white opacity-100"
          />
        </svg>
      </div>
    </div>
  );
};

export default CircularTitleBar;
