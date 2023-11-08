const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  bookingUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  carOwner: { type: mongoose.Schema.Types.ObjectId, required: true },
  bookedTimeSlots: {
    from: { type: String },
    to: { type: String },
  },
  momentWhenBooked: { type: String },
  totalHours: { type: Number },
  price: Number,
  extraInfo: { type: String },
});

const BookingModel = mongoose.model("Booking", bookingSchema);
module.exports = BookingModel;
