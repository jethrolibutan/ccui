import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditUsername(props) {
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [response, setResponse] = useState("");
  const [correct, setCorrect] = useState(false);

  const navigate = useNavigate();

  // getting user info
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

      await fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setPassword(data[0].password);
          setNewEmail(data[0].email);
        })
        .catch((error) => console.error("Error:", error));
    })();
  }, []);

  /**
   * This is the method for sending API request to password changing endpoint
   *
   * 1. Make API call
   * 2. If response is not correct, change incorrect to true
   * 3. If correct, set to correct
   * 4. Redirect to account page after 2 seconds
   *
   */
  const changeUsername = async () => {
    const apiUrl = "http://localhost:8000/api/change-username/";

    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem("jwt");

    // Data to be sent in the request body
    const requestData = {
      jwt: jwtToken,
      password: password,
      new_username: newEmail,
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
    <div className="flex flex-col items-center justify-center my-20 font-[Montserrat]">
      <h1 className="text-center text-4xl mb-5 font-bold">
        Change Your Username
      </h1>

      {!correct && (
        <h1 className="p-3 mb-4 rounded-xl text-red-500 font-semibold">
          {response}
        </h1>
      )}

      {correct && (
        <h1 className="p-3 mb-4 rounded-xl bg-green-300 font-semibold">
          Password Succesfully Changed! You will now be redirected to your
          account page
        </h1>
      )}

      <div className="flex  mb-7">
        <input
          type="password"
          name="password"
          required
          placeholder="Current Password"
          className="border-1 border-black rounded-md p-1 w-80"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>

      <div className="flex  mb-7">
        <input
          type="password"
          name="password"
          required
          placeholder="New Password"
          className="border-1 border-black rounded-md p-1 w-80"
          onChange={(e) => setNewEmail(e.target.value)}
        ></input>
      </div>

      <button
        className="bg-blue-600 mt-4 text-white text-xl font-semibold px-5 py-2 rounded-xl"
        onClick={changeUsername}
      >
        Submit
      </button>
    </div>
  );
}
