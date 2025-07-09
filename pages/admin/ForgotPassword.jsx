import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { toast } from "react-toastify";
import { useState } from "react";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const ForgotPassword = ({ setShowForgot }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailDisabled, setEmailDisabled] = useState(false);

  // Step 1: Email form
  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `/api/admin/forgot-password`,
          { email: values.email }
        );
        if (
          res.status === 200 &&
          (res.data.success || res.data.message === "OTP sent to email")
        ) {
          toast.success("OTP sent to your email!");
          setEmail(values.email);
          setEmailDisabled(true);
          setStep(2);
        } else {
          toast.error(res.data.message || "Something went wrong");
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to send OTP. Try again."
        );
      }
    },
  });

  // Step 2: OTP and password form
  const otpFormik = useFormik({
    initialValues: { otp: "", password: "", confirmPassword: "" },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^\d{6}$/, "OTP must be 6 digits")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, actions) => {
      try {
        const res = await axios.post(
          `/api/admin/forgot-password/reset`,
          {
            email,
            otp: values.otp,
            password: values.password,
          }
        );
        if (
          res.status === 200 &&
          (res.data.success || res.data.message === "Password reset successful")
        ) {
          actions.resetForm();
          toast.success("Admin Login Success!");
          setTimeout(() => push("/admin/profile"), 500); // 0.5s delay
        } else {
          toast.error(res.data.message || "Failed to reset password");
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to reset password. Try again."
        );
      }
    },
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative bg-[#18181b] text-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4"
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-3xl text-gray-400 hover:text-red-400 transition-colors"
            onClick={() => setShowForgot && setShowForgot(false)}
            aria-label="Close"
            type="button"
          >
            <IoMdClose />
          </button>

          <form
            className="flex flex-col items-center"
            onSubmit={step === 1 ? emailFormik.handleSubmit : otpFormik.handleSubmit}
          >
            <Title addClass="text-[32px] mb-6 text-center text-yellow-400 font-dancing">
              Admin Forgot Password
            </Title>
            <div className="flex flex-col gap-y-4 w-full">
              {/* Step 1: Email */}
              <Input
                name="email"
                type="email"
                placeholder="Your Admin Email"
                hidden={step !== 1}
                value={emailDisabled ? email : emailFormik.values.email}
                errorMessage={emailFormik.errors.email}
                touched={emailFormik.touched.email}
                onChange={emailFormik.handleChange}
                onBlur={emailFormik.handleBlur}
                disabled={emailDisabled}
                className="bg-[#23232b] text-white border border-[#333] focus:border-yellow-400 text-lg py-3 rounded-lg h-12"
              />
              {/* Step 2: OTP and new password */}
              {step === 2 && (
                <>
                  <Input
                    name="otp"
                    type="text"
                    placeholder="6-digit OTP"
                    value={otpFormik.values.otp}
                    errorMessage={otpFormik.errors.otp}
                    touched={otpFormik.touched.otp}
                    onChange={otpFormik.handleChange}
                    onBlur={otpFormik.handleBlur}
                    maxLength={6}
                    inputMode="numeric"
                    pattern="\d*"
                    className="bg-[#23232b] text-white border border-[#333] focus:border-yellow-400 text-lg py-3 rounded-lg h-12"
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="New Password (min 6 chars)"
                    value={otpFormik.values.password}
                    errorMessage={otpFormik.errors.password}
                    touched={otpFormik.touched.password}
                    onChange={otpFormik.handleChange}
                    onBlur={otpFormik.handleBlur}
                    className="bg-[#23232b] text-white border border-[#333] focus:border-yellow-400 text-lg py-3 rounded-lg h-12"
                  />
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm New Password"
                    value={otpFormik.values.confirmPassword}
                    errorMessage={otpFormik.errors.confirmPassword}
                    touched={otpFormik.touched.confirmPassword}
                    onChange={otpFormik.handleChange}
                    onBlur={otpFormik.handleBlur}
                    className="bg-[#23232b] text-white border border-[#333] focus:border-yellow-400 text-lg py-3 rounded-lg h-12"
                  />
                </>
              )}
            </div>
            <div className="flex flex-col w-full gap-y-3 mt-8">
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: "#fbbf24", color: "#18181b" }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary bg-yellow-400 text-[#18181b] font-bold py-2 rounded-lg shadow-md transition-all"
                type="submit"
              >
                {step === 1 ? "Send OTP" : "Reset Password"}
              </motion.button>
              <Link href="/">
                <span className="text-sm underline cursor-pointer text-yellow-400 hover:text-yellow-300 transition">
                  Home Page
                </span>
              </Link>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ForgotPassword;
