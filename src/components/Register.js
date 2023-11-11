import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailTaken, setEmailTaken] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [succesfulCreation, setSuccessfulCreation] = useState(false);

  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();

    if (password != confirmedPassword) {
      setPasswordMatch(false);
    } else {
      const userRequest = await axios.post(
        "http://localhost:8000/api/register/",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }
      );

      console.log(userRequest.data.message);

      /**
       * Handling errors from API response
       */
      if (userRequest.data.message === "Email is already taken") {
        setEmailTaken(true);
      }

      setSuccessfulCreation(true);
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="form-page">
      <div id="error messages">
        {emailTaken ? (
          <p className="text-red-500 text-center mb-2">
            The email you entered is already in use!
          </p>
        ) : null}
        {!passwordMatch ? (
          <p className="text-red-500 text-center mb-2">
            Passwords do not match!
          </p>
        ) : null}
      </div>
      <div className="auth-form-container">
        {" "}
        <h2>Register</h2>{" "}
        <form className="login-form" onSubmit={registerUser}>
          <label htmlFor="name">First Name</label>
          <input
            value={firstName}
            name="name"
            onChange={(e) => setFirstName(e.target.value)}
            id="name"
            placeholder="First Name"
          />
          <label htmlFor="name">Last Name</label>
          <input
            value={lastName}
            name="name"
            onChange={(e) => setLastName(e.target.value)}
            id="name"
            placeholder="Last Name"
          />
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <label htmlFor="password"> confirm password</label>
          <input
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button type="submit">Register</button>
        </form>
      </div>

      <button className="link-btn" onClick={goToLogin}>
        Already have an account? Login here.
      </button>
    </div>
  );
}

export default Register;
