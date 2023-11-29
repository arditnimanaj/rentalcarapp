import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import axios from "axios";

export default function Sidebar() {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  async function logOut() {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
  }
  function returnToHomepage() {
    navigate("/");
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to={"/account"} className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Homepage
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Statistics
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu</h3>
          <ul className="sidebarList">
            <Link to="/account/profile/" className="link">
              <li className="sidebarListItem">
                <PersonIcon className="sidebarIcon" />
                Update your profile
              </li>
            </Link>
            <Link to="/account/carlist/" className="link">
              <li className="sidebarListItem">
                <DirectionsCarIcon className="sidebarIcon" />
                Cars
              </li>
            </Link>
            <Link to={"/account/newcar/"} className="link">
              <li className="sidebarListItem">
                <AddIcon className="sidebarIcon" />
                Add new cars
              </li>
            </Link>
            <Link to={"/account/bookings/"} className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Bookings
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Information</h3>
          <ul className="sidebarList">
            <Link to={"/account/reviews/"} className="link">
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Reviews from customers
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Options</h3>
          <ul className="sidebarList">
            <li onClick={returnToHomepage} className="sidebarListItem">
              <HomeIcon className="sidebarIcon" />
              Return to Homepage
            </li>
            <li onClick={logOut} className="sidebarListItem">
              <LogoutIcon className="sidebarIcon" />
              LogOut
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
