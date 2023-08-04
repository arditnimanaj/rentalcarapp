import "../ProfilePage/profilepage.css";
import React, { useState, useRef, useEffect } from "react";
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
  FormGroup,
  InputAdornment,
  Radio,
  RadioGroup,
} from "@mui/material";
import Input from "@mui/material/Input";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhotosUploader from "../../components/photosUploader/photosUploader";

// Fillimisht me nevojiten:
// 1. Emri i biznesit
// 2. Nr i telefonit
// 3. Menyra e pageses
// 4. Lokacioni i pranimit te vetures
// 5. Fotografia e profilit te biznesit
// 6. Link per social Media tjera

export default function ProfilePage() {
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [pickupLocation, setPickupLocation] = useState("");
  const [businessProfilePicture, setBusinessProfilePicture] = useState("");
  const [businessSocialMedia, setBusinessSocialMedia] = useState("");

  const handleCheckbox = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setPaymentMethods((paymentMethods) => [...paymentMethods, value]);
    } else {
      setPaymentMethods((paymentMethods) =>
        paymentMethods.filter((method) => method !== value)
      );
    }
  };

  // async function updateProfile() {
  //   const updatedProfileData = {
  //     businessName,
  //     phoneNumber,
  //     pickupLocation,
  //     paymentMethods,
  //   };

  //   await axios.put("/update-profile", {
  //     ...updatedProfileData,
  //   });
  // }

  axios.get("/profile").then((response) => {
    const { data } = response;
  });

  return (
    <div className="profilePage flex">
      <div className="mt-2 ml-auto w-full justify-between">
        <h1 className="font-bold items-center" style={{ color: "#0A6EBD" }}>
          <AccountCircleIcon
            fontSize="large"
            style={{ color: "#0A6EBD", marginRight: "5px" }}
          />
          Update your profile
        </h1>
        <form className="flex-col p-1 w-full gap-3">
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
              {/* <FormControl fullWidth className="">
                <InputLabel id="demo-simple-select-label">Car Brand</InputLabel>
               
              </FormControl> */}
              {/* </Box> */}
              <TextField
                id="outlined-multiline-flexible"
                label="Emri i biznesit"
                required
                type="text"
                defaultValue=""
                value={businessName}
                onChange={(ev) => setBusinessName(ev.target.value)}
                maxRows={4}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Numri i telefonit"
                required
                type="number"
                defaultValue=""
                value={phoneNumber}
                onChange={(ev) => setPhoneNumber(ev.target.value)}
                maxRows={4}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Email adresa"
                required
                type="email"
                defaultValue=""
                maxRows={4}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="cash"
                      checked={paymentMethods.includes("cash")}
                      onChange={handleCheckbox}
                    />
                  }
                  label="Cash"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="credit-card"
                      checked={paymentMethods.includes("credit-card")}
                      onChange={handleCheckbox}
                    />
                  }
                  label="Credit Card"
                />
              </FormGroup>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Pickup Locations
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Pickup Locations"
                >
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="7">7+</MenuItem>
                </Select>
              </FormControl>
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
            ></Box>
          </div>
          <Button
            // onClick={updateProfile}
            // type="submit"
            variant="contained"
            sx={{
              width: "90%",
              alignContent: "center",
              color: "white",
              bgcolor: "#0A6EBD",
            }}
          >
            Update your profile
          </Button>
        </form>
      </div>
    </div>
  );
}
