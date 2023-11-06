import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import { UserContext } from "../UserContext";
import dayjs from "dayjs";
import { Place } from "@material-ui/icons";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import manualTransmission from "../../../logopng/manual-transmission.svg";
import automaticTransmission from "../../../logopng/automatic-transmission.svg";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PeopleIcon from "@mui/icons-material/People";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BusinessIcon from "@mui/icons-material/Business";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PaymentIcon from "@mui/icons-material/Payment";
const { RangePicker } = DatePicker;

export default function CarPage() {
  const { id, fromDate: initialFromDate, toDate: initialToDate } = useParams();
  const { user } = useContext(UserContext);

  const [carData, setCarData] = useState(null);
  const [disabledDateRanges, setDisabledDateRanges] = useState([]);
  const [fromDate, setFromDate] = useState(initialFromDate);
  const [toDate, setToDate] = useState(initialToDate);
  const [totalHours, setTotalHours] = useState();
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
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

    //disable past dates so the user cannot book in the past
    if (currentDate < moment().format("YYYY-MM-DD")) {
      return true;
    }

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

    // console.log(selectedFrom);
    // console.log(selectedTo);

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
      setFromDate(moment(values[0].$d).format("MMM DD YYYY HH:mm"));
      setToDate(moment(values[1].$d).format("MMM DD YYYY HH:mm"));
      setTotalHours(selectedTo.diff(selectedFrom, "hours"));
    }
  }

  async function saveBooking() {
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
    // console.log(data);
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen top-12">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">
              Photos of {carData.brand} {carData.model}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-[82px] flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          {carData?.addedPhotos?.length > 0 &&
            carData.addedPhotos.map((photo) => (
              <div>
                <img src={"http://localhost:4000/uploads/" + photo} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {carData ? (
        <div>
          <div className="flex justify-between mt-16 px-8 py-8 bg-gray-200 h-screen">
            <div className=" w-1/2">
              <div className="flex justify-between mx-5 py-5">
                <div className="w-[60%]">
                  <div className="flex text-center gap-2">
                    <h2 className="text-2xl font-bold items-center">
                      {carData.brand} {carData.model}
                    </h2>
                    <h2 className=" text-red-900 font-semibold">
                      {carData.price}$/day
                    </h2>
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col gap-2 p-1">
                      {carData.gearbox === "manual" ? (
                        <div className="flex text-center items-center gap-2">
                          <div className="border rounded-full p-2 max-w-fit  bg-gray-400">
                            <img
                              src={manualTransmission}
                              className="max-w-[22px] "
                            />
                          </div>
                          <p className="uppercase font-medium">
                            {carData.gearbox}
                          </p>
                        </div>
                      ) : (
                        <div className="flex text-center items-center gap-2">
                          <div className="border rounded-full p-2 max-w-fit  bg-gray-400 ">
                            <img
                              src={automaticTransmission}
                              className="max-w-[22px]"
                            />
                          </div>
                          <p className="uppercase font-medium"> automatic</p>
                        </div>
                      )}
                      <p className="flex text-center items-center gap-2">
                        <div className="border rounded-full p-2 max-w-fit flex bg-gray-400">
                          <LocalGasStationIcon className="" />
                        </div>
                        <p className="uppercase font-medium">{carData.fuel}</p>
                      </p>
                      {carData.ac ? (
                        <div className="flex gap-2 text-center items-center">
                          <div className="border rounded-full p-2 max-w-fit flex  bg-gray-400 ">
                            <AcUnitIcon />
                          </div>
                          <p className="uppercase font-medium">With AC</p>
                        </div>
                      ) : (
                        <div className="flex gap-2 text-center items-center">
                          <p className="uppercase font-medium">Without AC</p>
                          <div className="border rounded-full p-2 max-w-fit flex  bg-gray-400">
                            <AcUnitIcon />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 p-1">
                      <div className="flex gap-2 text-center items-center ">
                        <p className="uppercase font-medium">
                          {carData.capacity} seats
                        </p>
                        <div className="border rounded-full p-2 max-w-fit flex  bg-gray-400">
                          <PeopleIcon />
                        </div>
                      </div>
                      <div className="flex gap-2 text-center items-center ">
                        <p className="uppercase font-medium">{carData.type}</p>
                        <div className="border rounded-full p-2 max-w-fit flex  bg-gray-400">
                          <DirectionsCarIcon />
                        </div>
                      </div>
                      <div className="flex gap-2 text-center items-center ">
                        <p className="uppercase font-medium">
                          Minimum Driver Age
                        </p>
                        <div className="border rounded-full p-[5px] max-w-fit flex  bg-gray-400">
                          <span className="font-bold">
                            {carData.minimumDriverAge}+
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-2 py-2">
                  <div className="flex gap-2 items-center">
                    <BusinessIcon />
                    <h2 className="text-xl font-semibold text-gray-700">
                      {carData.owner.businessName}
                    </h2>
                  </div>
                  <div className="flex gap-2 items-center mt-2">
                    <LocalPhoneIcon />
                    <h2 className="text-lg font-semibold text-gray-700">
                      {carData.owner.phoneNumber}
                    </h2>
                  </div>
                  <div className="flex gap-2 mt-2 items-start">
                    <PaymentIcon className="mt-[3px]" />
                    <div>
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold text-gray-700">
                          Payment Methods:
                        </span>
                        <div className="text-start ml-3">
                          {carData?.owner?.paymentMethods.map((payment) => (
                            <li className=" text-md font-semibold text-gray-700 first-letter:uppercase">
                              {payment.toString().replace("-", " ")}
                            </li>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full justify-between">
                <RangePicker
                  showTime={{ format: "HH" }}
                  format="MMM-DD-YYYY HH"
                  className="flex max-w-fit"
                  onChange={selectTimeSlots}
                  disabledDate={disabledDate}
                  defaultValue={
                    fromDate ? [dayjs(fromDate), dayjs(toDate)] : null
                  }
                />

                {moment(toDate).diff(moment(fromDate), "hours") / 24 +
                  " days * " +
                  carData.price +
                  " = " +
                  (totalHours / 24) * carData.price +
                  "euro"}
                <button
                  className="bg-red-200 max-w-2xl m-auto"
                  onClick={saveBooking}
                >
                  submit
                </button>
              </div>
            </div>

            <div className="w-1/2 relative">
              <div className="border rounded-2xl shadow-cyan-950 p-4 shadow-xl">
                <div className="grid gap-3 grid-cols-[2fr_1fr] ">
                  <div
                    onClick={() => setShowAllPhotos(true)}
                    className="hover:cursor-pointer"
                  >
                    {carData.addedPhotos?.[0] && (
                      <img
                        className="aspect-square object-cover rounded-2xl"
                        src={
                          "http://localhost:4000/uploads/" +
                          carData.addedPhotos[0]
                        }
                      ></img>
                    )}
                  </div>
                  <div
                    className="grid hover:cursor-pointer "
                    onClick={() => setShowAllPhotos(true)}
                  >
                    {carData.addedPhotos?.[1] && (
                      <img
                        className="aspect-square object-cover rounded-2xl"
                        src={
                          "http://localhost:4000/uploads/" +
                          carData.addedPhotos[1]
                        }
                      ></img>
                    )}
                    <div
                      onClick={() => setShowAllPhotos(true)}
                      className=" overflow-hidden hover:cursor-pointer"
                    >
                      {carData.addedPhotos?.[2] && (
                        <img
                          className="aspect-square object-cover relative top-2 rounded-2xl"
                          src={
                            "http://localhost:4000/uploads/" +
                            carData.addedPhotos[2]
                          }
                        ></img>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowAllPhotos(true)}
                className="flex gap-1 absolute bottom-[192px] right-6 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Show more photos
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
