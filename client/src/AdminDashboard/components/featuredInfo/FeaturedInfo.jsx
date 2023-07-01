import React from "react";
import "./featuredInfo.css";
import { ArrowDownward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"> 11,425$</span>
          <span className="featuredMoneyRate">
            -11.4
            <ArrowDownward />
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"> 11,425$</span>
          <span className="featuredMoneyRate">
            -11.4
            <ArrowDownward />
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"> 11,425$</span>
          <span className="featuredMoneyRate">
            -11.4
            <ArrowDownward />
          </span>
        </div>
      </div>
    </div>
  );
}
