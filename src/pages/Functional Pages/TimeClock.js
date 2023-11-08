import React from "react";
import ClockIn from "../../components/Time Clock/ClockIn";
import ClockOut from "../../components/Time Clock/ClockOut";
import "./TimeClock.css";

function TimeClock() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center ">
      THIS IS THE TIME CLOCk page
      <div className="d-flex flex-row align-items-center justify-content-center w-100">
        <div className="clock-button">
          <ClockIn />
        </div>
        <div className="clock-button">
          <ClockOut />
        </div>
      </div>
    </div>
  );
}

export default TimeClock;
