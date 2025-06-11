import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel, GiChickenOven, GiFruitBowl, GiMeat, GiSandsOfTime, GiNightSleep } from "react-icons/gi";
import { FaLeaf, FaDrumstickBite, FaBalanceScale, FaFireAlt, FaCloudSun } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Image from "next/image";

const mealNames = [
  { key: "breakfast", label: "Breakfast", icon: <GiFruitBowl className="text-yellow-400 text-xl" /> },
  { key: "lunch", label: "Lunch", icon: <GiChickenOven className="text-orange-400 text-xl" /> },
  { key: "eveningSnack", label: "Evening Snack", icon: <FaCloudSun className="text-pink-400 text-xl" /> },
  { key: "dinner", label: "Dinner", icon: <GiNightSleep className="text-blue-400 text-xl" /> },
];

const days = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const AddDietPlanForm = ({ onSuccess, setShowAddModal }) => {
  const [mealImages, setMealImages] = useState({
    breakfast: null,
    lunch: null,
    eveningSnack: null,
    dinner: null,
  });
  const [mealImagePreviews, setMealImagePreviews] = useState({
    breakfast: "",
    lunch: "",
    eveningSnack: "",
    dinner: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      day: "",
      type: "",
      category: "",
      breakfast: { name: "", image: "", description: "", protein: "", carbs: "", fats: "", calories: "" },
      lunch: { name: "", image: "", description: "", protein: "", carbs: "", fats: "", calories: "" },
      eveningSnack: { name: "", image: "", description: "", protein: "", carbs: "", fats: "", calories: "" },
      dinner: { name: "", image: "", description: "", protein: "", carbs: "", fats: "", calories: "" },
    },
    validationSchema: Yup.object({
      day: Yup.string().required("Day is required"),
      type: Yup.string().required("Type is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values, actions) => {
      setBtnDisabled(true);
      try {
        // Prepare FormData
        const formData = new FormData();
        formData.append("day", values.day);
        formData.append("type", values.type);
        formData.append("category", values.category);

        // For each meal, append fields and file (if any)
        for (const meal of mealNames) {
          const mealData = values[meal.key];
          formData.append(`${meal.key}[name]`, mealData.name);
          formData.append(`${meal.key}[description]`, mealData.description);
          formData.append(`${meal.key}[protein]`, mealData.protein);
          formData.append(`${meal.key}[carbs]`, mealData.carbs);
          formData.append(`${meal.key}[fats]`, mealData.fats);
          formData.append(`${meal.key}[calories]`, mealData.calories);
          // Append image file if selected, else append empty string
          if (mealImages[meal.key]) {
            formData.append(`${meal.key}[image]`, mealImages[meal.key]);
          } else {
            formData.append(`${meal.key}[image]`, mealData.image || "");
          }
        }

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/dietplans/uploadNew`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        toast.success("Diet plan added!");
        actions.resetForm();
        setMealImages({ breakfast: null, lunch: null, eveningSnack: null, dinner: null });
        setMealImagePreviews({ breakfast: "", lunch: "", eveningSnack: "", dinner: "" });
        setBtnDisabled(false);
        if (onSuccess) onSuccess();
        if (setShowAddModal) setShowAddModal(false);
      } catch (err) {
        toast.error("Failed to add diet plan");
        setBtnDisabled(false);
      }
    },
  });

  const handleMealImageChange = (e, mealKey) => {
    const file = e.target.files[0];
    if (file) {
      setMealImages((prev) => ({ ...prev, [mealKey]: file }));
      const reader = new FileReader();
      reader.onload = (ev) => {
        setMealImagePreviews((prev) => ({ ...prev, [mealKey]: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-black after:absolute after:top-0 after:left-0 after:opacity-70 grid place-content-center">
      <OutsideClickHandler
        onOutsideClick={() => {
         
          setShowAddModal(false);
          
        }}
      >
        <div className="w-full h-full grid place-content-center relative">
          <form
            onSubmit={formik.handleSubmit}
            className="relative z-50 md:w-[650px] w-[98vw] max-w-lg bg-[#18181b] border-2 border-yellow-400 p-6 rounded-3xl shadow-2xl"
          >
            <Title addClass="text-[32px] text-center mb-4 text-yellow-400 font-dancing">
              <FaBalanceScale className="inline-block mr-2 text-yellow-400" />
              Add Diet Plan
            </Title>
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <select
                name="day"
                value={formik.values.day}
                onChange={formik.handleChange}
                className="border p-2 rounded w-full bg-[#23232b] text-white focus:border-yellow-400"
              >
                <option value="">Day</option>
                {days.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                className="border p-2 rounded w-full bg-[#23232b] text-white focus:border-yellow-400"
              >
                <option value="">Type</option>
                <option value="balanced">Balanced</option>
                <option value="keto">Keto</option>
                <option value="detox">Detox</option>
              </select>
              <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                className="border p-2 rounded w-full bg-[#23232b] text-white focus:border-yellow-400"
              >
                <option value="">Category</option>
                <option value="Veg">Veg <FaLeaf className="inline ml-1 text-green-400" /></option>
                <option value="Non-Veg">Non-Veg <FaDrumstickBite className="inline ml-1 text-red-400" /></option>
                  <option value="Eggitarian">Eggitarian <FaDrumstickBite className="inline ml-1 text-red-400" /></option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mealNames.map((meal) => (
                <div key={meal.key} className="border rounded-xl p-3 bg-[#23232b] text-white shadow flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    {meal.icon}
                    <span className="font-semibold">{meal.label}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id={`file-${meal.key}`}
                      onChange={(e) => handleMealImageChange(e, meal.key)}
                    />
                    <label htmlFor={`file-${meal.key}`}>
                      <span className="btn-primary !rounded !bg-yellow-400 text-[#18181b] cursor-pointer px-2 py-1 text-xs">
                        Choose Image
                      </span>
                    </label>
                    {mealImagePreviews[meal.key] && (
                      <Image
                        className="rounded border border-yellow-400"
                        src={mealImagePreviews[meal.key]}
                        alt=""
                        width={48}
                        height={48}
                      />
                    )}
                  </div>
                  <input
                    name={`${meal.key}.name`}
                    placeholder="Name"
                    value={formik.values[meal.key].name}
                    onChange={formik.handleChange}
                    className="border p-1 rounded w-full mb-1 bg-[#18181b] text-white focus:border-yellow-400"
                  />
                  <input
                    name={`${meal.key}.description`}
                    placeholder="Description"
                    value={formik.values[meal.key].description}
                    onChange={formik.handleChange}
                    className="border p-1 rounded w-full mb-1 bg-[#18181b] text-white focus:border-yellow-400"
                  />
                  <div className="flex gap-1">
                    <input
                      name={`${meal.key}.protein`}
                      placeholder="Protein"
                      value={formik.values[meal.key].protein}
                      onChange={formik.handleChange}
                      className="border p-1 rounded w-full bg-[#18181b] text-white focus:border-yellow-400"
                    />
                    <input
                      name={`${meal.key}.carbs`}
                      placeholder="Carbs"
                      value={formik.values[meal.key].carbs}
                      onChange={formik.handleChange}
                      className="border p-1 rounded w-full bg-[#18181b] text-white focus:border-yellow-400"
                    />
                    <input
                      name={`${meal.key}.fats`}
                      placeholder="Fats"
                      value={formik.values[meal.key].fats}
                      onChange={formik.handleChange}
                      className="border p-1 rounded w-full bg-[#18181b] text-white focus:border-yellow-400"
                    />
                    <input
                      name={`${meal.key}.calories`}
                      placeholder="Calories"
                      value={formik.values[meal.key].calories}
                      onChange={formik.handleChange}
                      className="border p-1 rounded w-full bg-[#18181b] text-white focus:border-yellow-400"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`btn-primary px-6 py-2 rounded-lg text-lg font-bold bg-yellow-400 text-[#18181b] hover:bg-yellow-300 transition-all shadow ${
                  btnDisabled ? "opacity-60 cursor-not-allowed" : ""
                }`}
                disabled={btnDisabled}
              >
                Add Diet Plan
              </button>
            </div>
            <button
              className="absolute top-4 right-4"
              type="button"
              onClick={() => {
            
                 setShowAddModal(false);
                
              }}
            >
              <GiCancel size={28} className="transition-all hover:text-red-500" />
            </button>
          </form>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddDietPlanForm;