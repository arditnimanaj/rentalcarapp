import React from "react";
import rentLogo from "../../../logopng/logo-no-background.png";
import circle from "../../../logopng/circle-overlap-1.png";
import period from "../../../logopng/period-time.png";
import location from "../../../logopng/location.png";
import key from "../../../logopng/key.png";
import manageCars from "../../../logopng/car-manage.png";
import manageBookings from "../../../logopng/booking-manage.png";

function AboutComponent() {
  return (
    <div id="about" className="max-w-full">
      <div className="flex flex-col mx-auto text-center justify-items-center gap-4">
        <div className="text-center max-w-full items-center flex flex-col min-w-full mt-10">
          {/* <img
            src={rentLogo}
            className=" max-w-md grayscale hover:grayscale-0 mx-auto"
          /> */}
          <h1 className="mx-auto font-bold text-4xl">
            Quick & easy car rental platform
          </h1>
        </div>
        <div className="justify-around text-center flex p-4 gap-16 m-3 items-center ">
          <div className="flex flex-col items-center gap-3">
            <img
              src={circle}
              className="relative w-[120px] text-center items-center flex"
            ></img>

            <span className="font-bold text-lg font-sans ">Select Car</span>
            <p className="text-clip max-w-md text-gray-500">
              With a wide selection of models, features, and sizes, you're sure
              to discover a car that fits your unique preferences and needs.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img src={period} className="w-[120px]" />
            <span className="font-bold text-lg font-sans">
              Select period of rental time
            </span>
            <p className="max-w-md text-gray-500">
              We understand that every journey is different. Select from hourly,
              daily, or weekly rentals to align with your specific plans and
              budget.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img src={location} className="w-[120px]" />
            <span className="font-bold text-lg font-sans">Pick up the car</span>
            <p className="max-w-md text-gray-500">
              Pick up the car after you've chosen a spot that's most convenient
              for you, whether it's near your home, work, or the airport.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-auto text-center justify-items-center gap-4 mt-10 mb-10">
        <div className="text-center max-w-full items-center flex flex-col min-w-full">
          <h1 className="mx-auto font-bold text-4xl">For business owners</h1>
        </div>
        <div className="justify-around text-center flex p-4 gap-16 m-3 items-center ">
          <div className="flex flex-col items-center gap-3">
            <img
              src={key}
              className="relative w-[120px] text-center items-center flex"
            ></img>

            <span className="font-bold text-lg font-sans ">
              {" "}
              Sign up and provide all your information
            </span>
            <p className="text-clip max-w-md text-gray-500">
              Joining our platform is a breeze. Create an account in minutes and
              input your information, including personal details, payment
              methods, and contact information.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img src={manageCars} className="w-[120px] object-fill" />
            <span className="font-bold text-lg font-sans">
              Add & Manage your cars
            </span>
            <p className="max-w-md text-gray-500">
              If you're a car owner, our platform allows you to list your
              vehicles for rental. Share essential car information, including
              model, photos, pricing, and availability.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img src={manageBookings} className="w-[120px]" />
            <span className="font-bold text-lg font-sans">
              Manage your bookings
            </span>
            <p className="max-w-md text-gray-500">
              Easily keep track of your car's bookings, manage their
              availability, and make adjustments as needed.
            </p>
          </div>
        </div>
      </div>

      <div className="my-4 h-[180px] bg-gray-900 w-full  flex flex-col text-center items-center ">
        <p className=" items-center h-full flex gap-2 text-center text-6xl text-white font-bold ">
          Save your time & money with {"  "}
          <span className="text-[#d5a4a4]"> RentKOS</span>
        </p>
        <p className="text-white font-semibold flex items-center h-full">
          In mostly every city of Kosove !
        </p>
      </div>
    </div>
  );
}

export default AboutComponent;
