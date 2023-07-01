import React from "react";
import Topbar from "../../components/topbar/topbar";
import "./home.css";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";

export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
    </div>
  );
}
