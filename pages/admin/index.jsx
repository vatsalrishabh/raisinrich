import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { adminSchema } from "../../schema/admin";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const { push } = useRouter();
  const [showForgot, setShowForgot] = useState(false);

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `/api/admin`,
        values
      );
      if (res.data.message === "This email is not registered as Admin.") {
        toast.error("This email is not registered as Admin.");
        return;
      }
      if (res.data.message === "Wrong Credentials") {
        toast.error("Wrong Credentials");
        return;
      }
      if (res.data.message === "Success") {
        console.log("Login successful:", res.data);
        document.cookie = `token=${res.data.token}; path=/; max-age=3600; secure; samesite=strict`;
      }

      // After successful login:
      if (res.status === 200 && res.data.token) {
        actions.resetForm();
        toast.success("Admin Login Success!");
        localStorage.setItem("admin_token", res.data.token);
        push("/admin/profile");
      }
    } catch (err) {
      toast.error(`error: ${err.response.data.message}`);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit,
      validationSchema: adminSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Your Username",
      value: values.username,
      errorMessage: errors.username,
      touched: touched.username,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
    <div className="container mx-auto py-3 flex h-screen items-center justify-center relative">
      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-2xl font-bold text-gray-500 hover:text-red-500"
              onClick={() => setShowForgot(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <ForgotPassword setShowForgot={setShowForgot} />
          </div>
        </div>
      )}

      {/* Login Form */}
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Admin Login</Title>
        <div className="flex flex-col gap-y-3 w-full">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="flex flex-col w-full gap-y-3 mt-6">
          <button className="btn-primary">LOGIN</button>
          <button
            type="button"
            className="text-sm underline text-blue-600 hover:text-blue-800 transition"
            onClick={() => setShowForgot(true)}
          >
            Forgot Password?
          </button>
          <Link href="/" className="text-sm underline text-secondary text-center">
            Home Page
          </Link>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token === process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
