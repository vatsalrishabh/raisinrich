import dbConnect from "../../../../../util/dbConnect";
import User from "../../../../../models/User";
import Otp from "../../../../../models/Otp";
import bcrypt from "bcryptjs";


export default async function handler(req, res) {
  await dbConnect();


  if (req.method === "POST") {
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
    console.log(`Password reset for ${user}`);
    
    // Remove OTP after successful password reset
    await Otp.deleteMany({ email }); // Remove all OTPs for this email
    return res.status(200).json({ success: true, message: "Password reset successful" });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}