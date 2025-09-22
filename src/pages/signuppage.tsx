"use client";
import React, { useContext } from "react";
import { Typography } from "@mui/material";
import InputField from "@/components/inputfield/custome-input0field";
import CustomButton from "@/components/button/click-button";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/user-context";
import { CircularProgress } from "@mui/material";

// Custom validation function for Sign Up
const validateSignup = (values: {
  name: string;
  email: string;
  password: string;
}) => {
  const errors: { name?: string; email?: string; password?: string } = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

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

const SignupPage = () => {
  const { setUserState } = useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const Signup = async (values: any) => {
    console.log("Signup values:", values);
    setLoading(true);
    try {
      const response = await axios.post("/api/signup", {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      // If successful
      toast.success(response.data.message);
      router.push("/");
    } catch (error: any) {
      if (error.response) {
        // API returned a status code out of 2xx
        router.push("/signup");
        toast.error(error.response.data.error || "Signup failed!");
      } else {
        // Network or other error
        toast.error("Something went wrong!");
        router.push("/signup");
      }
      console.error("Signup error:", error);
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
          <div className="w-full h-[20vh] flex items-center justify-center">
            <Typography textAlign="center" variant="h4" fontWeight="bold">
              Task Manager
            </Typography>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validate={validateSignup}
            onSubmit={(values) => {
              if (values) {
                Signup(values);
              } else {
              }
            }}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form className="w-1/3 bg-white rounded-lg border shadow-lg px-6 py-4 flex flex-col">
                {/* Header */}
                <div className="w-full h-[10vh] flex items-center justify-center p-1">
                  <Typography textAlign="center" variant="h5" fontWeight="bold">
                    Sign Up
                  </Typography>
                </div>

                {/* Name Field */}
                <div className="w-full mb-4">
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Name
                  </label>
                  <Field
                    as={InputField}
                    id="name"
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
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
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
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
                  <CustomButton type="submit" label="Sign Up" />
                </div>

                {/* Footer */}
                <div className="w-full flex flex-col items-center justify-center text-center">
                  <Typography variant="caption">
                    Already have an account?
                  </Typography>
                  <Typography variant="caption">
                    <Link
                      href="/"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Log In
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

export default SignupPage;
