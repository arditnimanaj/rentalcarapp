import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function () {
  return (
    <div className="p-0 flex flex-col h-screen">
      <Header />
      <Outlet />
    </div>
  );
}
