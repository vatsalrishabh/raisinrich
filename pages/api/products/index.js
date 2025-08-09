import Product from "../../../models/Product";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      // Mock data for development when database is not available
      const mockProducts = [
        {
          _id: "1",
          title: "Balanced Diet Plan",
          desc: "Complete balanced meal plan for healthy living",
          prices: [1500, 2500, 3500],
          category: "Balanced Diet",
          img: "/images/balanced-diet.jpg",
          extraOptions: [
            { text: "Extra Protein", price: 200 },
            { text: "Gluten Free", price: 150 },
          ],
        },
        {
          _id: "2",
          title: "Keto Diet Plan",
          desc: "Low-carb high-fat diet for weight loss",
          prices: [1800, 2800, 3800],
          category: "Keto Diet",
          img: "/images/keto-diet.jpg",
          extraOptions: [
            { text: "Extra Fat", price: 250 },
            { text: "No Dairy", price: 100 },
          ],
        },
        {
          _id: "3",
          title: "Detox Diet Plan",
          desc: "Cleansing diet for body detoxification",
          prices: [1200, 2200, 3200],
          category: "Detox Diet",
          img: "/images/detox-diet.jpg",
          extraOptions: [
            { text: "Extra Greens", price: 180 },
            { text: "No Sugar", price: 120 },
          ],
        },
      ];

      // Try to get real data first, fallback to mock data
      let products;
      try {
        products = await Product.find();
        if (!products || products.length === 0) {
          products = mockProducts;
        }
      } catch (err) {
        console.log("Using mock products data:", err.message);
        products = mockProducts;
      }
      
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  if (method === "POST") {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to create product" });
    }
  }
};

export default handler;
