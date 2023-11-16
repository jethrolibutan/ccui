import React, { useEffect, useState } from "react";
import axios from "axios";

function UserClocks() {
  const [employeeId, setEmployeeId] = useState("");
  const [id, setId] = useState("");

  const fetchData = async () => {
    const apiUrl = "http://localhost:8000/api/get-user-info/";

    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwt");

    // Data to be sent in the request body
    const requestData = {
      jwt: jwtToken,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      // Assuming data is an array and you want to access the first element
      const firstUserData = data[0];
      const firstUserEmployeeInfo = data[1];

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
      const response = await axios.post(
        apiUrl,
        {
          employee_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response data:", response.data); // Log the response data

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

  return <div>{id}</div>;
}

export default UserClocks;
