"use client";
import React, { useState } from "react";
import "../Component.css";
import { useDispatch } from "react-redux";
import {
  hideAllForms,
  showRegisterForm,
  showForgotPassForm,
} from "../../redux/login/loginRegisForgotSlice";
import { X, Eye, EyeOff } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginModal = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleClose = () => dispatch(hideAllForms());
  const handleShowRegister = () => dispatch(showRegisterForm());
  const handleShowForgotPass = () => dispatch(showForgotPassForm());

  const onSubmit = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post("/api/loginUser", data);
      const { token, user } = response.data;
      // Merge token and user into one object
    const userDetails = {
      ...user,
      token,
    };

    // Save merged object to localStorage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    console.log("Saved userDetails:", userDetails);
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        handleClose(); // Close modal
        window.location.reload();  // Refresh page
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.message || "Failed to login. Try again.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="relative bg-white p-6 md:p-8 lg:p-10 rounded-lg w-full max-w-md mx-4 shadow-xl">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`bg-[#f48cb79c] p-3 rounded w-full outline-none placeholder:text-gray-600 ${
              errors.email ? "border border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className={`bg-[#f48cb79c] p-3 rounded w-full outline-none placeholder:text-gray-600 ${
                errors.password ? "border border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}

          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-green-600 text-sm mt-2">{successMessage}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#a10550] text-white font-bold py-2 rounded-lg hover:bg-[#870442] transition-colors duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <button
            onClick={handleShowRegister}
            className="text-[#a10550] hover:underline"
            type="button"
          >
            Not registered?
          </button>
          <button
            onClick={handleShowForgotPass}
            className="text-[#a10550] hover:underline"
            type="button"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
