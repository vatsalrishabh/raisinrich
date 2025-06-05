'use client';

import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { X } from 'lucide-react';

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, 'OTP must be 6 digits')
    .max(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must be numeric'),
});

const OtpRegister = ({ registerDetails, onClose }) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
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
      ...registerDetails,
      otp: data.otp,
    };

    try {
      const response = await axios.post('/api/verifyOtp', payload);
      console.log('OTP Verified:', response.data);
      setSuccessMessage('Successfully Registered! Please goto Login Page 🎉');

      // Optional: auto-close modal after 2s
     setTimeout(() => {
  if (onClose) onClose();
  window.location.reload(); // Refresh the page
}, 2000);

    } catch (error) {
      console.error('Verification failed:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'OTP Verification Failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="relative bg-white p-6 md:p-8 lg:p-10 rounded-lg w-full max-w-md mx-4 shadow-xl">
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close OTP Modal"
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <h2 className="text-center text-2xl font-semibold mb-6">Enter OTP</h2>

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

          {errorMessage && (
            <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-green-600 text-sm mb-2">{successMessage}</p>
          )}

          <Controller
            control={control}
            name="otp"
            render={({ field }) => <input type="hidden" {...field} />}
          />

          <button
            type="submit"
            className="w-full bg-[#a10550] text-white font-bold py-2 rounded-lg hover:bg-[#87023f] transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpRegister;
