import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./Clock.css";

function ClockIn() {
  const [employeeID, setEmployeeID] = useState("");
  const [hasInput, setHasInput] = useState(false);

  const handleIdChange = (e) => {
    const inputText = e.target.value;
    setEmployeeID(e.target.value);
    setHasInput(!!inputText.trim());
  };

  const clockInUser = async (event) => {
    if (hasInput) {
      event.preventDefault();
      try {
        const userRequest = await axios.post(
          "http://localhost:8000/api/clock-in/",
          {
            jwt: localStorage.getItem("jwt"),
            employee_id: employeeID,
          }
        );
        setEmployeeID("");
        console.log("User was clocked in");
        toast.success(`Employee #${employeeID} was clocked in`);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 400) {
          console.log("Employee ID does not exist");
          toast.error("Employee ID does not exist");
        }
      }
    } else {
      toast.error("Please enter an ID before clocking in.");
    }
  };

  const clockOutUser = async (event) => {
    if (hasInput) {
      event.preventDefault();
      try {
        const userRequest = await axios.post(
          "http://localhost:8000/api/clock-out/",
          {
            jwt: localStorage.getItem("jwt"),
            employee_id: employeeID,
          }
        );
        setEmployeeID("");
        console.log("User was clocked out");
        toast.success(`Employee #${employeeID} was clocked out`);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 400) {
          console.log("Employee ID does not exist");
          toast.error("Employee ID does not exist");
        }
      }
    } else {
      toast.error("Please enter an ID before clocking out.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <div className="clock-in-section">
        <div className="clock-in-heading">
          <h1 className="text-center mb-2 font-bold">Clock In/Clock Out</h1>
        </div>
        <div className="clock-desc">
          To clock in or out, please enter your employee ID below.
        </div>
        <div className="employee-id">
          <div className="employee-text"> Enter Employee ID here: </div>
          <input
            type="text"
            placeholder="Enter ID"
            value={employeeID}
            onChange={handleIdChange}
            className="employee-input"
            style={{
              border: "none",
              borderBottom: "1px solid #000",
              borderRadius: "0",
              outline: "none",
              marginBottom: "10px",
            }}
          />{" "}
        </div>

        <div className="button-list">
          <button
            className="clock-in"
            style={{ marginRight: "1em" }}
            onClick={clockInUser}
          >
            Clock In
          </button>
          <button
            className="clock-out"
            style={{ marginLeft: "1em" }}
            onClick={clockOutUser}
          >
            Clock Out
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default ClockIn;
