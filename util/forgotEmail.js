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

export const emailRegistration = (to, otp, subject) => {
  const mailOptions = {
    from: process.env.Nodemailer_Email,
    to,
    subject,
    html: `
      <div style="background: #18181b; color: #fafafa; font-family: 'Segoe UI', Arial, sans-serif; border-radius: 12px; box-shadow: 0 4px 24px #00000040; padding: 32px 24px; max-width: 420px; margin: 40px auto;">
        <div style="text-align: center;">
          <img src="https://raisinrich.com/logo-dark.png" alt="Raisinrich Logo" style="width: 80px; margin-bottom: 16px;" />
        </div>
        <h2 style="color: #fbbf24; text-align: center; margin-bottom: 8px;">Welcome to Raisinrich!</h2>
        <p style="font-size: 16px; margin-bottom: 16px;">Dear Customer,</p>
        <p style="font-size: 15px; margin-bottom: 18px;">
          Thank you for choosing <span style="color: #fbbf24; font-weight: 600;">Raisinrich</span>.<br/>
          Use the OTP below to verify your request:
        </p>
        <div style="text-align: center; margin: 28px 0;">
          <span style="display: inline-block; background: #27272a; color: #fbbf24; font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 16px 32px; border-radius: 8px; box-shadow: 0 2px 8px #00000030;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #a3a3a3; margin-bottom: 18px;">
          This OTP is valid for 10 minutes. Please do not share it with anyone.
        </p>
        <p style="font-size: 14px; color: #fbbf24; text-align: right; margin-top: 32px;">
          — The Raisinrich Team
        </p>
      </div>
    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
  });
};