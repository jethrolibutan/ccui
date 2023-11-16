// /context/InventoryContext.js

import React, { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);

  const updateInventory = (newItem) => {
    setInventory((prevInventory) => [...prevInventory, newItem]);
  };

  const deleteItem = (itemId) => {
    setInventory((prevInventory) =>
      prevInventory.filter((item) => item.id !== itemId)
    );
  };

  return (
    <InventoryContext.Provider
      value={{ inventory, updateInventory, deleteItem }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  return useContext(InventoryContext);
};
