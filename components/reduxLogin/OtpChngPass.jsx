'use client';

import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { X } from 'lucide-react';

const schema = z.object({
  otp: z
    .string()
    .min(6, 'OTP must be 6 digits')
    .max(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must be numeric'),
  newPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const OtpChngPass = ({ email, onClose }) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const inputsRef = useRef([]);

  const handleOtpChange = (e, index) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const currentOtp = getValues('otp').split('');
      currentOtp[index] = val;
      setValue('otp', currentOtp.join(''));
      if (val && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const onSubmit = async (data) => {
    setErrorMessage('');
    setSuccessMessage('');

    const payload = {
      email,
      otp: data.otp,
      newPassword: data.newPassword,
    };

    try {
      const response = await axios.post('/api/resetPasswordWithOtp', payload);
      setSuccessMessage('Password Reset Successful! Please log in.');
      
      setTimeout(() => {
        if (onClose) onClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Password Reset Failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="relative bg-white p-6 md:p-8 lg:p-10 rounded-lg w-full max-w-md mx-4 shadow-xl">
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <h2 className="text-center text-2xl font-semibold mb-6">Reset Password</h2>

          <div className="flex justify-between gap-2 mb-3">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                maxLength={1}
                type="text"
                inputMode="numeric"
                className="w-10 h-12 text-center rounded bg-[#f48cb79c] outline-none text-lg"
                ref={(el) => (inputsRef.current[i] = el)}
                onChange={(e) => handleOtpChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            ))}
          </div>

          {errors.otp && (
            <p className="text-red-600 text-sm mb-2">{errors.otp.message}</p>
          )}

          <Controller
            control={control}
            name="otp"
            render={({ field }) => <input type="hidden" {...field} />}
          />

          <div className="mb-3">
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                  {...field}
                />
              )}
            />
            {errors.newPassword && (
              <p className="text-red-600 text-sm">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="mb-3">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-green-600 text-sm mb-2">{successMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#a10550] text-white font-bold py-2 rounded-lg hover:bg-[#87023f] transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpChngPass;
