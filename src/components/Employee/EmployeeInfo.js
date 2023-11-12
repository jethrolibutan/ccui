import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../Register.css";

function AddEmployee() {
  const [payRate, setPayRate] = useState("");
  const [position, setPosition] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  const navigate = useNavigate();

  const registerEmployee = async (event) => {
    event.preventDefault();

    try {
      const userRequest = await axios.post(
        "http://localhost:8000/api/add-employee-info/",
        {
          jwt: localStorage.getItem("jwt"),
          position: position,
          payRate: payRate,
        }
      );

      setSuccessfulCreation(true);
      // Clear the input fields after successful registration
      setPosition("");
      setPayRate("");
      setTimeout(() => navigate("/addEmployee"), 2000);
      console.log("User was created");
    } catch (error) {
      // handle error
      console.error(error);
      // Check if the error status is 505
      if (error.response && error.response.status === 505) {
        console.log("Email already taken");
      }

      setSuccessfulCreation(false);
    }
  };

  return (
    <div className="form-page">
      <div className="auth-form-container">
        {" "}
        <h2>Add Your Info</h2>{" "}
        <form className="login-form" onSubmit={registerEmployee}>
          <label htmlFor="position">Position</label>
          <input
            value={position}
            name="position"
            onChange={(e) => setPosition(e.target.value)}
            id="position"
            placeholder="Position"
          />

          <label htmlFor="payRate">Pay Rate</label>
          <input
            value={payRate}
            name="payRate"
            onChange={(e) => setPayRate(e.target.value)}
            id="payRate"
            placeholder="Pay Rate"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
