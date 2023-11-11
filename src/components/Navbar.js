import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  IconButton,
} from "@mui/material";

import { Navigate, useNavigate } from "react-router-dom";

import BuildIcon from "@mui/icons-material/Build";

function Navbar() {
  const navigate = useNavigate();

  const logOutUser = async (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8000/api/logout/";

    const logOutData = {
      jwt: localStorage.getItem("jwt"),
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logOutData),
    };

    const handleLogout = await fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.message === "Successfully Logged Out") {
          console.log("You have been logged out!");
          localStorage.clear();
          navigate("/");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <AppBar
        position="static"
        backgroundColor="primary"
        style={{ background: " #3c3c3c" }}
      >
        <Toolbar>
          <IconButton
            href="/dashboard"
            size="medium"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <BuildIcon />
          </IconButton>
          <Typography size="large" edge="start" marginRight="auto" variant="h5">
            Contractor Control
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              href="/dashboard"
              color="inherit"
              variant="text"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Dashboard
            </Button>
            <Button
              href="/inventory"
              color="inherit"
              variant="text"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Inventory
            </Button>
            <Button
              href="/invoice"
              color="inherit"
              variant="text"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Invoice
            </Button>
            <Button
              href="/quote"
              color="inherit"
              variant="text"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Quote
            </Button>
            <Button
              href="/timeclock"
              color="inherit"
              variant="text"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Time Clock
            </Button>
            <Button
              href="/profile"
              color="inherit"
              variant="text"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "500" }}
            >
              Profile
            </Button>
            <Button
              color="inherit"
              variant="text"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "500" }}
              onClick={logOutUser}
            >
              Sign Out
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
