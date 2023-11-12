import React from "react";
import { useNavigate } from "react-router-dom";
import "./RedirectEdit.css";

function RedirectEdit() {
  const navigate = useNavigate();

  const goToUserName = () => {
    navigate("/editusername");
  };

  const goToPassword = () => {
    navigate("/editpassword");
  };

  return (
    <div className="button-list">
      <button onClick={goToUserName} className="username-button">
        {" "}
        Click here to edit your username!{" "}
      </button>
      <button onClick={goToPassword} className="password-button">
        {" "}
        Click here to edit your password!
      </button>
    </div>
  );
}

export default RedirectEdit;
