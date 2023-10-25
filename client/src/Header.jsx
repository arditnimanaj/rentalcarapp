import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";

import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import whiteLogo from "../../logopng/logo-white-removebg.png";
import CustomizedMenus from "./components/CustomizedMenus";
import { Button, MenuList } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
</style>;

export default function Header() {
  const { ready, user } = useContext(UserContext);
  if (ready && !user) {
    <Navigate to={"/login"} />;
  }

  return (
    <header className="bg-black p-2 flex items-center justify-between min-w-full">
      <a href="" className="flex items-center gap-1 ">
        <Link to={"/"}>
          <img src={whiteLogo} className="h-[50px] w-[150px] object-cover" />
        </Link>
      </a>
      <div className="flex justify-around items-center gap-12 p-2">
        <a href="" className="flex items-center gap-1 ">
          <Link className="text-white font-poppins" to={"/"}>
            <span>About </span>
          </Link>
        </a>
        <a href="" className="flex items-center gap-1 ">
          <Link className="text-white font-poppins" to={"/"}>
            <span>Cars </span>
          </Link>
        </a>
        <a href="" className="flex items-center gap-1 ">
          <Link className="text-white font-poppins" to={"/"}>
            <span>Contact </span>
          </Link>
        </a>

        {!user && (
          <Link to={"/login"} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-white "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </Link>
        )}
        {user && (
          <>
            {console.log(user)}
            <CustomizedMenus user={user} />
          </>
        )}
      </div>
    </header>
  );
}
