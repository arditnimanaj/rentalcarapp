import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { ready, user } = useContext(UserContext);
  if (ready && !user) {
    <Navigate to={"/login"} />;
  }
  return (
    <header className="bg-red-400 p-3 flex justify-between w-full h-50">
      <a href="" className="flex items-center gap-1 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8 "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <Link to={"/"}>RENTKOS</Link>
      </a>
      <Link classname="text-red-500" to={"/login"}>
        Login page
      </Link>
      {!!user && (
        <Link to={user ? "/account" : "/login"}>
          <div className="">
            <p>{user?.userName}</p>
          </div>
        </Link>
      )}
    </header>
  );
}
