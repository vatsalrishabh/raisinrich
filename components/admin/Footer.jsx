import React from "react";
import Title from "../../components/ui/Title";

const Footer = () => {
  const footerData = {
    location: "#31 4th floor 12th main road near deep agarbatti Kurubarahalli bangalore 560086",
    email: "info@example.com",
    phoneNumber: "+91 9876543210",
    desc: "We provide quality services with 24/7 support.",
    openingHours: {
      day: "Mon - Fri",
      hour: "9:00 AM - 6:00 PM",
    },
    socialMedia: [
      { icon: "fa fa-facebook", link: "https://facebook.com" },
      { icon: "fa fa-twitter", link: "https://twitter.com" },
      { icon: "fa fa-instagram", link: "https://instagram.com" },
    ],
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5 flex flex-col justify-center">
      <Title addClass="text-[40px]">Footer Information</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 text-lg">
        <p><strong>Location:</strong> {footerData.location}</p>
        <p><strong>Email:</strong> {footerData.email}</p>
        <p><strong>Phone Number:</strong> {footerData.phoneNumber}</p>
        <p><strong>Description:</strong> {footerData.desc}</p>
        <p><strong>Opening Days:</strong> {footerData.openingHours.day}</p>
        <p><strong>Opening Hours:</strong> {footerData.openingHours.hour}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
        <ul className="flex items-center gap-6">
          {footerData.socialMedia.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <i className={`${item.icon} text-2xl`}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
