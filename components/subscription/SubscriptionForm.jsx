import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaWeight,
  FaAppleAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaFlag,
  FaHashtag,
  FaVenusMars,
  FaCalendarAlt,
  FaUtensils,
  FaLeaf,
  FaRupeeSign,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";
import { GiBodyHeight, GiWeightScale, GiMeal, GiMuscleUp, GiCutDiamond } from "react-icons/gi";
import { updateForm, resetForm } from "../../redux/subscription/subscriptionSlice"; // See slice code below
import { useRouter } from "next/router";

const mealTimeOptions = [
  { label: "Morning", value: "Morning" },
  { label: "Afternoon", value: "Afternoon" },
  { label: "Evening Snack", value: "Evening Snack" },
  { label: "Dinner", value: "Dinner" },
];

const steps = [
  {
    label: "What's your goal?",
    name: "goal",
    type: "radio",
    icon: <GiMuscleUp className="text-yellow-400 text-2xl" />,
    options: [
      { label: "Weight Loss", icon: <FaWeight className="text-pink-400" /> },
      { label: "Weight Maintenance", icon: <GiCutDiamond className="text-blue-400" /> },
      { label: "Gain Muscle", icon: <GiMuscleUp className="text-green-400" /> },
      { label: "Detox/Cut Diets", icon: <FaAppleAlt className="text-orange-400" /> },
    ],
    required: true,
  },
  {
    label: "Preferred Diet Technique?",
    name: "dietTechnique",
    type: "radio",
    icon: <FaAppleAlt className="text-green-400 text-2xl" />,
    options: [
      { label: "Balanced Diet", icon: <FaLeaf className="text-green-400" /> },
      { label: "Keto Diet", icon: <GiMeal className="text-yellow-400" /> },
      { label: "High Protein", icon: <GiMuscleUp className="text-blue-400" /> },
      { label: "Vegan Diet", icon: <FaLeaf className="text-pink-400" /> },
      { label: "Gluten Free Diet", icon: <FaAppleAlt className="text-orange-400" /> },
      { label: "Let our experts decide for you!", icon: <FaCheckCircle className="text-green-500" /> },
    ],
    required: true,
  },
  {
    label: "Your Details",
    fields: [
      {
        label: "Height (Feet)",
        name: "heightFeet",
        type: "number",
        min: 3,
        max: 8,
        icon: <GiBodyHeight className="text-yellow-400" />,
        placeholder: "3",
        required: true,
      },
      {
        label: "Height (Inches)",
        name: "heightInches",
        type: "number",
        min: 0,
        max: 11,
        icon: <GiBodyHeight className="text-yellow-400" />,
        placeholder: "0",
        required: true,
      },
      {
        label: "Weight (kg)",
        name: "weight",
        type: "number",
        min: 0,
        max: 300,
        icon: <GiWeightScale className="text-pink-400" />,
        placeholder: "0",
        required: true,
      },
      {
        label: "Age",
        name: "age",
        type: "number",
        min: 0,
        max: 120,
        icon: <FaCalendarAlt className="text-blue-400" />,
        placeholder: "0",
        required: true,
      },
      {
        label: "Gender",
        name: "gender",
        type: "select",
        icon: <FaVenusMars className="text-green-400" />,
        options: ["Male", "Female", "Other"],
        required: true,
      },
      {
        label: "How many days for this diet plan?",
        name: "days",
        type: "select",
        icon: <FaCalendarAlt className="text-yellow-400" />,
        options: ["7 days", "15 days", "30 days", "60 days", "90 days"],
        required: true,
      },
      {
        label: "Select your meal times",
        name: "mealTimes",
        type: "checkbox-group",
        icon: <FaUtensils className="text-orange-400" />,
        options: mealTimeOptions,
        required: true,
      },
      {
        label: "Diet Type",
        name: "dietType",
        type: "select",
        icon: <FaLeaf className="text-green-400" />,
        options: ["Vegetarian", "Non-Vegetarian", "Eggitarian"],
        required: true,
      },
    ],
  },
  {
    label: "Personal Info",
    fields: [
      {
        label: "Full Name",
        name: "fullName",
        type: "text",
        icon: <FaUser className="text-yellow-400" />,
        placeholder: "Enter your name",
        required: true,
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        icon: <FaEnvelope className="text-blue-400" />,
        placeholder: "Enter your email",
        required: true,
      },
      {
        label: "Phone Number",
        name: "phone",
        type: "tel",
        icon: <FaPhone className="text-green-400" />,
        placeholder: "Enter your phone number",
        required: true,
      },
      {
        label: "Address",
        name: "address",
        type: "text",
        icon: <FaMapMarkerAlt className="text-pink-400" />,
        placeholder: "Enter your address",
        required: true,
      },
      {
        label: "City",
        name: "city",
        type: "text",
        icon: <FaCity className="text-yellow-400" />,
        placeholder: "Enter your city",
        required: true,
      },
      {
        label: "State",
        name: "state",
        type: "text",
        icon: <FaFlag className="text-blue-400" />,
        placeholder: "Enter your state",
        required: true,
      },
      {
        label: "Country",
        name: "country",
        type: "text",
        icon: <FaFlag className="text-green-400" />,
        placeholder: "Enter your country",
        required: true,
      },
      {
        label: "Zip Code",
        name: "zipCode",
        type: "text",
        icon: <FaHashtag className="text-pink-400" />,
        placeholder: "Enter your zip code",
        required: true,
      },
    ],
  },
];

