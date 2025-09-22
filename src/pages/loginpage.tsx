"use client";
import React from "react";
import { Typography } from "@mui/material";
import InputField from "@/components/inputfield/custome-input0field";
import CustomButton from "@/components/button/click-button";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { CircularProgress } from "@mui/material";
// Custom validation function
const validateLogin = (values: { email: string; password: string }) => {
  const errors: { email?: string; password?: string } = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
};

const LoginPage = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/login", {
        email: values.email,
        password: values.password,
      });
      router.push("/dashboard");
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      {/* Title */}
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <CircularProgress size={60} />
        </div>
      ) : (
        <>
          <div className="w-full h-[30vh] flex items-center justify-center">
            <Typography textAlign="center" variant="h4" fontWeight="bold">
              Task Manager
            </Typography>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={validateLogin}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form className="w-1/3 bg-white rounded-lg border shadow-lg px-6 py-4 flex flex-col">
                {/* Header */}
                <div className="w-full h-[10vh] flex items-center justify-center p-1">
                  <Typography textAlign="center" variant="h5" fontWeight="bold">
                    Log In
                  </Typography>
                </div>

                {/* Email Field */}
                <div className="w-full mb-4">
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Email
                  </label>
                  <Field
                    as={InputField}
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="w-full mb-4">
                  <label htmlFor="password" className="block mb-1 font-medium">
                    Password
                  </label>
                  <Field
                    as={InputField}
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="w-full mb-4">
                  <CustomButton type="submit" label="Log In" />
                </div>

                {/* Footer */}
                <div className="w-full flex flex-col items-center justify-center text-center">
                  <Typography variant="caption">Forget password</Typography>
                  <Typography variant="caption">
                    Don’t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default LoginPage;
