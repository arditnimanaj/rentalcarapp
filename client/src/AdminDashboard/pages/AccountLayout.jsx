import React from "react";
import Topbar from "../components/topbar/Topbar.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import {
  Outlet,
  Route,
  Router,
  useLocation,
  useParams,
} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext.jsx";
import HomePage from "./Home/HomePage.jsx";

export default function AccountDashboard() {
  const { user, setUser, ready } = useContext(UserContext);
  if (!ready) {
    return "Loading....";
  }
  return (
    <div className="">
      <Topbar />
      <div className="flex w-full">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
