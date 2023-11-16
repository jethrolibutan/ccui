import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./UserInventory.css";
import axios from "axios";

function UserInventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    (async () => {
      const apiUrl = "http://localhost:8000/api/items/";

      // Retrieve the JWT token from localStorage
      const jwtToken = localStorage.getItem("jwt");

      // Data to be sent in the request body
      const requestData = {
        jwt: jwtToken,
      };

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      try {
        const response = await axios.get(apiUrl, requestOptions);
        const data = response.data;

        setInventory(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, []);

  const renderTableRows = () => {
    return inventory.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.itemName}</TableCell>
        <TableCell>{item.itemAmount}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="inventory-section">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Item Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableRows()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserInventory;
