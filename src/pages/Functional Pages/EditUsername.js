import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditUsername.css";

const ChangeUsernameForm = () => {
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [response, setResponse] = useState("");
  const [correct, setCorrect] = useState(false);

  const navigate = useNavigate();

  // getting user info
  useEffect(() => {
    // ... (Your existing useEffect code)
  }, []);

  const changeUsername = async () => {
    // ... (Your existing changeUsername code)
  };

  return (
    <div className="edit-username-page">
      <form className="flex flex-col items-center justify-center my-20 font-[Montserrat]">
        <div className="username-heading">
          <h1 className="text-center mb-4 font-bold">Change Your Username</h1>
          <div className="username-desc">
            To change your username, please confirm your password and then enter
            a new email address that is used as your username.
          </div>
        </div>

        {!correct && (
          <p className="p-3 mb-4 rounded-xl text-red-500 font-semibold">
            {response}
          </p>
        )}

        {correct && (
          <p className="p-3 mb-4 rounded-xl bg-green-300 font-semibold">
            Password Successfully Changed! You will now be redirected to your
            account page
          </p>
        )}

        <div className="change-username-box">
          <div className="confirm-password">
            <label htmlFor="currentPassword" className="mb-2">
              Confirm Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              required
              placeholder="Current Password"
              className="border-1 border-black rounded-md p-2 w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="new-username">
            <label htmlFor="newUsername" className="mb-2">
              New Username
            </label>
            <input
              type="text"
              name="newUsername"
              required
              placeholder="New Username"
              className="border-1 border-black rounded-md p-2 w-full"
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>

          <button
            className="bg-blue-600 mt-4 text-white text-xl font-semibold px-5 py-2 rounded-xl hover:bg-blue-700"
            onClick={changeUsername}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeUsernameForm;
