import * as React from "react";
import "../CarsList/carslist.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { pink } from "@mui/material/colors";
import InfoIcon from "@mui/icons-material/Info";
import { Button, Modal } from "antd";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function AdminBookings() {
  const [bookingData, setBookingData] = useState([]);
  const [rows, setRows] = useState([]);

  const [isExtraInfoModalOpen, setIsExtraInfoModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const showDetailsModal = () => {
    setIsDetailsModalOpen(true);
  };
  const handleDetailsModalOk = () => {
    setIsDetailsModalOpen(false);
  };
  const handleDetailsModalCancel = () => {
    setIsDetailsModalOpen(false);
  };
  const showExtraInfoModal = () => {
    setIsExtraInfoModalOpen(true);
  };

  const handleExtraInfoOk = () => {
    setIsExtraInfoModalOpen(false);
  };

  const handleExtraInfoCancel = () => {
    setIsExtraInfoModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "car", headerName: "Car", width: 100 },
    { field: "licensePlate", headerName: "License Plate", width: 110 },
    // {
    //   field: "momentWhenBooked",
    //   headerName: "Booking date",
    //   type: "Date",
    //   width: 170,
    // },
    {
      field: "momentWhenBooked",
      headerName: "Booking date",
      type: "Date",
      width: 170,
    },
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
      field: "totalHours",
      headerName: "Total Hours",
      type: "String",
      // description: "This column has a value getter and is not sortable.",
      width: 100,
    },
    {
      field: "extraInfo",
      headerName: "Request",
      type: "String",
      width: 70,

      renderCell: (params) => {
        const extraInfo = params.row.extraInfo;

        return (
          <div className="flex items-center text-center mx-auto">
            {extraInfo ? (
              <>
                <div
                  onClick={showExtraInfoModal}
                  className="hover:cursor-pointer"
                >
                  <InfoIcon sx={{ color: pink[500] }} />
                </div>
                <div>
                  <Modal
                    title="Here will be shown any request that was made from the customer."
                    open={isExtraInfoModalOpen}
                    onOk={handleExtraInfoOk}
                    keyboard
                    onCancel={handleExtraInfoCancel}
                  >
                    <div className=" w-full bg-gray-300 p-5 rounded-lg mx-1 my-5">
                      <p className=" font-bold text-red-500 text-xl">
                        "{extraInfo}"
                      </p>
                    </div>
                  </Modal>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "bookingUser",
      headerName: "Details",
      width: 70,
      renderCell: (params) => {
        const booking = params.row;
        const handleDetailsClick = () => {
          setSelectedBooking(booking);
          showDetailsModal(true);
          console.log(booking);
        };

        return (
          <div className="items-center text-center mx-auto">
            <>
              <div
                onClick={handleDetailsClick}
                className="hover:cursor-pointer"
              >
                <VisibilityIcon color="primary" />
              </div>
              {selectedBooking ? (
                <div>
                  <Modal
                    title="Details of the booking."
                    open={isDetailsModalOpen}
                    mask={false}
                    keyboard
                    onOk={handleDetailsModalOk}
                    onCancel={handleDetailsModalCancel}
                  >
                    <div className=" w-full bg-gray-300 p-5 rounded-lg mx-1 my-5">
                      <p className="font-bold text-2xl text-red-700">
                        Booking Customer Information !
                      </p>
                      <div className="flex flex-col text-lg gap-2">
                        <p className="font-bold">
                          Name:{" "}
                          <span className="font-semibold">
                            {selectedBooking?.bookingUser.userName}
                          </span>{" "}
                        </p>
                        <p className="font-bold">
                          Email:{" "}
                          <span className="font-semibold">
                            {selectedBooking?.bookingUser.email}
                          </span>{" "}
                        </p>
                        <p className="font-bold">
                          Phone number:
                          <span className="font-semibold">
                            {" "}
                            {selectedBooking?.bookingUser.phoneNumber}
                          </span>
                        </p>
                      </div>
                      <p className="font-bold text-2xl text-red-700 mt-2">
                        Booking Information:
                      </p>
                      <div className="flex flex-col text-lg gap-2 mt-2">
                        <p className="font-bold">
                          Time when the booking was made:
                          <br></br>
                          <span className="font-semibold">
                            {selectedBooking?.momentWhenBooked}
                          </span>
                        </p>
                        <p className="font-bold">
                          Booking starting time:{" "}
                          <span className="font-semibold">
                            {selectedBooking?.fromDate}
                          </span>
                        </p>
                        <p className="font-bold">
                          Booking ending time:
                          <span className="font-semibold">
                            {selectedBooking?.toDate}
                          </span>
                        </p>
                        <p className="font-bold">
                          Booking duration:
                          <span className="font-semibold">
                            {selectedBooking?.totalHours} {" hours = "}
                            {selectedBooking?.totalHours / 24} {"days"}
                          </span>
                        </p>
                        <p className="font-bold">
                          Booking total price:
                          <span className="font-bold ml-2 text-red-700">
                            {selectedBooking.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Modal>
                </div>
              ) : (
                <></>
              )}
            </>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    axios.get("/admin-bookings").then((response) => {
      // console.log(response.data);
      setBookingData(response.data);
    });
  }, []);

  // console.log(bookingData);
  useEffect(() => {
    const updatedRows = bookingData.map((booking) => ({
      id: booking._id,
      momentWhenBooked: booking.momentWhenBooked,
      car: `${booking.car.brand} ${booking.car.model}`,
      licensePlate: booking.car.licensePlate,
      fromDate: moment(booking.bookedTimeSlots.from).format(
        "DD MMM YYYY - HH:00"
      ),
      extraInfo: booking.extraInfo,
      toDate: moment(booking.bookedTimeSlots.to).format("DD MMM YYYY - HH:00"),
      totalHours: booking.totalHours,
      price: "$" + booking.price,
      bookingUser: booking.bookingUser,
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
