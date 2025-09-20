import dbConnect from "../../../../util/dbConnect";
import DietPlan from "../../../../models/DietPlan";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  try {
    // Get all diet plans with full details
    const dietPlans = await DietPlan.find().lean();
    
    console.log("Total diet plans found:", dietPlans.length);
    console.log("Diet plans:", JSON.stringify(dietPlans, null, 2));
    
    res.status(200).json({ 
      success: true, 
      count: dietPlans.length,
      dietPlans 
    });
  } catch (error) {
    console.error("Error fetching diet plans:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}