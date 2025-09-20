import dbConnect from "../../../../util/dbConnect";
import DietPlan from "../../../../models/DietPlan";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  try {
    // Find all diet plans
    const dietPlans = await DietPlan.find();
    
    let updatedCount = 0;
    
    for (const plan of dietPlans) {
      let hasUpdates = false;
      
      // Update image paths for each meal
      const meals = ['breakfast', 'lunch', 'eveningSnack', 'dinner'];
      
      for (const meal of meals) {
        if (plan[meal] && plan[meal].image && plan[meal].image.startsWith('/daywisephoto/')) {
          plan[meal].image = plan[meal].image.replace('/daywisephoto/', '/images/');
          hasUpdates = true;
        }
      }
      
      if (hasUpdates) {
        await plan.save();
        updatedCount++;
      }
    }
    
    res.status(200).json({ 
      success: true, 
      message: `Updated ${updatedCount} diet plans with new image paths`,
      updatedCount 
    });
  } catch (error) {
    console.error("Error updating image paths:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}