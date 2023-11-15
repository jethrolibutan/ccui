import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import "./EditPassword.css";
import { Toast } from "bootstrap";

export default function EditPassword(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [response, setResponse] = useState("");
  const [correct, setCorrect] = useState(false);

  const navigate = useNavigate();

  // getting user info
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = "http://localhost:8000/api/get-user-info/";

      // Retrieve the JWT token from localStorage
      const jwtToken = localStorage.getItem("jwt");

      // Data to be sent in the request body
      const requestData = {
        jwt: jwtToken,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      };

      try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        setPassword(data[0].password);
        setEmail(data[0].email);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const changePassword = async () => {
    const apiUrl = "http://localhost:8000/api/change-password/";

    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwt");

    // Data to be sent in the request body
    const requestData = {
      jwt: jwtToken,
      email: email,
      password: formik.values.password,
      new_password: formik.values.newPassword,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      console.log(data);
      formik.setValues({
        password: "",
        newPassword: "",
      });
      formik.setSubmitting(false);
      setResponse(data.message);

      // Check the response message when API requests are returned
      // Re-routes to account page
      if (data.message === "Current password is incorrect") {
        setCorrect(false);
      } else if (data.message === "Password changed successfully") {
        setCorrect(true);
        setTimeout(() => navigate("/profile"), 2000);
        toast.success("Password changed successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Current password is required")
      .min(8, "Password must be at least 8 characters")
      .max(256, "Password must not exceed 256 characters"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters")
      .max(256, "Password must not exceed 256 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
        "New password must contain at least one uppercase letter, one special character, and one number"
      ),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: changePassword,
  });

  return (
    <div className="edit-password-page">
      <div className="change-username-box">
        <div className="current-password-box">
          <div className="current-password">
            <div className="username-heading">
              <h1 className="text-center mb-2 font-bold">
                Change Your Password:
              </h1>
              <div className="username-desc">
                To change your password, please confirm your old password and
                then enter a new password to change your password.
              </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="old-password">
                <label className="mb-2">Confirm Current Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Current Password"
                  className="border-1 border-black rounded-md p-1 w-80"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500">{formik.errors.password}</div>
                )}
              </div>

              <div className="new-password">
                <label className="mb-2">Enter New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  placeholder="New Password"
                  className="border-1 border-black rounded-md p-1 w-80"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword || newPassword}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="text-red-500">
                    {formik.errors.newPassword}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-600 mt-4 text-white text-xl font-semibold px-5 py-2 rounded-xl"
                disabled={formik.isSubmitting}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
