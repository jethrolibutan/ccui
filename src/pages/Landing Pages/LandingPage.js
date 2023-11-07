import React from "react";
import "./LandingPage.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-page-column">
        <h1 className="landing-page-header">Welcome to Contractor Control!</h1>
        <h2 className="landing-page-subheader">
          The one stop shop for all your contractor needs!
        </h2>
        <Link to="/login">
          <Button
            sx={{
              borderRadius: "50px",
              borderWidth: "2px",
              borderColor: "blue",
              borderStyle: "solid",
              backgroundColor: "blue",
              color: "white",
              "&:hover": {
                backgroundColor: "darkblue",
                borderColor: "darkblue",
              },
            }}
            variant="contained"
          >
            Click here to get started!
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
