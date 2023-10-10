import React, { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
export default function IndexPage() {
  const [cars, setCars] = useState([]);
  // useEffect(() => {
  //   // axios.get("/filteredCars").then((response) => {
  //   //   console.log(response);
  //   // });
  //   axios.get("/allCars").then((response) => {
  //     setCars(response.data);
  //     // console.log(cars);
  //   });
  // }, []);

  function showValues(values) {
    const fromDate = moment(values[0].$d).format("MMM DD YYYY HH:mm");
    const toDate = moment(values[1].$d).format("MMM DD YYYY HH:mm");

    axios.post("/allCars", { fromDate, toDate }).then((response) => {
      setCars(response.data);
    });
  }

  return (
    <>
      <RangePicker onChange={showValues} showTime={false}></RangePicker>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-2">
        {cars.length > 0 &&
          cars.map((car) => (
            <Link to={"/allCars/" + car._id}>
              <div className="bg-gray-400 rounded-2xl flex">
                {car.addedPhotos?.[0] && (
                  <img
                    className="rounded-2xl object-cover w-full h-full aspect-square"
                    src={
                      "http://localhost:4000/uploads/" + car.addedPhotos?.[0]
                    }
                  />
                )}
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#191919" fill-rule="evenodd" d="M9 4V2h2v2H9zm4 18V2h2v20h-2zM9 10V8h2v2H9zm0 6v-2h2v2H9zm0 6v-2h2v2H9z" clip-rule="evenodd"></path></svg> */}
              </div>
              <h2 className="text-sm">{car.brand + " " + car.model}</h2>
              <h2 className="text-sm">{car.fuel + " " + car.gearbox}</h2>
              <h2 className="text-sm">{car.brand + " " + car.model}</h2>
              <h3 className="font-bold">{car.price} $/day</h3>
            </Link>
          ))}
      </div>
    </>
  );
}
