import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, Modal } from "antd";
import { Button } from "antd";
import moment from "moment";
import { Rate } from "antd";
import { Input } from "antd";

const { TextArea } = Input;
const { Meta } = Card;

function MyBookings() {
  const [myBookings, setMyBookings] = useState([]);
  const [starsReview, setStarsReview] = useState("");
  const [descriptionReview, setDescriptionReview] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Check if today's date is between fromDate and toDate
    if (selectedBooking) {
      // Check if today's date is between fromDate and toDate
      const today = new Date();
      const fromDate = moment(selectedBooking.bookedTimeSlots.from);
      const toDate = moment(selectedBooking.bookedTimeSlots.to);

      setIsActive(moment().isBetween(moment(fromDate), moment(toDate)));
    }
  }, [selectedBooking]);

  const showModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
    try {
      axios.get("/get-review/" + booking._id).then((response) => {
        const review = response.data;

        setDescriptionReview(review.descriptionReview);
        setStarsReview(review.starsReview);
      });

      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching review data:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    axios.get("/my-bookings").then((response) => {
      setMyBookings(response.data);
    });
  }, []);

  const saveReview = async () => {
    if (selectedBooking) {
      try {
        await axios.put("update-booking", {
          bookingId: selectedBooking._id,
          starsReview: starsReview,
          descriptionReview: descriptionReview,
        });
        // You can also add logic to handle a successful submission, e.g., clear form fields, display a message, etc.
      } catch (error) {
        console.error("Error submitting review:", error);
        // Handle error, e.g., display an error message to the user
      }
    }
    setIsModalVisible(false);
  };
  return (
    <div className="mt-20">
      <Modal
        title="Booking Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {selectedBooking && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="font-bold flex gap-2">
                Car:{" "}
                <p className="font-semibold text-red-400">
                  {selectedBooking.car.brand} {selectedBooking.car.model}
                </p>
              </p>
              {isActive ? (
                <h1 className="font-bold text-md text-green-700">
                  Your booking status: Active
                </h1>
              ) : (
                <h1 className=" font-bold text-md text-red-700">
                  {" "}
                  Your booking status: Not Active
                </h1>
              )}
            </div>
            <p className="font-bold flex gap-2">
              Booking Date:
              <p className="font-semibold text-red-400">
                {selectedBooking.momentWhenBooked}
              </p>
            </p>
            <p className="font-bold  flex gap-2">
              From:{" "}
              <p className="font-semibold text-red-400">
                {selectedBooking.bookedTimeSlots.from}
              </p>
            </p>
            <p className="font-bold flex gap-2">
              To:{" "}
              <p className="font-semibold text-red-400">
                {selectedBooking.bookedTimeSlots.to}
              </p>
            </p>
            <p className="font-bold flex gap-2">
              Total Price:{" "}
              <p className="font-bold text-red-700">${selectedBooking.price}</p>
            </p>
            <div className="text-center items-center justify-between bg-gray-200 px-4 py-4 rounded-2xl flex flex-col gap-2 mt-2">
              <h1>Write a review</h1>
              <Rate
                defaultValue={"4"}
                value={starsReview}
                onChange={(value) => {
                  setStarsReview(value);
                }}
              />
              <TextArea
                rows={4}
                value={descriptionReview}
                onChange={(ev) => {
                  setDescriptionReview(ev.target.value);
                }}
                placeholder="Please write a review about your experience with our company."
              />
              <Button
                type="primary"
                onClick={() => saveReview(selectedBooking)}
              >
                Submit review
              </Button>
            </div>
          </div>
        )}
      </Modal>
      {myBookings ? (
        <div className="grid grid-cols-4 py-4 px-4">
          {myBookings.map((booking) => {
            return (
              <div>
                <Card
                  key={booking.id}
                  onClick={() => showModal(booking)}
                  hoverable // Add a unique key for each card
                  className="max-w-fit shadow-lg border"
                  cover={
                    <img
                      alt={booking.car.brand + " " + booking.car.model}
                      src={
                        "http://localhost:4000/uploads/" +
                        booking.car.addedPhotos[0]
                      }
                      style={{
                        minWidth: "200px",
                        maxWidth: "300px",
                        minHeight: "300px",
                        maxHeight: "300px",
                      }}
                    />
                  }
                >
                  <Meta
                    title={booking.car.brand + " " + booking.car.model}
                    description={`Booking Date: ${booking.momentWhenBooked}`}
                  />
                  <div className="py-2">
                    {moment().isBetween(
                      moment(booking?.bookedTimeSlots.from),
                      moment(booking?.bookedTimeSlots.to)
                    ) ? (
                      <h1 className="font-bold text-md text-green-700">
                        Your booking status: Active
                      </h1>
                    ) : (
                      <h1 className=" font-bold text-md text-red-700">
                        {" "}
                        Your booking status: Not Active
                      </h1>
                    )}
                    <p className="font-bold">
                      From:
                      <span className="text-red-400">
                        {" "}
                        {booking.bookedTimeSlots.from}
                      </span>
                    </p>
                    <p className="font-bold">
                      To:
                      <span className="text-red-400">
                        {" "}
                        {booking.bookedTimeSlots.to}
                      </span>
                    </p>
                    <p className="font-bold">
                      Total Price:
                      <span className="text-red-400"> ${booking.price}</span>
                    </p>
                  </div>
                  <div className="justify-center flex mx-auto py-3">
                    <Button type="primary" danger>
                      See details
                    </Button>
                  </div>
                </Card>
              </div>
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
