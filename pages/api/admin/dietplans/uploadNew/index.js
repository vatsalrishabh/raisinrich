import dbConnect from "../../../../../util/dbConnect";
import DietPlan from "../../../../../models/DietPlan";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Ensure images directory exists
const uploadDir = path.join(process.cwd(), "public", "images");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
    console.log("Diet Plan Upload API called");
    console.log("Request Method:", req);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  const form = formidable({
    multiples: true,
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part, form) => {
      // Unique filename: mealKey-timestamp-random.ext
      const mealKey = part.name.replace("[image]", "");
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return `${mealKey}-${unique}${ext}`;
    },
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Form parse error" });
    }

    // Helper to get image url or empty string
    const getImageUrl = (mealKey) => {
      const file = files[`${mealKey}[image]`];
      if (!file) return "";
      const f = Array.isArray(file) ? file[0] : file;
      return f ? `/images/${path.basename(f.filepath || f.path)}` : "";
    };

    // Helper for top-level fields
    const getField = (key) =>
      Array.isArray(fields[key]) ? fields[key][0] : fields[key] || "";

    // Parse meal data from fields
    const getMeal = (mealKey) => ({
      name: Array.isArray(fields[`${mealKey}[name]`]) ? fields[`${mealKey}[name]`][0] : fields[`${mealKey}[name]`] || "",
      image: getImageUrl(mealKey),
      description: Array.isArray(fields[`${mealKey}[description]`]) ? fields[`${mealKey}[description]`][0] : fields[`${mealKey}[description]`] || "",
      protein: Number(Array.isArray(fields[`${mealKey}[protein]`]) ? fields[`${mealKey}[protein]`][0] : fields[`${mealKey}[protein]`] || 0),
      carbs: Number(Array.isArray(fields[`${mealKey}[carbs]`]) ? fields[`${mealKey}[carbs]`][0] : fields[`${mealKey}[carbs]`] || 0),
      fats: Number(Array.isArray(fields[`${mealKey}[fats]`]) ? fields[`${mealKey}[fats]`][0] : fields[`${mealKey}[fats]`] || 0),
      calories: Number(Array.isArray(fields[`${mealKey}[calories]`]) ? fields[`${mealKey}[calories]`][0] : fields[`${mealKey}[calories]`] || 0),
    });

    const dietPlan = new DietPlan({
      day: getField("day"),
      type: getField("type"),
      category: getField("category"),
      breakfast: getMeal("breakfast"),
      lunch: getMeal("lunch"),
      eveningSnack: getMeal("eveningSnack"),
      dinner: getMeal("dinner"),
    });

    await dietPlan.save();

    res.status(201).json({ message: "Diet plan created", dietPlan });
  });
}