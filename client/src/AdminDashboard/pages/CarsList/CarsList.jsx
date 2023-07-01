import * as React from "react";
import "../CarsList/carslist.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
function buttonEdit() {
  console.log("Edit");
}
function buttonDelete() {
  console.log("delete");
}
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
      return (
        <>
          <button className="m-2" onClick={buttonEdit}>
            <ModeEditOutlineIcon />
          </button>
          <button onClick={buttonDelete}>
            <DeleteOutlineIcon />
          </button>
        </>
      );
    },
  },
];

export default function CarsList() {
  const [ownerCars, setOwnerCars] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("/ownerCars").then((response) => {
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

  return (
    <div className="carsList">
      <DataGrid
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
