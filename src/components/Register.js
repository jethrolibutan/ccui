import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [name, setName] = useState("");
  const [emailTaken, setEmailTaken] = useState("");
  const [succesfulCreation, setSuccessfulCreation] = useState(false);

  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();

    if (password != confirmedPassword) {
      setPasswordMatch(false);
    } else {
      const userRequest = await axios.post("", {
        username: email,
        password: password,
      });

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
            The email you entered is already in use
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
          <label htmlFor="name">Full name</label>
          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="full Name"
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
