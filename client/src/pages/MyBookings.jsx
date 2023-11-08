import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [myBookings, setMyBookings] = useState([]);
  useEffect(() => {
    axios.get("/my-bookings").then((response) => {
      setMyBookings(response.data);
    });
  }, []);
  return (
    <div className="mt-20">
      {myBookings ? (
        <div className="">
          {myBookings.map((booking) => {
            return (
              <>
                <div className="">{booking._id}</div>
                <div className="">{booking.bookedTimeSlots.from}</div>
                <div className="">{booking.bookedTimeSlots.to}</div>
                <div className="">
                  {booking.car.brand} {booking.car.model}
                </div>
                <div className="">{booking.price}</div>
                <br></br>
              </>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MyBookings;
