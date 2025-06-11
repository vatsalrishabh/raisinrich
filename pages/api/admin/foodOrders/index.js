import Payment from "../../../../models/Payment";

export default async function handler(req, res) {
  console.log("Food Orders API called", req.body);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check for admin role in the request (e.g., from query or body)
  const { role } = req.query; // or use req.body if sent in body

  if (role !== "admin") {
    return res.status(401).json({ success: false, error: "You are not authorised" });
  }

  try {
    const orders = await Payment.find().lean();
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}