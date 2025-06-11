// pages/api/payment/createOrder.js
import Razorpay from "razorpay";
import Payment from "../../../models/Payment";

export default async function handler(req, res) {
  console.log("Create Order API called", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { orderData } = req.body; //orderData.proudcts:[]  , orderdata.subscription: {goagl:,age,mealTimes:[]}, orderData.address , orderData.total

  if (!orderData.total) {
    return res.status(400).json({ error: "Amount is required" });
  }



  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const payment_capture = 1;
    const currency = "INR";
    const options = {
      amount: Math.round(Number(orderData.total) * 100), // amount in paise
      currency,
      payment_capture,
    };

    const order = await razorpay.orders.create(options);

    // Prepare personDetails from address/subscription
    const addr = orderData.address || {};
    const personDetails = {
      name: addr.name || orderData.subscription?.fullName || "",
      number: addr.phone || orderData.subscription?.phone || "",
      email: addr.email || orderData.subscription?.email || "",
      address: {
        street: addr.address || "",
        city: addr.city || "",
        state: addr.state || "",
        country: addr.country || "",
        pincode: addr.postcode || addr.zipCode || "",
      }
    };

    // Explicitly copy all subscription fields to planDetails
    const sub = orderData.subscription || {};
    const planDetails = {
      goal: sub.goal || "",
      dietTechnique: sub.dietTechnique || "",
      heightFeet: sub.heightFeet || "",
      heightInches: sub.heightInches || "",
      weight: sub.weight || "",
      age: sub.age || "",
      gender: sub.gender || "",
      days: sub.days || "",
      mealTimes: sub.mealTimes || [],
      dietType: sub.dietType || "",
      fullName: sub.fullName || "",
      email: sub.email || "",
      phone: sub.phone || "",
      address: sub.address || "",
      city: sub.city || "",
      state: sub.state || "",
      country: sub.country || "",
      zipCode: sub.zipCode || ""
    };

    const payment = new Payment({
      razorpayPaymentId: order.id,
      razorpayOrderId: order.id,
      amount: orderData.total,
      currency: options.currency,
      status: "pending",
      planDetails,
      total: orderData.total,
      paymentDate: new Date(),
      packageName: orderData.packageName || "Diet Plan",
      personDetails,
      products: orderData.products || [],
    });

    console.log("Saving payment with:", JSON.stringify(payment, null, 2));

    await payment.save();
    console.log("Payment record saved:", payment);

    res.status(200).json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({ error: error.message || error });
  }
}