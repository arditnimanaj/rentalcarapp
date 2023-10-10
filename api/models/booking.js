const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, required: true },
  bookingUser: { type: mongoose.Schema.Types.ObjectId, required: true },
  bookedTimeSlots: {
    from: { type: String },
    to: { type: String },
  },
  totalHours: { type: Number },
  price: Number,
});

const BookingModel = mongoose.model("Booking", bookingSchema);
module.exports = BookingModel;
