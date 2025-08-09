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

const VegSection = ({ heading, foodItems }) => {
  // Use foodItems prop if provided, else fallback to demo data
  const dayWiseFood = foodItems && foodItems.length > 0 ? foodItems : [
    {
      day: "Monday",
        type:"balanced",
      category: "Veg",
      breakfast: {
        name: "Veg Omelette",
        image: "/images/balanced-diet.jpg",
        description: "A delicious omelette made with eggs and veggies, served with a side of toast.",
        protein: 18,
        carbs: 12,
        fats: 10,
        calories: 250,
      },
      lunch: {
        name: "Grilled Paneer Salad",
        image: "/images/balanced-diet.jpg",
        description: "A fresh salad topped with grilled paneer, mixed greens, and a light vinaigrette.",
        protein: 22,
        carbs: 20,
        fats: 12,
        calories: 320,
      },
      eveningSnack: {
        name: "Veg Wrap",
        image: "/images/balanced-diet.jpg",
        description: "A wrap filled with paneer, lettuce, and a tangy sauce.",
        protein: 18,
        carbs: 22,
        fats: 8,
        calories: 300,
      },
      dinner: {
        name: "Veg Stir-Fry",
        image: "/images/balanced-diet.jpg",
        description: "A stir-fry made with vegetables and a savory sauce.",
        protein: 20,
        carbs: 24,
        fats: 10,
        calories: 320,
      }
    },
    {
      day: "Tuesday",
        type:"balanced",
      category: "Veg",
      breakfast: {
        name: "Poha",
        image: "/images/balanced-diet.jpg",
        description: "Light and healthy poha.",
        protein: 6,
        carbs: 35,
        fats: 5,
        calories: 210,
      },
      lunch: {
        name: "Veg Biryani",
        image: "/images/balanced-diet.jpg",
        description: "Aromatic rice with veggies and spices.",
        protein: 10,
        carbs: 55,
        fats: 12,
        calories: 420,
      },
      eveningSnack: {
        name: "Tomato Soup",
        image: "/images/balanced-diet.jpg",
        description: "Warm tomato soup.",
        protein: 3,
        carbs: 10,
        fats: 2,
        calories: 90,
      },
      dinner: {
        name: "Dal Tadka",
        image: "/images/balanced-diet.jpg",
        description: "Protein rich dal with rice.",
        protein: 15,
        carbs: 45,
        fats: 10,
        calories: 380,
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
                    src={currentDayFood[meal].image || "/images/balanced-diet.jpg"}
                    alt={currentDayFood[meal].name || "Meal image"}
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

export default VegSection;
