import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import ImageOne from "../../../logopng/logo-no-background.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  function inputClassname() {
    return "max-w-full border shadow-sm rounded-xl p-2 ";
  }

  return (
    <div className="h-screen flex justify-center items-center">
      {/* <div className="h-screen flex flex-col justify-center items-center">
  <div className="border border-red-500 p-4 rounded-lg text-center"></div> */}

      <div className="flex items-center border rounded-3xl p-10 shadow-2xl max-w-6xl">
        <img src={ImageOne} className="w-70 h-60 mr-4 max-lg:hidden" />

        <div className="border shadow-2xl shadow-cyan-950 p-4 rounded-lg text-center mx-auto">
          <h1 className="text-3xl text-center mb-4 font-bold">Welcome Back!</h1>
          <form
            className="mx-auto p-4 flex flex-col gap-2"
            onSubmit={handleLoginSubmit}
          >
            {/* <div className=""> */}
            <span className="flex ml-1">Email</span>
            <input
              className={inputClassname()}
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            {/* </div> */}
            {/* <div> */}
            <span className="flex ml-1 mt-2">Password</span>
            <input
              className={inputClassname()}
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            {/* </div> */}
            <button className="flex bg-black mx-auto text-white font-bold p-3 rounded-xl hover:bg-cyan-900 mt-3">
              LOGIN
            </button>
            <div>
              Don't have an account yet?
              <Link className="text-red-300 ml-1" to={"/register"}>
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
