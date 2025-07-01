import React from "react";
import { FaQuoteLeft, FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import Title from "../../components/ui/Title";

const transformations = [
  {
    name: "Amit Sharma",
    before: "/images/transformations/amit-before.jpg",
    after: "/images/transformations/amit-after.jpg",
    story:
      "I lost 18kg in 3 months with Raisinrich's 90 Days Transformation. The trainers and dietitians kept me motivated and accountable every week. I feel stronger, healthier, and more confident than ever!",
  },
  {
    name: "Priya Singh",
    before: "/images/transformations/priya-before.jpg",
    after: "/images/transformations/priya-after.jpg",
    story:
      "The personal training and diet counseling changed my life. I learned how to eat right for my body and now I love working out. Thank you Raisinrich for helping me become the best version of myself!",
  },
];

const Transformations = () => {
  return (
    <div className="min-h-screen bg-[#18181b] py-10 px-4 flex flex-col items-center">
      <Title addClass="text-4xl md:text-5xl text-yellow-400 mb-2 font-dancing animate-fade-in">
        Transformations
      </Title>

      <p className="text-gray-300 text-lg mb-10 text-center max-w-2xl animate-fade-in-slow">
        Real stories. Real results. See how our clients transformed their bodies
        and lives with Raisinrich’s expert guidance.
      </p>

      <div className="grid gap-10 md:grid-cols-2 w-full max-w-5xl">
        {transformations.map((t, idx) => (
          <div
            key={idx}
            className="group bg-[#23232b] rounded-2xl shadow-xl border-2 border-yellow-400 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row items-center p-6 md:p-8"
          >
            {/* Images */}
            <div className="flex flex-col items-center md:items-start md:w-1/2 gap-3">
              {/* Before Image */}
              <div className="relative w-40 h-52 rounded-xl overflow-hidden shadow-lg border-2 border-gray-700 bg-black transition-transform group-hover:scale-105">
                <Image
                  src={t.before}
                  alt={`${t.name} Before`}
                  width={160}
                  height={208}
                  className="object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-300 rounded-xl"
                />
                <span className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow">
                  Before
                </span>
              </div>

              {/* After Image */}
              <div className="relative w-40 h-52 rounded-xl overflow-hidden shadow-lg border-2 border-yellow-400 bg-black transition-transform group-hover:scale-105">
                <Image
                  src={t.after}
                  alt={`${t.name} After`}
                  width={160}
                  height={208}
                  className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                />
                <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow">
                  After
                </span>
              </div>
            </div>

            {/* Story */}
            <div className="flex-1 mt-6 md:mt-0 md:ml-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <FaUserCircle className="text-yellow-400 text-2xl" />
                <span className="text-lg font-bold text-white">{t.name}</span>
              </div>
              <div className="flex items-start gap-2 text-gray-200 text-base italic">
                <FaQuoteLeft className="text-yellow-400 mt-1" />
                <span className="group-hover:text-yellow-300 transition-colors">
                  {t.story}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.5s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Transformations;
