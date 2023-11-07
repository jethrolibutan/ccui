import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="form-page">
      <div className="auth-form-container">
        {" "}
        <h2>Register</h2>{" "}
        <form className="login-form" onSubmit={handleSubmit}>
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
            value={pass}
            onChange={(e) => setPass(e.target.value)}
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
