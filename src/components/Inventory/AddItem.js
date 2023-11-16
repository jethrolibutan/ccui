import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

function AddItem() {
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");

  const navigate = useNavigate();

  const addItem = async (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8000/api/create-new-item/";

    const itemData = {
      jwt: localStorage.getItem("jwt"),
      item_name: itemName,
      item_amount: itemAmount,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    };

    console.log(itemData);

    const addItemRequest = await fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        console.log(data.message);

        if (data.message === "Item added successfully!") {
          toast.success("Item added successfully!");
        }
      })
      .catch((error) => console.error("Error:", error));

    // Handle the success case, e.g., show a success message or update state
  };

  return (
    <div>
      <form onSubmit={addItem}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              label="Item Name"
              variant="outlined"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Item Amount"
              variant="outlined"
              value={itemAmount}
              onChange={(e) => setItemAmount(e.target.value)}
            />
          </Grid>

          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Add Item
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddItem;
