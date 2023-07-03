import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import { Form, Navigate } from "react-router-dom";
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

export default function PhotosUploader() {
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");

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
  return (
    <div className="">
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
    </div>
  );
}
