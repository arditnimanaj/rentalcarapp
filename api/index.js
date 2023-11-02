const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const Booking = require("./models/booking.js");
const Car = require("./models/car.js");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const { userInfo } = require("os");
const moment = require("moment");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "asdfguiwrtjwnfi2343t4njsdf3";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { userName, email, password, isNewUser } = req.body;
  try {
    const userDoc = await User.create({
      userName,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      isNewUser,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { id: userDoc._id, email: userDoc.email, userName: userDoc.userName },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "internal error" });
          }
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Password not correct");
    }
  } else {
    res.json("User not found.");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const {
        userName,
        email,
        _id,
        isNewUser,
        businessName,
        phoneNumber,
        paymentMethods,
        pickupLocations,
        businessProfilePicture,
      } = await User.findById(user.id);

      res.json({
        userName,
        email,
        _id,
        isNewUser,
        businessName,
        phoneNumber,
        paymentMethods,
        pickupLocations,
        businessProfilePicture,
      });
    });
  } else {
    res.json(null);
  }
});

app.put("/update-profile", async (req, res) => {
  const { token } = req.cookies;
  const {
    businessName,
    phoneNumber,
    paymentMethods,
    pickupLocations,
    businessProfilePicture,
    businessSocialMedia,
  } = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const profile = await User.findById(user.id);
      profile.set({
        isNewUser: false,
        businessName,
        phoneNumber,
        paymentMethods,
        pickupLocations,
        businessProfilePicture,
        businessSocialMedia,
      });
      await profile.save();
      res.json(profile);
    });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/cars", (req, res) => {
  const { token } = req.cookies;
  const {
    brand,
    model,
    licensePlate,
    addedPhotos,
    type,
    capacity,
    fuel,
    gearbox,
    ac,
    minimumDriverAge,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const carDoc = await Car.create({
      owner: userData.id,
      brand,
      model,
      licensePlate,
      addedPhotos,
      type,
      capacity,
      fuel,
      gearbox,
      ac,
      minimumDriverAge,
      price,
    });
    res.json(carDoc);
  });
});

app.get("/user-carlist", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await Car.find({ owner: id }).populate("owner"));
  });
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.get("/user-carlist/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Car.findById(id));
});

app.put("/user-carlist", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    brand,
    model,
    licensePlate,
    addedPhotos,
    type,
    capacity,
    fuel,
    gearbox,
    ac,
    minimumDriverAge,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const carDoc = await Car.findById(id);
    if (userData.id === carDoc.owner.toString()) {
      carDoc.set({
        brand,
        model,
        licensePlate,
        addedPhotos,
        type,
        capacity,
        fuel,
        gearbox,
        ac,
        minimumDriverAge,
        price,
      });
      await carDoc.save();
      res.json("ok");
    }
  });
});

app.post("/allCars", async (req, res) => {
  const { fromDate, toDate } = req.body;

  // const fromDate = moment("Nov 02 2023 00:00").format("MMM DD YYYY HH:mm");
  // const toDate = moment("Nov 03 2023 00:00").format("MMM DD YYYY HH:mm");

  Booking.find({})
    .then(async (bookings) => {
      const excludedCarIds = [];
      // Use JavaScript to filter bookings based on date range
      bookings.forEach((booking) => {
        const bookingFrom = moment(booking.bookedTimeSlots.from).format(
          "MMM DD YYYY HH:mm"
        );
        const bookingTo = moment(booking.bookedTimeSlots.to).format(
          "MMM DD YYYY HH:mm"
        );

        const isFromBetween = moment(fromDate).isBetween(
          bookingFrom,
          bookingTo
        );

        const isToBetween = moment(toDate).isBetween(bookingFrom, bookingTo);

        // Check if the booking's time range overlaps with the specified date range

        if (isFromBetween || isToBetween) {
          excludedCarIds.push(booking.car);
        }
      });

      // Now you have filtered bookings; you can proceed with your MongoDB query
      // to fetch the cars that are not booked during the specified date range.
      // You can use the IDs of filtered bookings to exclude them in the query.

      const availableCars = await Car.find({
        _id: { $nin: excludedCarIds },
      });

      res.json(availableCars);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/allCars/:id", async (req, res) => {
  const id = req.params.id;
  const carDoc = await Car.findById(id);
  const bookings = await Booking.find({ car: id });

  res.json({ carDoc, bookings });
});

app.post("/booking", async (req, res) => {
  const {
    car,
    bookingUser,
    price,
    bookedTimeSlots: { from, to },
    totalHours,
  } = req.body;
  Booking.create({
    car,
    bookingUser,
    price,
    bookedTimeSlots: { from, to },
    totalHours,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/pickup-locations", async (req, res) => {
  try {
    // Fetch all users from the database.
    const users = await User.find({}, "pickupLocations");

    // Extract and combine pickup locations into a single array.
    let allPickupLocations = [];
    users.forEach((user) => {
      if (user.pickupLocations && user.pickupLocations.length > 0) {
        allPickupLocations = allPickupLocations.concat(user.pickupLocations);
      }
    });

    // Remove duplicates from the array.
    const uniquePickupLocations = [...new Set(allPickupLocations)];

    res.json(uniquePickupLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/random-cars", async (req, res) => {
  try {
    const cars = await Car.aggregate([{ $sample: { size: 4 } }]); // This fetches 4 random cars from the collection
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(4000);
