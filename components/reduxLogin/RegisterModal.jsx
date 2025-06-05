'use client';
import React, { useState } from 'react';
import '../Component.css';
import { useDispatch } from 'react-redux';
import {
  hideAllForms,
  showLoginForm,
  showForgotPassForm,
} from '../../redux/login/loginRegisForgotSlice';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import OtpRegister from './OtpRegister'; // ✅ Import OTP modal

// Zod schema
const registerSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().length(10, 'Phone number must be exactly 10 digits').regex(/^\d+$/, 'Phone must contain only digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  gender: z.string().min(1, 'Gender is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  streetAddress: z.string().min(1, 'Street Address is required'),
});

const RegisterModal = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [otpStep, setOtpStep] = useState(false); // ✅ Controls OTP modal
  const [currentUserData, setCurrentUserData] = useState(null); // ✅ Holds form data

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleClose = () => {
    dispatch(hideAllForms());
  };

  const handleShowLogin = () => {
    dispatch(showLoginForm());
  };

  const handleShowForgotPass = () => {
    dispatch(showForgotPassForm());
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/api/register', data); // ✅ Replace with your endpoint
      if (res.data?.success) {
        setCurrentUserData(data); // ✅ Save for OTP modal
        setOtpStep(true); // ✅ Show OTP modal
      } else {
        alert(res.data?.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please try again.');
    }
  };

  if (otpStep) {
    // ✅ Show OTP modal instead
    return <OtpRegister registerDetails={currentUserData} />;
  }

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

        <h2 className="text-center text-2xl font-semibold mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <input
            type="text"
            placeholder="Full Name"
            className={`bg-[#f48cb79c] p-3 rounded w-full outline-none placeholder:text-gray-600 ${
              errors.fullName ? 'border border-red-500' : ''
            }`}
            {...register('fullName')}
          />
          {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName.message}</p>}

          <input
            type="email"
            placeholder="Email"
            className={`bg-[#f48cb79c] p-3 rounded w-full outline-none placeholder:text-gray-600 ${
              errors.email ? 'border border-red-500' : ''
            }`}
            {...register('email')}
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

          <input
            type="tel"
            placeholder="Phone"
            className={`bg-[#f48cb79c] p-3 rounded w-full outline-none placeholder:text-gray-600 ${
              errors.phone ? 'border border-red-500' : ''
            }`}
            {...register('phone')}
          />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}

          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={`bg-[#f48cb79c] p-3 rounded w-full outline-none placeholder:text-gray-600 pr-10 ${
                errors.password ? 'border border-red-500' : ''
              }`}
              {...register('password')}
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>

          <select
            className={`bg-[#f48cb79c] p-3 rounded w-full outline-none placeholder:text-gray-600 ${errors.gender ? 'border border-red-500' : ''}`}
            {...register('gender')}
            defaultValue=""
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-600 text-sm">{errors.gender.message}</p>}

          <input
            type="text"
            placeholder="State"
            className={`bg-[#f48cb79c] p-3 rounded w-full outline-none placeholder:text-gray-600 ${errors.state ? 'border border-red-500' : ''}`}
            {...register('state')}
          />
          {errors.state && <p className="text-red-600 text-sm">{errors.state.message}</p>}

          <input
            type="text"
            placeholder="City"
            className={`bg-[#f48cb79c] p-3 rounded w-full outline-none placeholder:text-gray-600 ${errors.city ? 'border border-red-500' : ''}`}
            {...register('city')}
          />
          {errors.city && <p className="text-red-600 text-sm">{errors.city.message}</p>}

          <input
            type="text"
            placeholder="Street Address"
            className={`bg-[#f48cb79c] p-3 rounded w-full outline-none placeholder:text-gray-600 ${errors.streetAddress ? 'border border-red-500' : ''}`}
            {...register('streetAddress')}
          />
          {errors.streetAddress && <p className="text-red-600 text-sm">{errors.streetAddress.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#a10550] text-white font-bold py-2 rounded-lg hover:bg-[#870442] transition-colors duration-300 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <button onClick={handleShowLogin} className="text-[#a10550] hover:underline" type="button">
            Already have an account?
          </button>
          <button onClick={handleShowForgotPass} className="text-[#a10550] hover:underline" type="button">
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
