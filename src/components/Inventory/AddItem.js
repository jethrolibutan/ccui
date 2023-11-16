import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useInventory } from "../../contexts/InventoryContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddItem.css";
import { Toast } from "bootstrap";

function AddItem() {
  const [tempInventory, setTempInventory] = useState([]);
  const { updateInventory } = useInventory();

  const validationSchema = Yup.object().shape({
    itemName: Yup.string().required("Item Name is required"),
    itemAmount: Yup.number()
      .positive("Item Amount must be a positive number")
      .required("Item Amount is required"),
  });

  const formik = useFormik({
    initialValues: {
      itemName: "",
      itemAmount: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const apiUrl = "http://localhost:8000/api/create-new-item/";

      const itemData = {
        jwt: localStorage.getItem("jwt"),
        item_name: values.itemName,
        item_amount: values.itemAmount,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      };

      const addItemRequest = await fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          console.log(data.message);

          if (data.message === "Item added successfully!") {
            toast.success("Item added successfully!");
            updateInventory(itemData);
          }
        })
        .catch((error) => console.error("Error:", error));

      console.log(itemData);

      formik.resetForm();
    },
  });

  return (
    <div className="add-item-form">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              label="Item Name"
              variant="outlined"
              value={formik.values.itemName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="itemName"
              error={formik.touched.itemName && Boolean(formik.errors.itemName)}
              helperText={formik.touched.itemName && formik.errors.itemName}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Item Amount"
              variant="outlined"
              value={formik.values.itemAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="itemAmount"
              error={
                formik.touched.itemAmount && Boolean(formik.errors.itemAmount)
              }
              helperText={formik.touched.itemAmount && formik.errors.itemAmount}
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
