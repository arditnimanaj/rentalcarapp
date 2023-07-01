import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useContext } from "react";
import { UserContext } from "../../../UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function Topbar() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">rentKOS {user.name}</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>

          <div className="topbarIconContainer">
            <Settings />
          </div>
          <AccountCircleIcon color="action" />
          {/* <svg
            className="topAvatar"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 bg-slate-500 rounded-2x,"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg> */}
        </div>
      </div>
    </div>
  );
}
