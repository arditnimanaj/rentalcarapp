import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { Select } from "antd";
import { DatePicker } from "antd";
import { Link } from "react-router-dom";

const { RangePicker } = DatePicker;
export default function SearchComponent() {
  const [pickupLocations, setPickupLocations] = useState([]);
  const [selectedPickupLocation, setSelectedPickupLocation] = useState([]);
  const [cars, setCars] = useState({});

  const submitValues = (value) => {
    console.log(`selected ${value}`);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    axios.get("/pickup-locations").then((response) => {
      setPickupLocations(response.data);
    });
  }, []);

  const pickupLocationOptions = pickupLocations.map((location) => ({
    value: location,
    label: location,
  }));

  function showValues(values) {
    const fromDate = moment(values[0].$d).format("MMM DD YYYY HH:mm");
    const toDate = moment(values[1].$d).format("MMM DD YYYY HH:mm");
    console.log(fromDate);
    console.log(toDate);
    axios.post("/allCars", { fromDate, toDate }).then((response) => {
      setCars(response.data);
    });
    // console.log(cars);
  }

  const disabledDate = (current) => {
    return current && current < moment().endOf("day");
  };

  return (
    <div className="flex mx-auto justify-between gap-4 border rounded-3xl  max-w-fit p-4 shadow-2xl shadow-cyan-950 ">
      <div className="flex flex-col">
        <span className="flex font-roboto font-bold items-center text-center mb-2 gap-1 uppercase">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Pickup and return date
        </span>

        <RangePicker
          onChange={showValues}
          showTime={{ format: "HH" }}
          disabledDate={disabledDate}
          size={"large"}
        ></RangePicker>
      </div>

      <div className="">
        <span className="flex  font-roboto font-bold items-center text-center mb-2 gap-1 uppercase">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          Pickup Location
        </span>
        <Select
          size="large"
          style={{
            minWidth: 300,
          }}
          showSearch
          placeholder="Select a pickup location"
          optionFilterProp="children"
          // onChange={onChange}
          filterOption={filterOption}
          options={pickupLocationOptions}
        />
      </div>

      <div className="flex text-center mx-auto p-2">
        <Link to={"/filteredCars"} className="mx-auto flex">
          <button
            type="submit"
            className="border rounded-xl bg-black hover:bg-cyan-950 text-white font-poppins font-bold p-2 w-40 h-15 text-center uppercase"
            onClick={submitValues}
          >
            Search...
          </button>
        </Link>
      </div>
    </div>
  );
}
