import jsonwebtoken from "jsonwebtoken";
import dbConnect from "../../../util/dbConnect";
import User from "../../../models/User";
import cookie from "cookie";
import bcrypt from "bcryptjs"; // <-- Use bcryptjs for password comparison

//method - @POST - login, 
//admin login,
//api - /admin
const handler = async (req, res) => {
  const { method } = req;
  console.log("Admin API called", req.body);

  if (method === "POST") {
    const { username, password } = req.body;
    await dbConnect();

    // Find the user by email and role
   const test = await User.findOne({
  email: username,
  role: "admin"
});
    console.log("Test User 1:", test);
 const test2 = await User.find();
 console.log("Test User 2:", test2);

console.log("Test User:", test);
    const user = await User.findOne({
      email:username,
      typeOfUser: "admin",
    }).select("+password");

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "This email is not registered as Admin." });
    }

    // Use bcryptjs to compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong Credentials" });
    }

    // Create JWT token
    const token = jsonwebtoken.sign(
      {
        userId: user.userId,
        role: user.role,
        isLoggedIn: true,
        email: user.email,
        mobile: user.mobile,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie kk
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );

    return res.status(200).json({ message: "Success", token });
  }

  if (method === "PUT") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        maxAge: -1,
        path: "/",
      })
    );
    return res.status(200).json({ message: "Success" });
  }

  res.status(405).json({ message: "Method Not Allowed" });
};

export default handler;
