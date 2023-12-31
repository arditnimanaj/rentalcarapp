const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  userName: String,
  email: { type: String, unique: true },
  password: String,
  businessName: String,
  phoneNumber: String,
  pickupLocations: [String],
  paymentMethods: [String],
  isNewUser: Boolean,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
