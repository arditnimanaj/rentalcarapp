import axios from "axios";
import React, { useState } from "react";
import ImageOne from "../../../logopng/logo-no-background.png";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isBusiness, setIsBusiness] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        userName,
        email,
        password,
        isNewUser,
      });
      alert("Registration is complete!");
    } catch (e) {
      alert("Registration failed.Try again later!");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex items-center border rounded-3xl p-10 shadow-2xl w-fit">
        <img src={ImageOne} className="w-70 h-60 mr-4 max-lg:hidden" />
        <div className="border shadow-2xl shadow-cyan-950 p-4 rounded-lg text-center mx-auto min-w-5xl ">
          <h1 className="text-3xl text-center mb-4 font-bold mx-4">
            Create new account{" "}
          </h1>
          <form
            className="p-4 mx-auto  flex flex-col gap-2"
            onSubmit={registerUser}
          >
            <span className="flex ml-1">Username</span>
            <input
              className="w-full border shadow-sm rounded-xl p-2"
              type="text"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />

            <span className="flex ml-1">Email</span>
            <input
              type="email"
              className="w-full border shadow-sm rounded-xl p-2"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <span className="flex ml-1">Password</span>
            <input
              type="password"
              className="w-full border shadow-sm rounded-xl p-2"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <span className="flex ml-1">Enter your phone number:</span>
            <input
              type="number"
              className="w-full border shadow-sm rounded-xl p-2"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />

            <button className="flex bg-black mx-auto text-white font-bold p-3 rounded-xl hover:bg-cyan-900 mt-3">
              REGISTER
            </button>
            <div>
              Already a member?
              <Link className="text-red-300 ml-1" to={"/login"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
