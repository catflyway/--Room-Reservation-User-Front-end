import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./conponents/Navbar";
import "./App.css";
import axios from "axios";

import Home from "./pages/Home";
import Room from "./pages/Room";
import Create from "./pages/Create";
import History from "./pages/History/History";
import Profile from "./pages/Profile";
import LoginForm from "./conponents/LoginForm";
import RegisterForm from "./conponents/RegisterForm";

import { UserContext } from "./user-context";

const allowRole = ["User", "Room Contributor"];

function App() {
  const [userlogin, setUserlogin] = useState(() => {
    let userProfle = localStorage.getItem("userData");
    if (userProfle) {
      let toto = JSON.parse(userProfle);
      if (allowRole.includes(toto.role)) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${toto.token}`;
        return JSON.parse(userProfle);
      }
      localStorage.removeItem("userData");
    }
    return { email: "" };
  });

  const [error, setError] = useState("");

  const Loginuser = (detailslogin) => {
    console.log(detailslogin);
    axios
      .post("/auth/login", detailslogin)

      .then((response) => {
        console.log(response);
        if (response.status != 200) {
          throw "Response not 200";
        }

        if (allowRole.includes(response.data.role)) {
          console.log("Logged in");
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          setUserlogin({
            email: detailslogin.email,
          });

          localStorage.setItem("userData", JSON.stringify(response.data));
        } else {
          console.log(response.data.role);
          setError("ไม่อยากให้เข้าอะ");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Details do not match!");
        setError("Incorrect email or password");
      });
  };
  return (
    <UserContext.Provider value={userlogin}>
      {userlogin.email != "" ? (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Rooms" element={<Room />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/History" element={<History />} />
            <Route path="/Profiles" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm Loginuser={Loginuser} error={error} />} />
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      )}
    </UserContext.Provider>
  );
}

export default App;
