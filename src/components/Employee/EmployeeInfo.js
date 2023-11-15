import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import * as Yup from "yup"; // Import Yup
import { useFormik } from "formik"; // Import useFormik from formik library
import "../Register.css";

function AddEmployee() {
  const navigate = useNavigate();

  const [successfulCreation, setSuccessfulCreation] = useState(false);

  const formik = useFormik({
    initialValues: {
      position: "",
      payRate: "",
    },
    validationSchema: Yup.object({
      position: Yup.string().required("Please fill out the position field"),
      payRate: Yup.string().required("Please fill out the pay rate field"),
    }),
    onSubmit: async (values) => {
      try {
        const userRequest = await axios.post(
          "http://localhost:8000/api/add-employee-info/",
          {
            jwt: localStorage.getItem("jwt"),
            position: values.position,
            pay_rate: values.payRate,
          }
        );

        console.log(userRequest.data);
        console.log(values.position);
        console.log(values.payRate);

        setSuccessfulCreation(true);

        // Clear the input fields after successful registration
        formik.resetForm();
        setTimeout(() => navigate("/dashboard"), 2000);
        console.log("User was created");
        toast.success("Employee was successfully created!");
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          const responseData = error.response.data;

          console.log(responseData.message);
          console.log(status);

          if (responseData.message === "Email already taken") {
            console.log("Email already taken");
            toast.error("Email already taken");
          }

          if (status === 500) {
            if (values.payRate > 1000) {
              toast.error("Enter a Pay Rate less than 1000");
              console.log("Enter in a pay rate less than 1000");
            }

            if (values.position === "" || values.payRate === "") {
              toast.error("Please fill out all the fields");
            }

            formik.resetForm();
          } else if (status === 505) toast.error("Enter a valid pay rate");
        }
      }
    },
  });

  return (
    <div className="form-page">
      <div className="auth-form-container">
        <h2>Add Your Info</h2>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <label htmlFor="position">Position</label>
          <input
            id="position"
            name="position"
            type="text"
            placeholder="Position"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.position}
          />
          {formik.touched.position && formik.errors.position && (
            <div className="error-message">{formik.errors.position}</div>
          )}

          <label htmlFor="payRate">Pay Rate</label>
          <input
            id="payRate"
            name="payRate"
            type="text"
            placeholder="Pay Rate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.payRate}
          />
          {formik.touched.payRate && formik.errors.payRate && (
            <div className="error-message">{formik.errors.payRate}</div>
          )}

          <button type="submit">Register</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddEmployee;
