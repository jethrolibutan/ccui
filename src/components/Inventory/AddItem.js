import React, { useState } from "react";
import { Button } from "@mui/material";

function AddItem() {
  const [item_name, setItemName] = useState("");
  const [item_amount, setItemAmount] = useState("");
  const [item_owner, setItemOwner] = useState("");

  const addItem = async (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8000/api/create-new-item/";

    const itemData = {
      jwt: localStorage.getItem("jwt"),
      item_name: item_name,
      item_amount: item_amount,
      item_owner: item_owner,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    };
  };

  return (
    <div>
      <Button> Add Item</Button>
    </div>
  );
}

export default AddItem;
