import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ViewClocks() {
  const navigate = useNavigate();

  const viewClocks = () => {
    navigate("/viewclocks");
  };

  return (
    <div>
      <Button
        onClick={viewClocks}
        style={{ backgroundColor: "blue", color: "white" }}
      >
        {" "}
        View your Clock-In
      </Button>
    </div>
  );
}

export default ViewClocks;
