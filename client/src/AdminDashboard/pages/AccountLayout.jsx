import React from "react";
import Topbar from "../components/topbar/topbar.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx";
import {
  Outlet,
  Route,
  Router,
  useLocation,
  useParams,
} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext.jsx";
import Home from "./home/Home.jsx";

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
