import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import axios from "axios";
import bmwCar from "../../../logopng/bmwCar.png";
import rentLogo from "../../../logopng/logo-no-background.png";
import whiteRentLogo from "../../../logopng/logo-white-removebg.png";
import SearchComponent from "../components/SearchComponent";
import bmwLogo from "../../../logopng/bmw-logo.png";
import audiLogo from "../../../logopng/audi-14.png";
import benzLogo from "../../../logopng/mercedes-benz.png";
import teslaLogo from "../../../logopng/tesla-9.svg";
import volkswagenLogo from "../../../logopng/volkswagen-1.png";
import skodaLogo from "../../../logopng/skoda.png";
import "../index.css";
import AboutComponent from "../components/AboutComponent";
import Footer from "../components/Footer";
import ContactCard from "../components/ContactCard";
import { HashLink } from "react-router-hash-link";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
export default function IndexPage() {
  const [isLoading, setIsloading] = useState(true);
  const [randomCars, setRandomCars] = useState({});
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    axios.get("/random-cars").then((response) => {
      setRandomCars(response.data);
      // console.log(response);
      setIsloading(false);
    });
  }, []);

  return (
    <div className="" id="head">
      <div className="flex items-center gap-2 justify-around my-20 p-4 max-sm:flex-col">
        <div className="flex flex-col gap-2 text-center  text-cyan-950 items-center max-sm:w-full max-sm:flex">
          <span className="font-roboto  text-lg text-center">
            Rent your ride with{" "}
            <span className="font-bold text-xl">RentKOS</span> now.
          </span>
          <span className="text-5xl italic text-center font-bold max-w-xl">
            Explore a wide range of cars for your travel needs.
            {/* Use <span className="text-red-00">RentKOS</span> for cheaper and
            better options! */}
          </span>
          <div id="book" className="max-w-fit">
            <p className="text-center text-gray-500">
              Rent the car of your dreams. Unbeatable prices, unlimited miles,
              flexible pick-up options and much more.
            </p>
          </div>
          <div className="flex gap-4 justify-around text-center items-center mt-4">
            <HashLink smooth to="/#book" className="text-white font-poppins">
              <button className="border p-3 text-md font-bold uppercase  bg-black text-white hover:bg-cyan-950">
                Book
              </button>
            </HashLink>

            <HashLink smooth to="/#about" className="text-white font-poppins">
              <button className="border p-3 text-md font-bold uppercase  bg-black text-white hover:bg-cyan-950">
                How does this work
              </button>
            </HashLink>
          </div>

          {/* <img src={rentLogo} className="opacity-20 w-[400px] absolute" /> */}
        </div>
        <img src={bmwCar} className="w-[700px] p-2" />
      </div>

      <SearchComponent cars={randomCars} />

      {/* car logos */}
      <div className="max-w-full flex justify-around p-2  opacity-20 my-10 max-sm:hidden ">
        <img src={bmwLogo} className="w-[120px] object-contain "></img>
        <img src={audiLogo} className="w-[120px] object-contain "></img>
        <img src={benzLogo} className="w-[120px] object-contain "></img>
        <img src={teslaLogo} className="w-[120px] object-contain "></img>
        <img src={volkswagenLogo} className="w-[120px] object-contain "></img>

        <img src={skodaLogo} className="w-[120px] object-contain "></img>
      </div>
      {/* {console.log(randomCars)} */}
      <div className="">
        {isLoading ? (
          <div className="w-full mx-auto flex justify-center my-5 ">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 54,
                  }}
                  spin
                />
              }
            />
          </div>
        ) : (
          <div className=" m-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-2 justify-between sm:grid-cols-1">
            <CarCard cars={randomCars} />
          </div>
        )}
      </div>
      <AboutComponent />
      <ContactCard />
      <Footer />
    </div>

    // <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-2">
    //   {cars.length > 0 &&
    //     cars.map((car) => (
    //       <Link to={"/allCars/" + car._id}>
    //         <div className="bg-gray-400 rounded-2xl flex">
    //           {car.addedPhotos?.[0] && (
    //             <img
    //               className="rounded-2xl object-cover w-full h-full aspect-square"
    //               src={
    //                 "http://localhost:4000/uploads/" + car.addedPhotos?.[0]
    //               }
    //             />
    //           )}
    //           {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#191919" fill-rule="evenodd" d="M9 4V2h2v2H9zm4 18V2h2v20h-2zM9 10V8h2v2H9zm0 6v-2h2v2H9zm0 6v-2h2v2H9z" clip-rule="evenodd"></path></svg> */}
    //         </div>
    //         <h2 className="text-sm">{car.brand + " " + car.model}</h2>
    //         <h2 className="text-sm">{car.fuel + " " + car.gearbox}</h2>
    //         <h2 className="text-sm">{car.brand + " " + car.model}</h2>
    //         <h3 className="font-bold">{car.price} $/day</h3>
    //       </Link>
    //     ))}
    // </div>
  );
}
