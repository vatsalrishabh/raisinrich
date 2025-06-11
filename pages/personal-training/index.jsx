import React from "react";
import { FaDumbbell, FaRupeeSign, FaUserCheck, FaAppleAlt, FaHeartbeat, FaChartLine, FaUserMd, FaCalendarCheck, FaBalanceScale } from "react-icons/fa";
import { GiBodyHeight, GiWeightScale, GiMuscleUp } from "react-icons/gi";

const plans = [
  {
    title: "Free Trial Class",
    price: "0",
    icon: <FaUserCheck className="text-green-400 text-3xl" />,
    desc: "Experience our training with a free trial session.",
    features: ["No commitment", "Meet your trainer", "Fitness assessment"],
  },
  {
    title: "Personal Training",
    price: "₹12,000 / month",
    icon: <FaDumbbell className="text-yellow-400 text-3xl" />,
    desc: "12 sessions per month with a certified trainer.",
    features: [
      "12 sessions/month",
      "Custom workout plan",
      "Progress tracking",
      "Flexible scheduling",
    ],
  },
  {
    title: "Diet Counselling",
    price: "₹2,500 / month",
    icon: <FaAppleAlt className="text-pink-400 text-3xl" />,
    desc: "Personalized macro nutrition diet plan & regular check-ins.",
    features: [
      "Macro Nutrition diet plan",
      "Weekly BMI check",
      "Monthly body measurements",
      "Session with dietitian every 15 days",
    ],
  },
  {
    title: "90 Days Transformation",
    price: "Custom",
    icon: <GiMuscleUp className="text-blue-400 text-3xl" />,
    desc: "Intensive 3-month program for total transformation.",
    features: [
      "Consultation with trainer",
      "Weekly follow-ups",
      "Workout plan",
      "Consultation with dietitian",
      "Macro nutrition diet plans",
    ],
  },
];

const index = () => {
  return (
    <div className="min-h-screen bg-[#18181b] py-10 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 font-dancing animate-fade-in">
        Personal Training & Diet Plans
      </h1>
      <p className="text-gray-300 text-lg mb-10 text-center max-w-2xl animate-fade-in-slow">
        Achieve your fitness goals with our expert trainers and personalized diet plans. Choose a plan that fits your lifestyle and start your transformation today!
      </p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
        {plans.map((plan, idx) => (
          <div
            key={plan.title}
            className="group bg-[#23232b] rounded-2xl shadow-xl border-2 border-yellow-400 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center p-7 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="mb-4 animate-pop">{plan.icon}</div>
            <h2 className="text-2xl font-bold text-yellow-300 mb-2">{plan.title}</h2>
            <div className="flex items-center justify-center mb-2">
              <FaRupeeSign className="text-yellow-400 mr-1" />
              <span className="text-xl font-semibold text-white">{plan.price}</span>
            </div>
            <p className="text-gray-400 mb-4">{plan.desc}</p>
            <ul className="text-gray-200 text-left mb-4 space-y-2">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 group-hover:text-yellow-300 transition-colors">
                  <span className="text-yellow-400">
                    <FaHeartbeat />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          <button
  onClick={() => {
    const message = `*Booking Request*%0A%0A*Plan:* ${plan.title}%0A*Price:* ${plan.price}%0A*Details:* ${plan.desc}%0A*Features:* ${plan.features.map(f => `\n- ${f}`).join("")}%0A%0APlease get in touch with me for further steps.`;
    const phoneNumber = "919999999999"; // Change this to your number with country code
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  }}
  className="mt-auto btn-primary bg-yellow-400 text-[#18181b] font-bold px-6 py-2 rounded-lg shadow hover:bg-yellow-300 transition-all"
>
  Book Now
</button>

          </div>
        ))}
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.5s;
        }
        .animate-pop {
          animation: pop 0.6s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes pop {
          0% { transform: scale(0.7);}
          80% { transform: scale(1.1);}
          100% { transform: scale(1);}
        }
      `}</style>
    </div>
  );
};

export default index;
