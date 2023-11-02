import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import whiteLogo from "../../logopng/logo-white-removebg.png";
import CustomizedMenus from "./components/CustomizedMenus";
import { HashLink } from "react-router-hash-link";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital@0;1&display=swap');
</style>;
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@200&display=swap');
</style>;

export default function Header() {
  const { ready, user } = useContext(UserContext);
  if (ready && !user) {
    <Navigate to={"/login"} />;
  }

  return (
    <header className="bg-slate-950 p-2 flex items-center justify-between w-full lg:w-full shadow-lg shadow-cyan-950 fixed z-[1000]">
      <a href="" className="flex items-center gap-1 ">
        <HashLink smooth to="/#head" className="text-white font-poppins">
          <img src={whiteLogo} className="h-[50px] w-[150px] object-cover" />
        </HashLink>
      </a>
      <div className="flex justify-around items-center gap-12 p-2">
        <a href="" className="flex items-center gap-1 ">
          <HashLink smooth to="/#book" className="text-white font-poppins">
            <span>Book </span>
          </HashLink>
        </a>
        <a href="" className="flex items-center gap-1 ">
          <HashLink smooth to="/#about" className="text-white font-poppins">
            <span>About </span>
          </HashLink>
        </a>
        <a href="" className="flex items-center gap-1 ">
          <HashLink smooth to="/#about" className="text-white font-poppins">
            <span>Contact </span>
          </HashLink>
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
            {/* {console.log(user)} */}
            <CustomizedMenus user={user} />
          </>
        )}
      </div>
    </header>
  );
}
