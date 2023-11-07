import * as React from "react";
import "../CarsList/carslist.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const columns = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "car", headerName: "Car", width: 100 },
  { field: "licensePlate", headerName: "License Plate", width: 110 },
  {
    field: "fromDate",
    headerName: "Starting Date",
    type: "Date",
    width: 170,
  },
  {
    field: "toDate",
    headerName: "Ending date",
    type: "Date",
    width: 170,
  },
  {
    field: "price",
    headerName: "Total Price",
    type: "Number",
    // description: "This column has a value getter and is not sortable.",
    width: 80,
  },
  {
    field: "totalHours",
    headerName: "Total Hours",
    type: "String",
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
          <Link to={"/account/" + id}>
            <button className="m-2">
              <ModeEditOutlineIcon />
            </button>
          </Link>
          <button>
            <DeleteOutlineIcon />
          </button>
        </>
      );
    },
  },
];

export default function AdminBookings() {
  const [bookingData, setBookingData] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("/admin-bookings").then((response) => {
      // console.log(response.data);
      setBookingData(response.data);
    });
  }, []);

  console.log(bookingData);
  useEffect(() => {
    const updatedRows = bookingData.map((booking) => ({
      id: booking._id,
      car: `${booking.car.brand} ${booking.car.model}`,
      licensePlate: booking.car.licensePlate,
      fromDate: moment(booking.bookedTimeSlots.from).format(
        "DD MMM YYYY - HH:00"
      ),
      toDate: moment(booking.bookedTimeSlots.to).format("DD MMM YYYY - HH:00"),
      totalHours: booking.totalHours,
      price: "$" + booking.price,
    }));
    setRows(updatedRows);
  }, [bookingData]);

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
