import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import StartFoodSubscription from '../../components/ui/StartFoodSubscription';

const cards = [
  {
    title: "Balanced Diet",
    image: "/images/balanced-diet.jpg",
    link: "#balanced-diet", // Use id for jump
    id: "balanced-diet"
  },
  {
    title: "Keto Diet",
    image: "/images/keto-diet.jpg",
    link: "#keto-diet",
    id: "keto-diet"
  },
  {
    title: "Detox Cut Diet",
    image: "/images/detox-diet.jpg",
    link: "#detox-diet",
    id: "detox-diet"
  },
];

const JumpToBalKetoDetox = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {cards.map((card) => (
        <a
          key={card.title}
          href={card.link}
          className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${card.image})` }}
          />
          <div className="relative z-10 flex flex-col justify-end h-64 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow">{card.title}</h2>
            <div className="flex items-center gap-2 text-lg text-white font-semibold group-hover:translate-x-2 transition-all duration-300">
              View All
              <FaArrowRight className="inline-block" />
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </a>
      ))}

      <div className='flex items-center justify-center col-span-full mt-8'>
        <StartFoodSubscription/>
      </div>
    </div>
  );
};

export default JumpToBalKetoDetox;
