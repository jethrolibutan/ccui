import React from "react";
import AddItem from "../../components/Inventory/AddItem";
import UserInventory from "../../components/Inventory/UserInventory";

function Inventory() {
  return (
    <div>
      <AddItem />
      <UserInventory />
    </div>
  );
}

export default Inventory;
