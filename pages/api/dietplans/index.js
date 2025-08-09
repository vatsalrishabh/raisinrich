import dbConnect from "../../../util/dbConnect";
import DietPlan from "../../../models/DietPlan";

export default async function handler(req, res) {
  console.log("Diet Plans API called", req.body);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    let dietPlans = [];
    try {
      dietPlans = await DietPlan.find().lean();
    } catch (innerErr) {
      console.error("DB query failed, using fallback diet plans:", innerErr.message);
      dietPlans = [
        {
          _id: "fallback-1",
          day: "Monday",
          type: "balanced",
          category: "Veg",
          breakfast: {
            name: "Oats Bowl",
            image: "/images/balanced-diet.jpg",
            description: "Oats with fruits and nuts",
            protein: 12,
            carbs: 35,
            fats: 8,
            calories: 280,
          },
          lunch: {
            name: "Paneer Salad",
            image: "/images/balanced-diet.jpg",
            description: "Paneer with greens and veggies",
            protein: 22,
            carbs: 18,
            fats: 12,
            calories: 320,
          },
          eveningSnack: {
            name: "Fruit Bowl",
            image: "/images/balanced-diet.jpg",
            description: "Fresh seasonal fruits",
            protein: 2,
            carbs: 22,
            fats: 1,
            calories: 120,
          },
          dinner: {
            name: "Veg Khichdi",
            image: "/images/balanced-diet.jpg",
            description: "Light and healthy dinner",
            protein: 10,
            carbs: 28,
            fats: 5,
            calories: 250,
          },
        },
      ];
    }

    return res.status(200).json({ success: true, dietPlans });
  } catch (error) {
    console.error("Error fetching diet plans:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}