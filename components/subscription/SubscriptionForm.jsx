import React, { useState } from 'react';

const steps = [
  {
    label: "What's your goal?*",
    name: "goal",
    type: "radio",
    options: [
      "Weight Loss",
      "Weight Maintenance",
      "Gain Muscle",
      "Detox/Cut Diets"
    ],
    required: true,
  },
  {
    label: "Your Height*",
    fields: [
      {
        label: "Feet",
        name: "heightFeet",
        type: "number",
        min: 3,
        max: 8,
        placeholder: "3",
        required: true,
      },
      {
        label: "Inches",
        name: "heightInches",
        type: "number",
        min: 0,
        max: 11,
        placeholder: "0",
        required: true,
      }
    ]
  },
  {
    label: "Personal Info",
    fields: [
      {
        label: "Full Name",
        name: "fullName",
        type: "text",
        placeholder: "Enter your name",
        required: true,
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
      }
    ]
  }
];

const initialFormState = {
  goal: "",
  heightFeet: "",
  heightInches: "",
  fullName: "",
  email: ""
};

const SubscriptionForm = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialFormState);

  const progress = Math.round((step / (steps.length - 1)) * 100);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? value.replace(/^0+/, '') : value
    }));
  };

  const canProceed = () => {
    const currentStep = steps[step];
    if (currentStep.type === "radio") {
      return !!form[currentStep.name];
    }
    if (currentStep.fields) {
      return currentStep.fields.every(
        (f) => !f.required || form[f.name]
      );
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-2xl">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-2xl">✅ Your Food Delivery Plan</span>
            <span className="text-lg font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-4">
            {steps[step].label}
          </label>
          {/* Radio group */}
          {steps[step].type === "radio" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {steps[step].options.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition ${
                    form[steps[step].name] === option
                      ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-transparent"
                      : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name={steps[step].name}
                    value={option}
                    checked={form[steps[step].name] === option}
                    onChange={handleChange}
                    className="mr-2 accent-orange-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {/* Multiple fields */}
          {steps[step].fields && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps[step].fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">{field.label}</span>
                  <input
                    type={field.type}
                    name={field.name}
                    min={field.min}
                    max={field.max}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded font-bold hover:bg-gray-400 transition"
            onClick={handlePrev}
            disabled={step === 0}
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              className={`px-8 py-2 rounded font-bold text-white transition ${
                canProceed()
                  ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:scale-105"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="px-8 py-2 rounded font-bold text-white bg-green-500 hover:bg-green-600 transition"
              onClick={() => alert("Form submitted!")}
              disabled={!canProceed()}
            >
              Submit
            </button>
          )}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-semibold"
          >
            Confused? Click here to get on a free consultation call with a Raisinrich Nutritionist &amp; choose the right technique for you.
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
