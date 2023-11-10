import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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

  const handleClockIn = () => {
    if (hasInput) {
      toast.success(
        `You have successfully clocked in Employee ID: ${employeeID}`
      );
    } else {
      toast.error("Please enter an ID before clocking in.");
    }
  };

  const handleClockOut = () => {
    if (hasInput) {
      toast.success(
        `You have successfully clocked out Employee ID: ${employeeID}`
      );
    } else {
      toast.error("Please enter an ID before clocking in.");
    }
  };

  // const clockInUser = async (event) => {

  //   event.preventDefault();

  //   const apiUrl = "679";
  //   const clockInData = {
  //     employeeID: employeeID,
  //   };

  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       clockInData: clockInData}),
  //   };

  //   const clockInRequest = await fetch(apiUrl, requestOptions)

  //     .then((response) => response.json())

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
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
          onClick={handleClockIn}
        >
          Clock In
        </button>
        <button
          className="clock-out"
          style={{ marginLeft: "1em" }}
          onClick={handleClockOut}
        >
          Clock Out
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default ClockIn;
