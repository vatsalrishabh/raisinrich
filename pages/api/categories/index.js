import Category from "../../../models/Category";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      // Mock data for development when database is not available
      const mockCategories = [
        {
          _id: "1",
          title: "Balanced Diet",
          desc: "Complete balanced meal plans",
          img: "/images/balanced-diet.jpg",
        },
        {
          _id: "2",
          title: "Keto Diet",
          desc: "Low-carb high-fat diet plans",
          img: "/images/keto-diet.jpg",
        },
        {
          _id: "3",
          title: "Detox Diet",
          desc: "Cleansing and detox diet plans",
          img: "/images/detox-diet.jpg",
        },
        {
          _id: "4",
          title: "High Protein",
          desc: "Protein-rich diet plans for muscle building",
          img: "/images/balanced-diet.jpg",
        },
      ];

      // Try to get real data first, fallback to mock data
      let categories;
      try {
        categories = await Category.find();
        if (!categories || categories.length === 0) {
          categories = mockCategories;
        }
      } catch (err) {
        console.log("Using mock categories data:", err.message);
        categories = mockCategories;
      }
      
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  }

  if (method === "POST") {
    try {
      const newCategory = await Category.create(req.body);
      res.status(200).json(newCategory);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to create category" });
    }
  }
};

export default handler;
