import React, { useEffect, useState } from "react";
import "./UserClock.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function UserClocks() {
  const [employeeId, setEmployeeId] = useState("");
  const [id, setId] = useState("");
  const [clockData, setClockData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fetchData = async () => {
    const apiUrl = "http://localhost:8000/api/get-user-info/";

    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwt");

    // Construct the URL with query parameters
    const urlWithParams = new URL(apiUrl);
    urlWithParams.searchParams.append("jwt", jwtToken);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jwt: jwtToken }),
    };

    try {
      const response = await fetch(urlWithParams, requestOptions);
      const data = await response.json();

      // Assuming data is an array and you want to access the first element
      const firstUserEmployeeInfo = data[1];
      const firstUserEmployeeId = data[0];

      setFirstName(firstUserEmployeeId.first_name);
      setLastName(firstUserEmployeeId.last_name);
      setId(firstUserEmployeeInfo.user);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const grabData = async () => {
    const apiUrl = "http://localhost:8000/api/time-clocks/";
    const jwtToken = localStorage.getItem("jwt");
    console.log("JWT Token:  ", jwtToken);

    try {
      const response = await axios.get(apiUrl, {
        params: {
          jwt: jwtToken,
          employeeId: id,
        },
      });
      console.log("Response data:", response.data); // Log the response data

      if (response.data.length === 0) {
        toast.error(
          "You have no clock in or clock out times! Please Clock-in or Clock-out!"
        );
      }

      setClockData(response.data);
      console.log("JWT Token is still here: ", jwtToken);
      console.log("ID: ", id);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    grabData();
    fetchData();
  }, []);

  // Function to render table rows
  const renderTableRows = () => {
    return clockData.map((clock, index) => (
      <TableRow key={index}>
        <TableCell>{clock.clock_type}</TableCell>
        <TableCell>{clock.time}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="clock-page">
      <div className="clock-text">
        {" "}
        <h3>
          {" "}
          Hello {firstName} {lastName}, here are your clock in and clock out
          times!
        </h3>
      </div>
      <div className="time-table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Clock Type:</TableCell>
                <TableCell>Time:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        </TableContainer>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserClocks;
