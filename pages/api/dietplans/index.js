import DietPlan from "../../../models/DietPlan";   
export default async function handler(req, res) {
    console.log("Diet Plans API called", req.body);
    
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    
    try {
        const dietPlans = await DietPlan.find().lean();
        return res.status(200).json({ success: true, dietPlans });
    } catch (error) {
        console.error("Error fetching diet plans:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
    }