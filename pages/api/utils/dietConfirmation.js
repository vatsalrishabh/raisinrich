// File: /utils/emailRegistration.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Nodemailer_Email,
    pass: process.env.Nodemailer_Pass,
  },
});

const verifyTransporter = () => {
  return new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.error("Transporter verification failed:", error);
        reject(error);
      } else {
        console.log("Email transporter verified.");
        resolve(success);
      }
    });
  });
};

verifyTransporter().catch(err => console.error("Transporter Error:", err));

export const sendDietConfirmationEmail = (to, order, subject = "Your Raisinrich Diet Plan Order Confirmation") => {
  const sub = order.subscription || {};
  const address = order.address || {};
  const mealTimes = Array.isArray(sub.mealTimes) ? sub.mealTimes.join(", ") : "";

  const html = `
    <div style="font-family: Arial, sans-serif; color: #23232b; background: #fffbe7; border-radius: 12px; border: 2px solid #FFD600; max-width: 600px; margin: 0 auto; padding: 32px;">
      <h2 style="color: #FF9800; text-align: center; margin-bottom: 16px;">Thank you for your order, ${sub.fullName || address.name || "Customer"}!</h2>
      <p style="font-size: 16px; color: #333;">We have received your diet plan order and payment. Here are your details:</p>
      <div style="background: #fffde7; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #ffe082;">
        <h3 style="color: #FF9800; margin-bottom: 8px;">Plan & Personal Details</h3>
        <ul style="list-style: none; padding: 0; color: #444;">
          <li><b>Goal:</b> ${sub.goal}</li>
          <li><b>Diet Technique:</b> ${sub.dietTechnique}</li>
          <li><b>Diet Type:</b> ${sub.dietType}</li>
          <li><b>Duration:</b> ${sub.days}</li>
          <li><b>Meal Times:</b> ${mealTimes}</li>
          <li><b>Height:</b> ${sub.heightFeet}' ${sub.heightInches}"</li>
          <li><b>Weight:</b> ${sub.weight} kg</li>
          <li><b>Age:</b> ${sub.age}</li>
          <li><b>Gender:</b> ${sub.gender}</li>
        </ul>
        <h3 style="color: #FF9800; margin: 16px 0 8px;">Contact & Address</h3>
        <ul style="list-style: none; padding: 0; color: #444;">
          <li><b>Name:</b> ${sub.fullName || address.name}</li>
          <li><b>Email:</b> ${sub.email || address.email}</li>
          <li><b>Phone:</b> ${sub.phone || address.phone}</li>
          <li><b>Address:</b> ${sub.address || address.address}, ${sub.city || address.city}, ${sub.state || address.state}, ${sub.country || address.country} - ${sub.zipCode || address.postcode}</li>
        </ul>
        <h3 style="color: #FF9800; margin: 16px 0 8px;">Order & Payment</h3>
        <ul style="list-style: none; padding: 0; color: #444;">
          <li><b>Order Amount:</b> ₹${order.total}</li>
          <li><b>Razorpay Payment ID:</b> ${order.razorpay_payment_id}</li>
          <li><b>Razorpay Order ID:</b> ${order.razorpay_order_id}</li>
        </ul>
      </div>
      <p style="font-size: 15px; color: #333;">Our team will contact you soon to start your personalized diet journey.<br>
      If you have any questions, reply to this email or contact us via our website.</p>
      <p style="color: #888; font-size: 13px; text-align: center; margin-top: 32px;">— The Raisinrich Team</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.Nodemailer_Email,
    to,
    // cc: process.env.Nodemailer_Email, // CC to the admin email
    // bcc: process.env.Nodemailer_Email, // BCC to the admin email
    subject,
    html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Diet confirmation email sent:", info.response);
        resolve(info);
      }
    });
  });
};