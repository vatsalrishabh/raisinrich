"use client";
import React, { useState } from 'react';
import '../Component.css';
import { useDispatch } from 'react-redux';
import {
  hideAllForms,
  showLoginForm,
  showRegisterForm,
} from '../../redux/login/loginRegisForgotSlice';
import { X } from 'lucide-react';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import OtpChngPass from './OtpChngPass';

const forgotPassSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

const ForgotPassModal = () => {
  const [showOtpModal, setShowOtpModal] = useState(false); // default false
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPassSchema),
  });

const onSubmit = async (data) => {
  try {
    const response = await axios.post('/api/forgotPass', { email: data.email });

    if (response.status === 200 && response.data.success) {
      console.log("OTP sent successfully to:", data.email);
      setEmail(data.email);  // Save email here
      setShowOtpModal(true); // show OTP modal
    } else {
      alert(response.data.message || "Something went wrong.");
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    const message = error.response?.data?.message || "Failed to send OTP";
    alert(message);
  }
};

  const handleClose = () => dispatch(hideAllForms());
  const handleShowLogin = () => dispatch(showLoginForm());
  const handleShowRegister = () => dispatch(showRegisterForm());

  if (showOtpModal) return <OtpChngPass email={email} />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="relative bg-white p-6 md:p-8 lg:p-10 rounded-lg w-full max-w-md mx-4 shadow-xl">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center text-2xl font-semibold mb-6">Forgot Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <input
            type="email"
            placeholder="Enter your registered Email"
            className={`bg-[#f48cb79c] p-3 rounded w-full outline-none placeholder:text-gray-600
              ${errors.email ? "border border-red-500" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#a10550] text-white font-bold py-2 rounded-lg hover:bg-[#870442] transition-colors duration-300 disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <button
            onClick={handleShowLogin}
            className="text-[#a10550] hover:underline"
            type="button"
          >
            Remembered? Login
          </button>
          <button
            onClick={handleShowRegister}
            className="text-[#a10550] hover:underline"
            type="button"
          >
            New user? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassModal;
