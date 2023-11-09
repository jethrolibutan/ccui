import React, { useState } from "react";
import "./Clock.css";

function ClockIn() {
  // State to store the employee ID
  const [employeeID, setEmployeeID] = useState("");

  // Function to handle changes in the input field
  const handleIdChange = (e) => {
    setEmployeeID(e.target.value);
  };

  // Function to handle the clock in action
  const handleClockIn = () => {
    // You can use the employeeId state here for further processing
    console.log("Clock In ID:", employeeID);
  };

  // Function to handle the clock out action
  const handleClockOut = () => {
    // You can use the employeeId state here for further processing
    console.log("Clock Out ID:", employeeID);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <input
        type="text"
        placeholder="Enter ID"
        value={employeeID}
        onChange={handleIdChange}
      />

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
    </div>
  );
}

export default ClockIn;
