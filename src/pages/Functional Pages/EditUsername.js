import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function EditUsername() {
  const [userName, setUserName] = useState("");
  const [confirmedUserName, setConfirmedUsername] = useState("");
  const [hasInput, setHasInput] = useState("");

  const handleUsernameChange = (e) => {
    const inputText = e.target.value;
    setUserName(e.target.value);
    setHasInput(!!inputText.trim());
  };

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

        const firstUserData = data[0];

        setUserName(firstUserData.username);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  });

  const registerUser = async (event) => {
    if (hasInput) {
      event.preventDefault();
      try {
        const userRequest = await axios.post(
          "http://localhost:8000/api/clock-in/",
          {
            jwt: localStorage.getItem("jwt"),
          }
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Please enter an ID before clocking in.");
    }
  };

  return (
    <div>
      {" "}
      {/* <h1>Your username is {userName}</h1>{" "} */}
      <div className="auth-form-container">
        {" "}
        <h2>Register</h2>{" "}
        <form className="login-form" onSubmit={registerUser}>
          <label htmlFor="username">Username</label>
          <input
            onChange={setUserName}
            type="username"
            placeholder="********"
            id="username"
            name="username"
          />
          <label htmlFor="username"> Confirm Username</label>
          <input
            value={confirmedUserName}
            onChange={(e) => setConfirmedUsername(e.target.value)}
            type="username"
            placeholder="********"
            id="username"
            name="username"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default EditUsername;
