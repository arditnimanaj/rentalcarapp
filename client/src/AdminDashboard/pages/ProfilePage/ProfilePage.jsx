import React, { useState, useRef, useEffect } from "react";
import "../ProfilePage/profilepage.css";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Radio,
  RadioGroup,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Input from "@mui/material/Input";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const cityNames = [
  "Prishtinë",
  "Aeroporti Adem Jashari",
  "Ferizaj",
  "Gjakovë",
  "Prizren",
  "Podujevë",
  "Mitrovicë",
  "Vushtrri",
  "Suharekë",
  "Gllogovc",
  "Lipjan",
  "Rahovec",
  "Gjilan",
  "Skenderaj",
  "Kamenicë",
  "Klinë",
  "Dragash",
  "Fushë Kosovë",
  "Kacanik",
  "Shtime",
  "Hani i Elezit",
  "Obiliq",
  "Junik",
  "Malishevë",
  "Kllokot",
  "Viti",
  "Istog",
];

export default function ProfilePage() {
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [pickupLocations, setPickupLocations] = useState([]);
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
  useEffect(() => {
    axios.get("/profile").then((response) => {
      const { data } = response;
      toast.info("You are updating your profile info!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      //Nese useri nuk eshte perdorues i ri (pra ka update-uar me heret keto te dhena)
      if (!data.isNewUser) {
        setBusinessName(data.businessName);
        setPhoneNumber(data.phoneNumber);
        setPaymentMethods(data.paymentMethods);
        setPickupLocations(data.pickupLocations);
        setBusinessProfilePicture(data.businessProfilePicture);
        setBusinessSocialMedia(data.businessSocialMedia);
      }
    });
  }, []);

  async function updateProfile(ev) {
    ev.preventDefault();

    const profileData = {
      businessName,
      phoneNumber,
      paymentMethods,
      pickupLocations,
      businessProfilePicture,
      businessSocialMedia,
    };

    await axios.put("/update-profile", {
      ...profileData,
    });
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPickupLocations(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="profilePage flex">
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
          <AccountCircleIcon
            fontSize="large"
            style={{ color: "#0A6EBD", marginRight: "5px" }}
          />
          Update your profile
        </h1>
        <form className="flex-col p-1 w-full gap-3" onSubmit={updateProfile}>
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
              {/* <TextField
                id="outlined-multiline-flexible"
                label="Email adresa"
                required
                type="email"
                defaultValue=""
                maxRows={4}
              /> */}

              <FormGroup>
                <div className="flex p-1 justify-between">
                  <label className="self-center"> Payment method:</label>
                  <div className="flex flex-col">
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
                  </div>
                </div>
              </FormGroup>

              <FormControl sx={{ width: "full" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Pickup Locations
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={pickupLocations}
                  onChange={handleChange}
                  input={<OutlinedInput label="Pickup Locations" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {cityNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={pickupLocations.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
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
            type="submit"
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
