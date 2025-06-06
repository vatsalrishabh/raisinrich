import React, { useState } from 'react';
import { FaSun, FaCloud, FaCloudRain, FaRegCalendarAlt } from 'react-icons/fa';
import { GiChickenOven, GiFishCooked, GiEggClutch, GiWrappedSweet } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Icon map for days (customize as you like)
const dayIcons = [
  <FaSun key="sun1" className="text-yellow-400" />,
  <FaCloud key="cloud1" className="text-blue-400" />,
  <FaCloudRain key="rain" className="text-indigo-400" />,
  <FaRegCalendarAlt key="cal1" className="text-green-400" />,
  <FaSun key="sun2" className="text-orange-400" />,
  <FaCloud key="cloud2" className="text-pink-400" />,
  <FaRegCalendarAlt key="cal2" className="text-purple-400" />,
];

// Icon map for meals
const mealIcons = {
  breakfast: <GiEggClutch className="text-yellow-500 text-2xl" />,
  lunch: <GiChickenOven className="text-orange-500 text-2xl" />,
  eveningSnack: <GiWrappedSweet className="text-pink-500 text-2xl" />,
  dinner: <GiFishCooked className="text-blue-500 text-2xl" />,
};

const NonVegSection = ({ heading, foodItems }) => {
  // Use foodItems prop if provided, else fallback to demo data
  const dayWiseFood = foodItems && foodItems.length > 0 ? foodItems : [
    {
      day: "Monday",
      category: "Non-Veg",
      type:"balanced",
      breakfast: {
        name: "Chicken Omelette",
        image: "https://example.com/chicken-omelette.jpg",
        description: "A delicious omelette made with eggs and chicken, served with a side of toast.",
        protein: 25,
        carbs: 10,
        fats: 15,
        calories: 300,
      },
      lunch: {
        name: "Grilled Chicken Salad",
        image: "https://example.com/grilled-chicken-salad.jpg",
        description: "A fresh salad topped with grilled chicken, mixed greens, and a light vinaigrette.",
        protein: 40,
        carbs: 15,
        fats: 10,
        calories: 350,
      },
      eveningSnack: {
        name: "Chicken Wrap",
        image: "https://example.com/chicken-wrap.jpg",
        description: "A wrap filled with grilled chicken, lettuce, and a tangy sauce.",
        protein: 30,
        carbs: 20,
        fats: 12,
        calories: 400,
      },
      dinner: {
        name: "Spicy Chicken Stir-Fry",
        image: "https://example.com/spicy-chicken-stir-fry.jpg",
        description: "A spicy stir-fry made with chicken, vegetables, and a savory sauce.",
        protein: 35,
        carbs: 25,
        fats: 15,
        calories: 450,
      }
    },
    {
      day: "Tuesday",
        type:"balanced",
      category: "Non-Veg",
      breakfast: {
        name: "Egg Bhurji",
        image: "https://example.com/egg-bhurji.jpg",
        description: "Spiced scrambled eggs with onions and tomatoes.",
        protein: 20,
        carbs: 8,
        fats: 12,
        calories: 250,
      },
      lunch: {
        name: "Chicken Biryani",
        image: "https://example.com/chicken-biryani.jpg",
        description: "Aromatic rice with tender chicken pieces and spices.",
        protein: 35,
        carbs: 60,
        fats: 18,
        calories: 550,
      },
      eveningSnack: {
        name: "Chicken Soup",
        image: "https://example.com/chicken-soup.jpg",
        description: "Warm chicken soup with veggies.",
        protein: 18,
        carbs: 10,
        fats: 6,
        calories: 180,
      },
      dinner: {
        name: "Fish Curry",
        image: "https://example.com/fish-curry.jpg",
        description: "Spicy fish curry served with steamed rice.",
        protein: 28,
        carbs: 30,
        fats: 14,
        calories: 400,
      }
    }
  ];

  const [selectedDay, setSelectedDay] = useState(dayWiseFood[0].day);

  const currentDayFood = dayWiseFood.find(food => food.day === selectedDay);

  return (
    <div className='w-full max-w-6xl mx-auto py-8 px-2'>
      <h2 className='text-4xl font-extrabold mb-8 text-center tracking-tight text-gray-800'>{heading}</h2>
      {/* Day selection buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {dayWiseFood.map((food, idx) => (
          <motion.button
            key={food.day}
            onClick={() => setSelectedDay(food.day)}
            whileHover={{ scale: 1.08, boxShadow: "0 4px 24px 0 rgba(255,140,0,0.15)" }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-200 text-lg
              ${selectedDay === food.day
                ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white scale-105"
                : "bg-white text-gray-800 hover:bg-orange-100"
              }`}
          >
            <span className="text-xl">{dayIcons[idx % dayIcons.length]}</span>
            {food.day}
          </motion.button>
        ))}
      </div>

      {/* Display selected day's food */}
      <AnimatePresence mode="wait">
        {currentDayFood && (
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {["breakfast", "lunch", "eveningSnack", "dinner"].map((meal, i) =>
              currentDayFood[meal] ? (
                <motion.div
                  key={meal}
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(255,140,0,0.15)" }}
                  className="bg-white p-6 rounded-2xl shadow-lg flex flex-col h-full"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {mealIcons[meal]}
                    <h3 className='text-2xl font-bold'>{currentDayFood[meal].name}</h3>
                  </div>
                  <Image
                    width={400}
                    height={300}
                    src={currentDayFood[meal].image}
                    alt={currentDayFood[meal].name}
                    className='w-full h-44 object-cover rounded-xl mb-4 border'
                  />
                  <p className='text-gray-700 mb-3'>{currentDayFood[meal].description}</p>
                  <div className='flex flex-wrap justify-between text-sm text-gray-600 gap-2 mt-auto'>
                    <span className="bg-yellow-100 rounded px-2 py-1">Protein: <b>{currentDayFood[meal].protein}g</b></span>
                    <span className="bg-orange-100 rounded px-2 py-1">Carbs: <b>{currentDayFood[meal].carbs}g</b></span>
                    <span className="bg-red-100 rounded px-2 py-1">Fats: <b>{currentDayFood[meal].fats}g</b></span>
                    <span className="bg-green-100 rounded px-2 py-1">Calories: <b>{currentDayFood[meal].calories}</b></span>
                  </div>
                </motion.div>
              ) : null
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NonVegSection;
