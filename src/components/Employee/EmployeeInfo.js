import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "../Register.css";

function AddEmployee() {
  const [payRate, setPayRate] = useState("");
  const [position, setPosition] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (successfulCreation) {
      toast.success(
        "You successfully added your information! You will now be redirected to the dashboard."
      );
    }
  }, [successfulCreation, navigate]);

  const registerEmployee = async (event) => {
    event.preventDefault();

    try {
      const userRequest = await axios.post(
        "http://localhost:8000/api/add-employee-info/",
        {
          jwt: localStorage.getItem("jwt"),
          position: position,
          pay_rate: payRate,
        }
      );

      console.log(userRequest.data);
      console.log(position);
      console.log(payRate);

      if (position === "") {
        toast.error("Please fill out the position field");
      } else if (payRate === "") {
        toast.error("Please fill out the pay rate field");
      } else {
        setSuccessfulCreation(true);

        if (successfulCreation === true) {
          toast.success("Employee was successfully created!");
        }

        // Clear the input fields after successful registration
        setPosition("");
        setPayRate("");
        setTimeout(() => navigate("/dashboard"), 2000);
        console.log("User was created");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 500) {
          if (payRate > 1000) {
            toast.error("Enter a Pay Rate less than 1000");
            console.log("Enter in a pay rate less than 1000");
          }

          if (position === "") {
            toast.error("Please fill out the position field");
          } else if (payRate === "") {
            toast.error("Please fill out the pay rate field");
          }

          setPosition("");
          setPayRate("");
        }
      }
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
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddEmployee;
