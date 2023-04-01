import React, { useState} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './conponents/Navbar';
import './App.css';
import axios from "axios";

import Home from './pages/Home';
import Room from './pages/Room';
import Create from './pages/Create';
import History from './pages/History/History';
import Profile from './pages/Profile';
import LoginForm from './conponents/LoginForm';


function App() {
  const [userlogin, setUserlogin] = useState(()=>{
    let userProfle = localStorage.getItem("userData");
    if (userProfle) {
      let toto = JSON.parse(userProfle);
      axios.defaults.headers.common['Authorization'] = `Bearer ${toto.token}`;
      return JSON.parse(userProfle);
    }
    return {email: ""};
    });
  
    
    const [error, setError] = useState("");
  
    const Loginuser = (detailslogin) => {
      console.log(detailslogin);
      axios
        .post("/auth/login", detailslogin)
        
        .then((response) => {
            localStorage.setItem('userData', JSON.stringify(response.data));
          console.log(response);
        if (/*{response.data.role=="User"&&}*/response.status == 200) {
            console.log("Logged in");
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            setUserlogin({
              email: detailslogin.email,
            });
          }
          // else if(response.data.role!="User"){
          //   console.log(response.data.role)
          // }
        })
        .catch((err) => {
          console.log(err);
          console.log("Details do not match!");
          setError("Incorrect email or password");
        });
    };
  return (
    <>
    <div className="App">
    {userlogin.email != "" ? (
      <>
       <BrowserRouter>
       <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Rooms' element={<Room/>} />
          <Route path='/Create' element={<Create/>} />
          <Route path='/History' element={<History/>} />
          <Route path='/Profiles' element={<Profile/>} />
      
          </Routes>
      </BrowserRouter>
      </>
     ) : (
      <LoginForm Loginuser={Loginuser} error={error} />
    )}
    </div>
    </>
  );
}

export default App;
