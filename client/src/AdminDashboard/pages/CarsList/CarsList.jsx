import * as React from "react";
import "../CarsList/carslist.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { Button, message, Popconfirm } from "antd";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Link, useParams } from "react-router-dom";

export default function CarsList() {
  const [ownerCars, setOwnerCars] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("/user-carlist").then((response) => {
      setOwnerCars(response.data);
    });
  }, []);

  useEffect(() => {
    const updatedRows = ownerCars.map((car) => ({
      id: car._id,
      brand: car.brand,
      model: car.model,
      fuel: car.fuel,
      type: car.type,
      licensePlate: car.licensePlate,
      price: car.price,
      gearbox: car.gearbox,
    }));
    setRows(updatedRows);
  }, [ownerCars]);
  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "brand", headerName: "Brand", width: 130 },
    { field: "model", headerName: "Model", width: 80 },
    {
      field: "type",
      headerName: "Type",
      type: "String",
      width: 90,
    },
    {
      field: "licensePlate",
      headerName: "License Plate",
      type: "String",
      className: "bg-red-400",
      // description: "This column has a value getter and is not sortable.",
      width: 160,
    },
    {
      field: "fuel",
      headerName: "Fuel",
      type: "String",
      // description: "This column has a value getter and is not sortable.",
      width: 100,
    },
    {
      field: "gearbox",
      headerName: "Gear",
      type: "String",
      // description: "This column has a value getter and is not sortable.",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price Per Day",
      type: "Number",
      // description: "This column has a value getter and is not sortable.",
      width: 100,
    },
    {
      fiel: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        const id = params.row.id;

        return (
          <>
            <Link to={"/account/carlist/" + id}>
              <button className="m-2">
                <ModeEditOutlineIcon />
              </button>
            </Link>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task? When you delete the car also the bookings associated with the car will be deleted."
              onConfirm={() => {
                deleteCar(id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <button>
                <DeleteOutlineIcon />
              </button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  function deleteCar(id) {
    // console.log(id);
    axios
      .post("/deleteCar", { carId: id })
      .then((response) => {
        // Handle success, you can update the UI here if needed
        // console.log("Car deleted successfully");
        // You may also want to refresh the list of cars after deletion
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error deleting car:", error);
      });
  }
  return (
    <div className="carsList">
      <DataGrid
        columnVisibilityModel={{
          id: false,
        }}
        rows={rows}
        disableRowSelectionOnClick
        columns={columns}
        sx={{
          textAlign: "center",
          justifyContent: "center",
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
