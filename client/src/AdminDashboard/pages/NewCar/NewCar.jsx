import React, { useState, useRef, useEffect } from "react";
import "./newcar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import { Form, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MuiFileInput } from "mui-file-input";
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
} from "@mui/material";
import Input from "@mui/material/Input";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function NewCar() {
  // verifiko nese jeni duke update ose kriju nje veture te re

  const { id } = useParams();
  const navigate = useNavigate();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState(5);
  const [fuel, setFuel] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [ac, setAc] = useState(true);
  const [minimumDriverAge, setMinimumDriverAge] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState("");

  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/carlist/" + id).then((response) => {
      const { data } = response;

      setBrand(data.brand);
      setModel(data.model);
      setLicensePlate(data.licensePlate);
      setType(data.type);
      setCapacity(data.capacity);
      setFuel(data.fuel);
      setGearbox(data.gearbox);
      setAc(data.ac);
      setMinimumDriverAge(data.minimumDriverAge);
      setPrice(data.price);
      setAddedPhotos(data.addedPhotos);

      toast.info(
        "You are editing " + data.brand + " me targa " + data.licensePlate,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    });
  }, [id]);

  async function addPhotoByLink(ev) {
    if (photoLink) {
      ev.preventDefault();
      const { data: fileName } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, fileName];
      });
      setPhotoLink("");
    } else alert("Ka ndodhur nje gabim gjate insertimit te fotos.");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: fileNames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...fileNames];
        });
      });
  }

  async function newCar(ev) {
    ev.preventDefault();
    const carData = {
      brand,
      model,
      licensePlate,
      type,
      capacity,
      addedPhotos,
      fuel,
      gearbox,
      ac,
      minimumDriverAge,
      price,
    };

    if (id) {
      // updating existing car
      await axios.put("/carlist", {
        id,
        ...carData,
      });
      navigate("/account/carlist");
    } else {
      //adding new car
      await axios.post("/cars", carData);

      //popup after adding new car
      toast.success("A new car has been added!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    //resetting form after submit
    // setBrand("");
    // setModel("");
    // setLicensePlate("");
    // setType("");
    // setCapacity("");
    // setFuel("");
    // setGearbox("");
    // setAc("");
    // setMinimumDriverAge("");
    // setPrice("");
    // setAddedPhotos([]);
  }

  return (
    <div className="newCar flex">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="mt-2 ml-auto w-full justify-between">
        <h1 className="font-bold items-center" style={{ color: "#0A6EBD" }}>
          <AddCircleIcon
            fontSize="large"
            style={{ color: "#0A6EBD", marginRight: "5px" }}
          />
          Add new car
        </h1>
        <form onSubmit={newCar} className="flex-col p-1 w-full gap-3">
          <div className="flex w-full">
            <Box
              sx={{
                // minWidth: 200,
                width: "40%",
                mt: 1,
                gap: "10px",
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControl fullWidth className="">
                <InputLabel id="demo-simple-select-label">Car Brand</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Car Brand"
                  required={true}
                  value={brand}
                  defaultValue={"Volkswagen"}
                  onChange={(ev) => setBrand(ev.target.value)}
                >
                  <MenuItem value="Audi">Audi</MenuItem>
                  <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                  <MenuItem value="Mercedes Benz">Mercedes Benz</MenuItem>
                  <MenuItem value="BMW">BMW</MenuItem>
                  <MenuItem value="Nissan">Nissan</MenuItem>
                  <MenuItem value="Toyota">Toyota</MenuItem>
                  <MenuItem value="Ford">Ford</MenuItem>
                  <MenuItem value="Peugeout">Peugeout</MenuItem>
                  <MenuItem value="Citroen">Citroen</MenuItem>
                  <MenuItem value="Renault">Renault</MenuItem>
                  <MenuItem value="Fiat">Fiat</MenuItem>
                </Select>
              </FormControl>
              {/* </Box> */}
              <TextField
                id="outlined-multiline-flexible"
                label="Car model"
                multiline
                required
                type="text"
                value={model}
                defaultValue=""
                onChange={(ev) => setModel(ev.target.value)}
                maxRows={4}
              />
              <TextField
                id="outlined-textarea"
                label="License Plate"
                placeholder="0X-XXX-XX"
                value={licensePlate}
                required
                onChange={(ev) => setLicensePlate(ev.target.value)}
                multiline
              />
              <FormControl>
                <InputLabel id="demo-simple-select-label">Car Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Car Typse"
                  value={type}
                  onChange={(ev) => setType(ev.target.value)}
                >
                  <MenuItem value="suv">SUV</MenuItem>
                  <MenuItem value="sedan">Sedan</MenuItem>
                  <MenuItem value="familycar">Family Car</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Car Seats</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Car seats"
                  value={capacity}
                  onChange={(ev) => setCapacity(ev.target.value)}
                >
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="7">7+</MenuItem>
                </Select>
              </FormControl>
              <div className="">
                <label>
                  Pick up your car fuel type:
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={fuel}
                    onChange={(ev) => setFuel(ev.target.value)}
                  >
                    <FormControlLabel
                      value="diesel"
                      control={<Radio />}
                      label="Diesel"
                    />
                    <FormControlLabel
                      value="petrol"
                      control={<Radio />}
                      label="Petrol"
                    />
                    <FormControlLabel
                      value="hybrid"
                      control={<Radio />}
                      label="Hybrid"
                    />
                  </RadioGroup>
                </label>
                <label>
                  Pick up your car gearbox:
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={gearbox}
                    onChange={(ev) => setGearbox(ev.target.value)}
                  >
                    <FormControlLabel
                      value="manual"
                      control={<Radio />}
                      label="Manual"
                    />
                    <FormControlLabel
                      value="automatic"
                      control={<Radio />}
                      label="Automatic"
                    />
                  </RadioGroup>
                </label>
              </div>

              <label>
                Does this car has A/C?
                <Checkbox
                  defaultChecked
                  onChange={(ev) => setAc(ev.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </label>
            </Box>
            <Box
              sx={{
                width: "60%",
                mt: 1,
                gap: "10px",
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                id="outlined-textarea"
                label="Minimum Driver Age"
                type="number"
                className="mt-2"
                placeholder="18"
                helperText="Driver can't be under 18."
                required
                onChange={(ev) => setMinimumDriverAge(ev.target.value)}
                multiline
              />
              <TextField
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
                label="Price per day"
                // id="outlined-start-adornment"
                // sx={{ width: "43ch" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">euro/24h</InputAdornment>
                  ),
                }}
              />

              <span className="font-bold" style={{ color: "#0A6EBD" }}>
                Photos
              </span>
              <div className="flex justify-between w-full">
                <Input
                  placeholder="Add photos using link..."
                  value={photoLink}
                  onChange={(ev) => setPhotoLink(ev.target.value)}
                />
                <Button
                  className="ml-5"
                  variant="outlined"
                  sx={{
                    borderRadius: "10px",
                    fontSize: "10px",
                    alignContent: "center",
                  }}
                  onClick={addPhotoByLink}
                  startIcon={<InsertLinkIcon />}
                >
                  Add Photo using Link
                </Button>
              </div>
              <div className=" p-2 grid gap-1 grid-rows-2 grid-cols-4 rounded-lg border-2 border-solid border-gray-600 w-full h-full items-center">
                {addedPhotos.length > 0 &&
                  addedPhotos.map((link) => (
                    <div>
                      <img
                        src={"http://127.0.0.1:4000/uploads/" + link}
                        alt=""
                        className="rounded-2xl w-40 h-30 "
                      />
                    </div>
                  ))}
              </div>
              <label>
                {" "}
                From file
                <input type="file" onChange={uploadPhoto} multiple />
              </label>
            </Box>
          </div>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "90%",
              alignContent: "center",
              color: "white",
              bgcolor: "#0A6EBD",
            }}
          >
            Save car
          </Button>
        </form>
      </div>
    </div>
  );
}
