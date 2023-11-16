import React from "react";
import Clock from "../../components/Time Clock/Clock";
import "./TimeClock.css";
import ViewClocks from "../../components/Time Clock/ViewClocks";

function TimeClock() {
  return (
    <div className="time-clock-page">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Clock />
        <ViewClocks />
      </div>
    </div>
  );
}

export default TimeClock;
