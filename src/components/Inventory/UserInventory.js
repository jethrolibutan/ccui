import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useInventory } from "../../contexts/InventoryContext";
import "./UserInventory.css";
import axios from "axios";

function UserInventory() {
  const { inventory, deleteItem, updateQuantity } = useInventory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const formik = useFormik({
    initialValues: {
      newQuantity: "",
    },
    validationSchema: Yup.object({
      newQuantity: Yup.number()
        .typeError("Must be a number")
        .required("Required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      handleUpdateQuantity(values.newQuantity);
      console.log("new quantity", values.newQuantity);
    },
  });

  const handleDelete = async (itemId) => {
    console.log(itemId);

    const userRequest = await axios
      .post(`http://localhost:8000/api/delete-item/`, {
        jwt: localStorage.getItem("jwt"),
        item_id: itemId,
      })
      .then((response) => {
        if (response.status === 200) {
          // Call deleteItem from the context to update the state
          deleteItem(itemId);
          console.log("Item deleted successfully.");
        } else {
          console.log("Failed to delete item.");
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateQuantity = async () => {
    try {
      // Your update quantity logic
      const response = await axios.post(
        `http://localhost:8000/api/update-item-quantity/`,
        {
          jwt: localStorage.getItem("jwt"),
          item_id: selectedItemId,
          item_amount: formik.values.newQuantity,
        }
      );

      // Check if the update quantity request was successful
      if (response.status === 200) {
        // Close the modal and reset states

        // Close the modal and reset states
        setIsModalOpen(false);
        setSelectedItemId(null);

        // Manually reset the Formik form
        formik.resetForm();

        // Enable the "Update Quantity" button
        setIsModalOpen(false);
        setSelectedItemId(null);

        updateQuantity(selectedItemId, parseInt(formik.values.newQuantity, 10));
        console.log("Quantity updated successfully.");
      } else {
        console.log("Failed to update quantity.");
        formik.setSubmitting(false);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const renderTableRows = () => {
    return inventory.map((item) => {
      return (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.itemName}</TableCell>
          <TableCell>{item.itemAmount}</TableCell>
          <TableCell>
            <Button
              onClick={() => handleDelete(item.id)}
              variant="outlined"
              style={{
                color: "white",
                backgroundColor: "red",
                marginRight: "8px",
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedItemId(item.id);
              }}
              variant="outlined"
              color="secondary"
              style={{
                color: "white",
                backgroundColor: "green",
                marginLeft: "8px",
              }}
            >
              Update Quantity
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  console.log("new quantity", formik.values.newQuantity);

  return (
    <div className="inventory-section">
      <div className="inventory-heading">
        <h3> Below here is your inventory: </h3>
      </div>
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
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="New Quantity"
              variant="outlined"
              fullWidth
              type="number"
              id="newQuantity"
              name="newQuantity"
              value={formik.values.newQuantity}
              onChange={formik.handleChange}
              error={
                formik.touched.newQuantity && Boolean(formik.errors.newQuantity)
              }
              helperText={
                formik.touched.newQuantity && formik.errors.newQuantity
              }
            />
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
            >
              Update Quantity
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default UserInventory;
