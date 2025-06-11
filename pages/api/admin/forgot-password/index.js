import dbConnect from "../../../../util/dbConnect";
import User from "../../../../models/User";
import Otp from "../../../../models/Otp";
import bcrypt from "bcryptjs";
import { emailRegistration } from "../../../../util/forgotEmail";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST" && !req.url.endsWith("/reset")) {
    // Step 1: Send OTP
    const { email } = req.body;
    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      return res.status(400).json({ message: "This email is not registered as Admin." });
    }
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove any previous OTPs for this email
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({ email, otp });

    // TODO: Send OTP to email (implement your email sending logic here)
    console.log(`OTP for ${email}: ${otp}`);

    await emailRegistration(email, otp, "Admin Forgot Password");

    return res.status(200).json({ success: true, message: "OTP sent to email" });
  }

  if (req.method === "POST" && req.url.endsWith("/reset")) {
    // Step 2: Reset password
    const { email, otp, password } = req.body;
    const otpDoc = await Otp.findOne({ email, otp });
    if (!otpDoc) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      return res.status(400).json({ message: "This email is not registered as Admin." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    await Otp.deleteMany({ email }); // Remove all OTPs for this email
    return res.status(200).json({ success: true, message: "Password reset successful" });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}