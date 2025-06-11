import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  description: String,
  protein: Number,
  carbs: Number,
  fats: Number,
  calories: Number,
}, { _id: false });

const dietPlanSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
  },
  type: {
    type: String,
    enum: ["balanced", "keto", "detox"],
    required: true,
  },
  category: {
    type: String,
    enum: ["Veg", "Non-Veg","Eggitarian", "Vegan"],
    required: true,
  },
  breakfast: mealSchema,
  lunch: mealSchema,
  eveningSnack: mealSchema,
  dinner: mealSchema,
}, { timestamps: true });

export default mongoose.models.DietPlan || mongoose.model("DietPlan", dietPlanSchema);
