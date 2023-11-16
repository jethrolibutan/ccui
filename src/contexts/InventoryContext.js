// /context/InventoryContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);

  const updateInventory = (newItem) => {
    console.log("this is the new item", newItem);
    setInventory((prevInventory) => [...prevInventory, newItem]);
  };

  const deleteItem = (itemId) => {
    setInventory((prevInventory) =>
      prevInventory.filter((item) => item.id !== itemId)
    );
  };

  const fetchData = async () => {
    const apiUrl1 = "http://localhost:8000/api/items/";
    const jwtToken = localStorage.getItem("jwt");

    const requestOptions1 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await axios.get(apiUrl1, requestOptions1);
      const data = response.data;

      setInventory(data);
      console.log("this is the temp inv", inventory);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
