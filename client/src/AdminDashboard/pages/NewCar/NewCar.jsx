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
  const [engineCapacity, setEngineCapacity] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState(5);
  const [fuel, setFuel] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [ac, setAc] = useState(true);
  const [minimumDriverAge, setMinimumDriverAge] = useState(18);
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState("");

  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/user-carlist/" + id).then((response) => {
      const { data } = response;
      console.log(data);
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

  function removePhoto(ev, fileName) {
    ev.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== fileName)]);
    console.log(addedPhotos);
  }

  function setAsFavoritePhoto(ev, fileName) {
    ev.preventDefault();

    setAddedPhotos([
      fileName,
      ...addedPhotos.filter((photo) => photo !== fileName),
    ]);
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
      await axios.put("/user-carlist", {
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
                  <MenuItem value="convertible">Convertible</MenuItem>
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
                  {" "}
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="7+">7</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="outlined-textarea"
                label="Engine Capacity"
                placeholder="2000cc"
                value={licensePlate}
                required
                onChange={(ev) => setLicensePlate(ev.target.value)}
                multiline
              />
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
                    <FormControlLabel
                      value="electric"
                      control={<Radio />}
                      label="Electric"
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
                value={minimumDriverAge}
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
              <div className=" p-2 grid gap-2 grid-rows-2 grid-cols-4 rounded-lg border-2 border-solid border-gray-600 w-full h-full items-center">
                {addedPhotos.length > 0 &&
                  addedPhotos.map((link) => (
                    <div key={link} className="flex relative h-30">
                      <img
                        onClick={() => console.log(link)}
                        src={"http://127.0.0.1:4000/uploads/" + link}
                        alt=""
                        className="rounded-2xl w-full h-30 object-cover"
                      />
                      <button
                        onClick={(ev) => removePhoto(ev, link)}
                        className="absolute bottom-1 right-2 text-white bg-gray-800 rounded-2xl p-1 opacity-80 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(ev) => setAsFavoritePhoto(ev, link)}
                        className="absolute bottom-1 left-2 text-white bg-gray-800 rounded-2xl p-1 opacity-80 cursor-pointer"
                      >
                        {link === addedPhotos[0] && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-5 h-5"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        )}
                        {link !== addedPhotos[0] && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        )}
                      </button>
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
