import React from "react";
import ClockIn from "../../components/Time Clock/ClockIn";
import ClockOut from "../../components/Time Clock/ClockOut";
import Id from "../../components/Time Clock/Id";
import "./TimeClock.css";

function TimeClock() {
  return (
    <div className="time-clock-page">
      <div className="d-flex flex-column align-items-center justify-content-center w-100">
        <div className="enter-id">
          <Id />
        </div>

        <div className="d-flex flex-row">
          <div className="clock-button">
            <ClockIn />
          </div>
          <div className="clock-button">
            <ClockOut />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeClock;
