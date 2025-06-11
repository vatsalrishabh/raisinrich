import crypto from "crypto";
import Payment from "../../../models/Payment";
import { sendDietConfirmationEmail } from "../utils/dietConfirmation";

export default async function handler(req, res) {
  console.log("Verify Payment API called", req.body);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing payment details" });
  }

  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  // Create expected signature
  const generated_signature = crypto
    .createHmac("sha256", key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  const paymentData = req.body; // This is your "order" object

  // Remove the if (generated_signature === razorpay_signature) { ... } else { ... }
  // Instead, handle both success and failure with a single check and return

  let updateStatus = "failed";
  let response = { success: false, error: "Invalid signature" };

  if (generated_signature === razorpay_signature) {
    updateStatus = "paid";
    response = { success: true, message: "Payment verified" };
  }

  const updated = await Payment.findOneAndUpdate(
    { razorpayPaymentId: razorpay_payment_id },
    {
      status: updateStatus,
      razorpayOrderId: razorpay_order_id,
      updatedAt: new Date(),
    },
    { new: true }
  );

  if (updateStatus === "paid") {
    // Payment is verified, send confirmation email
    await sendDietConfirmationEmail(
      paymentData.subscription.email,
      paymentData,
      "Your Raisinrich Diet Plan Order Confirmation"
    );
  }

  return res.status(updateStatus === "paid" ? 200 : 400).json(response);
}