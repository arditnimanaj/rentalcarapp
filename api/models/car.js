const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  brand: String,
  model: String,
  photos: [String],
  licensePlate: String,
  type: String,
  capacity: Number,
  fuel: String,
  gearbox: String,
  ac: Boolean,
  minimumDriverAge: Number,
  price: Number,
  isBooked: { type: Boolean, default: false },
});

const CarModel = mongoose.model("Car", carSchema);

module.exports = CarModel;
