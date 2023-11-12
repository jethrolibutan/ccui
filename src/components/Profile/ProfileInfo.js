import React, { useEffect, useState } from "react";

function ProfileInfo() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [position, setPosition] = useState("");
  const [payRate, setPayRate] = useState("");

  /**
   * Gets user info
   */
  useEffect(() => {
    (async () => {
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

        console.log(firstUserData);
        console.log(firstUserEmployeeInfo);

        setFirstName(firstUserData.first_name);
        setLastName(firstUserData.last_name);
        setUsername(firstUserData.username);
        setPosition(firstUserEmployeeInfo.position);
        setPayRate(firstUserEmployeeInfo.pay_rate);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  });

  return (
    <div>
      <h1>
        Hello {firstName} {lastName}!
      </h1>
      <h1>Here is your info:</h1>
      <h2> Username: {userName} </h2>
      <h2> First Name: {firstName}</h2>
      <h2> Last Name: {lastName}</h2>
      <h2> Position: {position}</h2>
      <h2> Pay Rate: {payRate}</h2>
    </div>
  );
}

export default ProfileInfo;
