import React from "react";
import Clock from "../../components/Time Clock/Clock";
import "./TimeClock.css";

function TimeClock() {
  return (
    <div className="time-clock-page">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Clock />
      </div>
    </div>
  );
}

export default TimeClock;
