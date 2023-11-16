// /context/InventoryContext.js

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import axios from "axios";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const isMounted = useRef(true);

  const updateInventory = (newItem) => {
    setInventory((prevInventory) => [...prevInventory, newItem]);
    return [...inventory, newItem];
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

      // Check if the component is still mounted before updating state
      if (isMounted.current) {
        setInventory(response.data);
        console.log("this is the temp inv", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const isMounted = { current: true };

    fetchData(isMounted, setInventory);

    return () => {
      isMounted.current = false;
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      inventory,
      updateInventory,
      deleteItem,
      getLastAddedItemId: () =>
        inventory.length > 0 ? inventory[inventory.length - 1]?.id : null,
    }),
    [inventory, updateInventory, deleteItem] // Dependencies for useMemo
  );

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        updateInventory,
        deleteItem,
        getLastAddedItemId: () =>
          inventory.length > 0 ? inventory[inventory.length - 1].id : null,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  return useContext(InventoryContext);
};
