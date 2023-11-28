import React, { useContext } from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { MenuList } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LogoutIcon from "@mui/icons-material/Logout";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 16,
    marginTop: theme.spacing(1),
    minWidth: 180,
    maxWidth: 220,

    boxShadow:
      "rgb(2, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function CustomizedMenus({ user }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function logOutUser() {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
  }
  return (
    <div className="sticky overflow-y-auto max-h-screen">
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        className="border rounded-5xl"
        size="small"
        onClick={handleClick}
      >
        <div className="flex gap-2 border rounded-3xl p-1 transition ease-in-out delay-100  hover:scale-110 hover:bg-cyan-950 duration-200 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-6 text-white "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-white text-center items-center"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuList className=" text-sm text-center justify-center font-poppins max-w-fit m-2">
          You are logged in as{" "}
          <span className="font-bold">{user.userName}</span> with{" "}
          <span className="font-bold">{user.email}</span>{" "}
        </MenuList>
        <Divider sx={{ my: 0.5 }} />
        <Link to={"/account"}>
          <MenuItem disableRipple onClick={handleClose}>
            <DashboardIcon />
            Admin Dashboard
          </MenuItem>
        </Link>
        <Link to={"/mybookings"}>
          <MenuItem onClick={handleClose} disableRipple>
            <CalendarTodayIcon />
            My bookings
          </MenuItem>
        </Link>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={logOutUser} disableRipple>
          <LogoutIcon />
          Log out
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

export default CustomizedMenus;
