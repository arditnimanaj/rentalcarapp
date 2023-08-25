const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const Car = require("./models/car.js");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

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

app.get("/allCars", async (req, res) => {
  res.json(await Car.find());
});

app.get("/filteredCars", async (req, res) => {
  const cars = await Car.find().populate({
    path: "owner",
    match: { pickupLocations: "Istog" },
    select: "pickupLocations",
  });
  res.json(cars);
});

app.listen(4000);
