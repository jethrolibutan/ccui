import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function EditUsername() {
  const [userName, setUserName] = useState("");
  const [confirmedUserName, setConfirmedUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasInput, setHasInput] = useState("");
  const [response, setResponse] = useState("");
  const [correct, setCorrect] = useState(null);

  const navigate = useNavigate();

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

  const changeUsername = async () => {
    const apiUrl = "http://localhost:8000/api/change-username/";

    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwt");

    // Data to be sent in the request body
    const requestData = {
      jwt: jwtToken,
      password: password,
      new_username: confirmedUserName,
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

      console.log(data);
      setResponse(data.message);

      // Check the response message when api requests are returned
      // Re-routes to account page
      if (data.message === "Current password is incorrect") {
        setCorrect(false);
      } else if (data.message === "Password changed successfully") {
        setCorrect(true);
        setTimeout(() => navigate("/profile"), 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {" "}
      {/* <h1>Your username is {userName}</h1>{" "} */}
      <div className="auth-form-container">
        {" "}
        <h2>Register</h2>{" "}
        <form className="login-form" onSubmit={changeUsername}>
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
