//import logo from './logo.svg';
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./pages/Login/Login.jsx";
import CarDetail from "./pages/CarDetail/CarDetail.jsx";
import BrowseCars from "./pages/BrowseCars/BrowseCars.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/BrowseCars" element ={<BrowseCars/>}/>
        <Route path="/Login" element ={<Login/>}/>
        <Route path="/Signup" element ={<Signup/>}/>
        <Route path="/Admin" element={<Admin/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
