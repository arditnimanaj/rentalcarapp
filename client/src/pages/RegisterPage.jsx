import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration is complete!");
    } catch (e) {
      alert("Registration failed.Try again later!");
    }
  }

  return (
    <div classname="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto border" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button>register</button>
          <div>
            Already a member?
            <Link to={"/login"}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
