import React from "react";

import { Button } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import manualTransmission from "../../../logopng/manual-transmission.svg";
import automaticTransmission from "../../../logopng/automatic-transmission.svg";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PeopleIcon from "@mui/icons-material/People";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import moment from "moment";
function CarCard({ cars, fromDate, toDate }) {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[1];
  // if (subpage === "filteredCars") {
  //   console.log(subpage);
  // }
  console.log(fromDate);
  console.log(toDate);
  const difference = moment(toDate).diff(fromDate, "hours");
  return (
    <>
      {cars.length > 0 &&
        cars.map((car) => (
          <Link to={"/car/" + car._id} key={car._id}>
            <div className="border rounded-3xl shadow-2xl shadow-cyan-950 p-5">
              <div>
                <img
                  className="rounded-3xl object-cover w-full h-full aspect-square opacity-70 hover:opacity-100 grayscale hover:grayscale-0"
                  src={"http://localhost:4000/uploads/" + car.addedPhotos?.[0]}
                ></img>{" "}
              </div>
              <div className="mt-4">
                <h2 className=" text-xs uppercase font-poppins text-gray-600">
                  {car.type}
                </h2>
                <h2 className="font-bold text-lg font-poppins uppercase">
                  {car.brand + " " + car.model}
                </h2>
                <div className="flex justify-between text-lg text-red-700 font-bold font-poppins uppercase">
                  <h2 className="">{car.price} $/day</h2>
                  {fromDate ? (
                    <h2>
                      Total price: {((difference * car.price) / 24).toFixed()} $
                    </h2>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex gap-5 text-center items-center justify-around uppercase text-sm mt-4">
                {car.gearbox === "manual" ? (
                  <div className="flex flex-col text-center items-center">
                    <div className="border rounded-full p-2 max-w-fit  bg-gray-400">
                      <img src={manualTransmission} className="max-w-[22px] " />
                    </div>
                    <p>{car.gearbox}</p>
                  </div>
                ) : (
                  <div className="flex flex-col text-center items-center">
                    <div className="border rounded-full p-2 max-w-fit  bg-gray-400 ">
                      <img
                        src={automaticTransmission}
                        className="max-w-[22px]"
                      />
                    </div>
                    <p> automatic</p>
                  </div>
                )}
                <div className="flex flex-col  ">
                  <div className="border rounded-full p-2 max-w-fit flex bg-gray-400">
                    <LocalGasStationIcon className="" />
                  </div>
                  <div>{car.fuel}</div>
                </div>
                {car.ac ? (
                  <div className="flex flex-col text-center items-center">
                    <div className="border rounded-full p-2 max-w-fit flex  bg-gray-400 ">
                      <AcUnitIcon />
                    </div>
                    <p className="">With AC</p>
                  </div>
                ) : (
                  <div className="flex flex-col text-center items-center">
                    <p>Without AC</p>
                    <div className="border rounded-full p-2 max-w-fit flex  bg-gray-400">
                      <AcUnitIcon />
                    </div>
                  </div>
                )}
                <div className="flex flex-col text-center items-center ">
                  <div className="border rounded-full p-2 max-w-fit flex  bg-gray-400">
                    <PeopleIcon />
                  </div>
                  <p>{car.capacity} seats</p>
                </div>
              </div>
              <div className="mx-auto text-center p-2 mt-4">
                <button className="font-sans uppercase text-sm  p-3 border rounded-2xl bg-black hover:bg-cyan-900 text-white">
                  See details
                </button>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
}

export default CarCard;
