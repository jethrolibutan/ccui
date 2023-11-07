import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="form-page">
      <div>
        <h2>Sign in to Contractor Control</h2>
      </div>
      <div className="auth-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
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
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={goToRegister}>
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
}

export default Login;
