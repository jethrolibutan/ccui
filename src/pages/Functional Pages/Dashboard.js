import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div>
      <div className="dashboard-column">
        <div className="dashboard-row">
          <div className="card">
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card
                sx={{
                  width: 300, // Set your desired width
                  height: 200, // Set your desired height
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/PNL.jpg"
                  alt="Profile"
                />

                <CardContent>
                  <Typography variant="h6">Profile</Typography>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="card">
            <Link
              to="/inventory"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card
                sx={{
                  width: 300, // Set your desired width
                  height: 200, // Set your desired height
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/PNL.jpg"
                  alt="Inventory"
                />

                <CardContent>
                  <Typography variant="h6">Inventory</Typography>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="card">
            <Link
              to="/invoice"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card
                sx={{
                  width: 300, // Set your desired width
                  height: 200, // Set your desired height
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/PNL.jpg"
                  alt="Invoice"
                />

                <CardContent>
                  <Typography variant="h6">Invoice</Typography>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        <div className="dashboard-row">
          <div className="card">
            <Link
              to="/quote"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card
                sx={{
                  width: 300, // Set your desired width
                  height: 200, // Set your desired height
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/PNL.jpg"
                  alt="Quote"
                />

                <CardContent>
                  <Typography variant="h6">Quote</Typography>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="card">
            <Link
              to="/timeclock"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card
                sx={{
                  width: 300, // Set your desired width
                  height: 200, // Set your desired height
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/PNL.jpg"
                  alt="Time Clock"
                />

                <CardContent>
                  <Typography variant="h6">Time Clock</Typography>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