const planPrices = {
  "7 days": 1200,
  "15 days": 2200,
  "30 days": 4000,
  "60 days": 7000,
  "90 days": 9000,
};

const SubscriptionForm = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.subscription.form);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const progress = Math.round((step / (steps.length - 1)) * 100);

  // Calculate total price based on selected days
  const total =
    planPrices[form.days] ||
    (form.goal === "Detox/Cut Diets" ? 2500 : form.goal === "Gain Muscle" ? 12000 : 0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "mealTimes") {
      // Handle mealTimes as array
      let updated = Array.isArray(form.mealTimes) ? [...form.mealTimes] : [];
      if (checked) {
        updated.push(value);
      } else {
        updated = updated.filter((v) => v !== value);
      }
      dispatch(updateForm({ mealTimes: updated }));
    } else {
      dispatch(updateForm({ [name]: type === "number" ? value.replace(/^0+/, "") : value }));
    }
  };

  const canProceed = () => {
    const currentStep = steps[step];
    if (currentStep.type === "radio") {
      return !!form[currentStep.name];
    }
    if (currentStep.fields) {
      return currentStep.fields.every((f) => !f.required || form[f.name]);
    }
    return true;
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#18181b] animate-fade-in">
      <div className="w-full max-w-2xl bg-[#23232b] p-10 rounded-2xl shadow-2xl border-2 border-yellow-400">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-2xl text-yellow-400 flex items-center gap-2">
              <FaCheckCircle className="text-green-400" /> Your Food Delivery Plan
            </span>
            <span className="text-lg font-semibold text-white">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          <label className="block text-lg font-bold text-yellow-300 mb-4 flex items-center gap-2">
            {steps[step].icon}
            {steps[step].label}
          </label>
          {/* Radio group */}
          {steps[step].type === "radio" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {steps[step].options.map((option) => (
                <label
                  key={option.label}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 shadow group
                    ${
                      form[steps[step].name] === option.label
                        ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-transparent scale-105"
                        : "bg-[#18181b] border-gray-600 text-gray-200 hover:bg-yellow-900/30"
                    }`}
                >
                  <input
                    type="radio"
                    name={steps[step].name}
                    value={option.label}
                    checked={form[steps[step].name] === option.label}
                    onChange={handleChange}
                    className="mr-2 accent-orange-500"
                  />
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </label>
              ))}
            </div>
          )}

          {/* Multiple fields */}
          {steps[step].fields && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps[step].fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <span className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                    {field.icon}
                    {field.label}
                  </span>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={form[field.name] || ""}
                      onChange={handleChange}
                      required={field.required}
                      className="px-3 py-2 border border-gray-600 rounded bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="">Select</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox-group" ? (
                    <div className="flex flex-wrap gap-3">
                      {field.options.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="mealTimes"
                            value={opt.value}
                            checked={form.mealTimes?.includes(opt.value) || false}
                            onChange={handleChange}
                            className="accent-orange-500"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      min={field.min}
                      max={field.max}
                      placeholder={field.placeholder}
                      value={form[field.name] || ""}
                      onChange={handleChange}
                      required={field.required}
                      className="px-3 py-2 border border-gray-600 rounded bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total Label */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold text-yellow-400 flex items-center gap-2">
            <FaRupeeSign className="text-yellow-400" />
            Total:{" "}
            <span className="text-2xl text-white animate-bounce">{total ? `₹${total}` : "—"}</span>
          </span>
          <span className="text-sm text-gray-400">*Based on your selection</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="bg-gray-700 text-gray-200 px-6 py-2 rounded font-bold hover:bg-gray-600 transition flex items-center gap-2"
            onClick={handlePrev}
            disabled={step === 0}
          >
            <FaChevronLeft /> Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              className={`px-8 py-2 rounded font-bold text-white flex items-center gap-2 transition-all duration-200
                ${
                  canProceed()
                    ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:scale-105"
                    : "bg-gray-700 cursor-not-allowed"
                }`}
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next <FaChevronRight />
            </button>
          ) : (
            <button
              type="button"
              className="px-8 py-2 rounded font-bold text-white bg-green-500 hover:bg-green-600 transition flex items-center gap-2"
              onClick={() => {
                // Save form to Redux (already done), then go to cart
                router.push("/cart");
              }}
              disabled={!canProceed()}
            >
              <FaCheckCircle /> Submit
            </button>
          )}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline font-semibold hover:text-yellow-400 transition"
          >
            Confused? Click here to get on a free consultation call with a Raisinrich Nutritionist &amp; choose the right technique for you.
          </a>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default SubscriptionForm;
