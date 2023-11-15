import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Register.css";

function Register() {
  const [succesfulCreation, setSuccessfulCreation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (succesfulCreation) {
      toast.success(
        "You have successfully registered! Now add your position and pay rate."
      );
    }
  }, [succesfulCreation]);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First Name should be at least 2 characters")
      .max(32, "First Name should not exceed 32 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(2, "Last Name should be at least 2 characters")
      .max(32, "Last Name should not exceed 32 characters")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .max(256, "Password should not exceed 256 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
        "Password must contain at least one uppercase letter, one special character, and one number"
      )
      .required("Password is required"),
    confirmedPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:8000/api/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            if (data.message === "Email already taken") {
              formik.setFieldError("emailTaken", true);
              toast.error("Email already taken, please try again!");
            } else {
              const jwtToken = data.jwt; // Assuming the response contains a field named "jwt" with the JWT token.
              localStorage.setItem("jwt", jwtToken); // Store the JWT token in the localStorage.
              localStorage.setItem("jwt-exp", Date.now() + 2 * 60 * 60 * 1000); // expiration is checked in Navbar component

              setSuccessfulCreation(true);

              setTimeout(() => navigate("/addEmployee"), 2000);
              console.log("User was created");
            }
          });
      } catch (error) {
        console.error("Error:", error);

        if (error.status === 505) {
          console.log("Email already taken");

          if (formik.values.email === values.email) {
            setSuccessfulCreation(false);
          }
        }
      }
    },
  });

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="form-page">
      <div id="error messages">
        {/* {formik.errors.emailTaken ? (
          <p className="text-red-500 text-center mb-2">
            {toast.error(
              "The email you entered is already in use. Please try Again!"
            )}
          </p>
        ) : null} */}
      </div>
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="error-message">{formik.errors.firstName}</div>
          )}

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="error-message">{formik.errors.lastName}</div>
          )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="youremail@gmail.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}

          <label htmlFor="confirmedPassword">Confirm Password</label>
          <input
            id="confirmedPassword"
            name="confirmedPassword"
            type="password"
            placeholder="********"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmedPassword}
          />
          {formik.touched.confirmedPassword &&
            formik.errors.confirmedPassword && (
              <div className="error-message">
                {formik.errors.confirmedPassword}
              </div>
            )}

          <button type="submit">Register</button>
        </form>
      </div>

      <button className="link-btn" onClick={goToLogin}>
        Already have an account? Login here.
      </button>
      <ToastContainer />
    </div>
  );
}

export default Register;
