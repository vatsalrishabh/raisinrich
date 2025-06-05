"use client";

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  showLoginForm,
  showRegisterForm,
  showForgotPassForm,
} from '../../redux/login/loginRegisForgotSlice'; // adjusted path

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ForgotPassModal from './ForgotPassModal';

const LRFButton = ({ displayLogin = true, displayRegister = true, displayForgot = true }) => {
  const dispatch = useDispatch();
  const { loginForm, registerForm, forgotPassForm } = useSelector(
    (state) => state.loginRegisForgot
  );

  return (
    <div>
      {/* Trigger Buttons */}
      <div className="flex flex-wrap gap-3 justify-center my-4">
        {displayLogin && (
          <button
            className="bg-[#a10550] text-white px-4 py-2 rounded hover:bg-[#870442] transition"
            onClick={() => dispatch(showLoginForm())}
          >
            Login
          </button>
        )}

        {displayRegister && (
          <button
            className="bg-[#a10550] text-white px-4 py-2 rounded hover:bg-[#870442] transition"
            onClick={() => dispatch(showRegisterForm())}
          >
            Register
          </button>
        )}

        {displayForgot && (
          <button
            className="bg-[#a10550] text-white px-4 py-2 rounded hover:bg-[#870442] transition"
            onClick={() => dispatch(showForgotPassForm())}
          >
            Forgot Password
          </button>
        )}
      </div>

      {/* Modals */}
      {loginForm && <LoginModal />}
      {registerForm && <RegisterModal />}
      {forgotPassForm && <ForgotPassModal />}
    </div>
  );
};

export default LRFButton;
