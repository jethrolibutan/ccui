import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./EditUsername.css";

const ChangeUsernameForm = () => {
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
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
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const changeUsername = async () => {
    const apiUrl = "http://localhost:8000/api/change-username/";

    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwt");

    // Data to be sent in the request body
    const requestData = {
      jwt: jwtToken,
      password: formik.values.currentPassword,
      new_username: formik.values.newUsername,
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
        currentPassword: "",
        newUsername: "",
      });
      formik.setSubmitting(false);
      setResponse(data.message);

      // Check the response message when API requests are returned
      // Re-routes to account page
      if (data.message === "Current password is incorrect") {
        setCorrect(false);
      } else if (data.message === "Email changed successfully") {
        setCorrect(true);
        setTimeout(() => navigate("/profile"), 2000);
      }

      // Reset form fields after successful username change
      formik.setValues({
        currentPassword: "",
        newUsername: "",
      });

      // Mark form fields as untouched
      formik.setTouched({
        currentPassword: false,
        newUsername: false,
      });

      setTimeout(() => navigate("/profile"), 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newUsername: Yup.string()
      .required("New username is required")
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        "Username must contain only letters, numbers, underscores, dots, and hyphens"
      ),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newUsername: "",
    },
    validationSchema,
    onSubmit: changeUsername,
  });

  return (
    <div className="edit-username-page">
      <form className="flex flex-col items-center justify-center my-20 font-[Montserrat]">
        {!correct && (
          <p className="p-3 mb-4 rounded-xl text-red-500 font-semibold">
            {response}
          </p>
        )}

        {correct && (
          <p className="p-3 mb-4 rounded-xl bg-green-300 font-semibold">
            Username Successfully Changed! You will now be redirected to your
            account page
          </p>
        )}

        <div className="edit-username-box">
          <div className="confirm-password">
            <div className="username-heading">
              <h1 className="text-center mb-2 font-bold">
                Change Your Username:
              </h1>
            </div>
            <div className="username-desc">
              To change your username, please confirm your password and then
              enter a new email address that is used as your username.
            </div>
            <label htmlFor="currentPassword" className="mb-2">
              Confirm Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              required
              placeholder="Current Password"
              className="border-1 border-black rounded-md p-2 w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <div className="text-red-500">
                  {formik.errors.currentPassword}
                </div>
              )}
          </div>

          <div className="new-username">
            <label htmlFor="newUsername" className="mb-2">
              New Username
            </label>
            <input
              type="text"
              name="newUsername"
              required
              placeholder="New Username"
              className="border-1 border-black rounded-md p-2 w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newUsername || newEmail}
            />
            {formik.touched.newUsername && formik.errors.newUsername && (
              <div className="text-red-500">{formik.errors.newUsername}</div>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 mt-4 text-white text-xl font-semibold px-5 py-2 rounded-xl hover:bg-blue-700"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeUsernameForm;
