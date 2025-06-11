import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // expires in 10 min
});

export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);