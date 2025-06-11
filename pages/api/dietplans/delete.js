import DietPlan from "../../../models/DietPlan";

export default async function handler(req, res) {
  console.log("Delete Diet Plan API called", req.body);

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID parameter is required" });
  }

  try {
    const deletedDietPlan = await DietPlan.findByIdAndDelete(id);

    if (!deletedDietPlan) {
      return res.status(404).json({ error: "Diet plan not found" });
    }

    return res.status(200).json({ success: true, message: "Diet plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting diet plan:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
