import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import { UserContext } from "../UserContext";

const { RangePicker } = DatePicker;

export default function CarPage() {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [carData, setCarData] = useState(null);
  const [disabledDateRanges, setDisabledDateRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [from, setFrom] = useState("");

  const [to, setTo] = useState("");
  const [totalHours, setTotalHours] = useState();

  useEffect(() => {
    axios.get("allCars/" + id).then((response) => {
      const { data } = response;
      setCarData(data.carDoc);
      const disabledRanges = data.bookings.map((booking) => {
        return {
          from: moment(booking.bookedTimeSlots.from).format(
            "MMM DD YYYY HH:mm"
          ),
          to: moment(booking.bookedTimeSlots.to).format("MMM DD YYYY HH:mm"),
        };
      });
      setDisabledDateRanges(disabledRanges);
    });
  }, [id]);

  const disabledDate = (current) => {
    if (!current) {
      // If 'current' is not provided, don't disable any date
      return false;
    }
    // Get the current date
    const currentDate = current.format("YYYY-MM-DD");

    // console.log(disabledDateRanges);

    for (let i = 0; i < disabledDateRanges.length; i++) {
      const rangeFrom = moment(disabledDateRanges[i].from).format("YYYY-MM-DD");
      const rangeTo = moment(disabledDateRanges[i].to).format("YYYY-MM-DD");
      if (currentDate >= rangeFrom && currentDate <= rangeTo) {
        return true; // Disable the date if it falls within the range
      }
    }
  };

  function selectTimeSlots(values) {
    const selectedFrom = moment(values[0].$d);
    const selectedTo = moment(values[1].$d);
    console.log(selectedFrom);
    console.log(selectedTo);

    const isOverlap = disabledDateRanges.some((range) => {
      const rangeFrom = moment(range.from);
      const rangeTo = moment(range.to);

      // Check if the selected range overlaps with this booking range
      return (
        selectedFrom.isSameOrBefore(rangeTo) &&
        selectedTo.isSameOrAfter(rangeFrom)
      );
    });

    if (isOverlap) {
      alert(
        "Rezervimi juaj bie ne konflikt me rezervimet e tjera. Ju lutem zgjedhni data te tjera."
      );
    } else {
      setFrom(moment(values[0].$d).format("MMM DD YYYY HH:mm"));
      setTo(moment(values[1].$d).format("MMM DD YYYY HH:mm"));
      setTotalHours(selectedTo.diff(selectedFrom, "hours"));
    }
  }

  async function perfundoj() {
    const data = await axios.post("/booking", {
      car: carData._id,
      bookingUser: user._id,
      bookedTimeSlots: {
        from,
        to,
      },
      totalHours,
      price: (totalHours / 24) * carData.price,
    });
    console.log(data);
  }

  return (
    <div>
      {carData ? (
        <div className="flex flex-col">
          {carData.brand} {carData.model}
          <div>{carData.price}</div>
          <RangePicker
            showTime={false}
            format="MMM DD YYYY"
            onChange={selectTimeSlots}
            disabledDate={disabledDate}
          />
          {totalHours +
            " * " +
            carData.price +
            " = " +
            (totalHours / 24) * carData.price +
            "euro"}
          <button className="bg-red-200 max-w-2xl m-auto" onClick={perfundoj}>
            submit
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
