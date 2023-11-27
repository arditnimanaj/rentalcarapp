import * as React from "react";
import axios from "axios";
import moment from "moment";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("/my-bookings").then((response) => {
      setReviews(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredReviews = reviews.filter(
      (review) => review.descriptionReview && review.starsReview
    );

    console.log(filteredReviews);

    const updatedRows = filteredReviews.map((review) => ({
      id: review._id,
      momentWhenBooked: review.momentWhenBooked,
      car: `${review.car.brand} ${review.car.model}`,
      licensePlate: review.car.licensePlate,
      fromDate: moment(review.bookedTimeSlots.from).format(
        "DD MMM YYYY - HH:00"
      ),
      toDate: moment(review.bookedTimeSlots.to).format("DD MMM YYYY - HH:00"),
      totalHours: review.totalHours,
      price: "$" + review.price,
      bookingUser: review.bookingUser,
      reviewStars: review.starsReview,
      reviewDescription: review.descriptionReview,
    }));
    setRows(updatedRows);
  }, [reviews]);

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "car", headerName: "Car", width: 100 },
    { field: "licensePlate", headerName: "License Plate", width: 110 },

    {
      field: "fromDate",
      headerName: "Booked from",
      type: "Date",
      width: 170,
    },
    {
      field: "toDate",
      headerName: "Booked to",
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
      field: "reviewStars",
      headerName: "ReviewStars",
      type: "String",
      // description: "This column has a value getter and is not sortable.",
      width: 100,
    },
    {
      field: "reviewDescription",
      headerName: "ReviewDescription",
      type: "String",
      // description: "This column has a value getter and is not sortable.",
      width: "fit",
    },
  ];
  return (
    <div className="flex flex-[5]">
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

export default AdminReviews;
