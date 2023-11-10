import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInvalid, setUserInvalid] = useState(false);

  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/dashboard");
    console.log(email);
    console.log(password);
  };

  const loginUser = async (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8000/api/login/";
    const loginData = {
      email: email,
      password: password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };

    const loginRequest = await fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (
          data.message === "Invalid email" ||
          data.message === "Incorrect Password"
        ) {
          setUserInvalid(true);
        } else {
          const jwtToken = data.jwt; // Assuming the response contains a field named "jwt" with the JWT token.
          localStorage.setItem("jwt", jwtToken); // Store the JWT token in the localStorage.
          localStorage.setItem("jwt-exp", Date.now() + 2 * 60 * 60 * 1000); // expiration is checked in Navbar component
          navigate("/dashboard");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="form-page">
      <div className="auth-form-container">
        <div>
          {" "}
          <h1> Login </h1>{" "}
        </div>
        <form className="login-form">
          <label htmlFor="email">Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button type="submit" onClick={loginUser}>
            Log In
          </button>
        </form>
        <button className="link-btn" onClick={goToRegister}>
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
}

export default Login;
