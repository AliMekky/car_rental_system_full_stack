import React from "react";
import "./Home.css";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import InputBox from "../../components/LocationDateTime/LocationDateTime";
import GppGoodIcon from "@mui/icons-material/GppGood";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CarRentalIcon from "@mui/icons-material/CarRental";
import TripInputSection from "../../components/TripInputSection/TripInputSection";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Home() {
  const [name, setName] = useState("");
  const [isLogged, setIsLogged] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:4000/").then((response) => {
        console.log(response.data.name);
        setName(response.data.name);
        setIsLogged(response.data.isLogged);
      });
      console.log("Successful");
    } catch (err) {
      console.log(err);
    }
  };
  const end = () => {
    try {
      const res = axios.get("http://localhost:4000/logout").then((response) => {
        console.log(response.data.name);
        setName(response.data.name);
        setIsLogged(response.data.isLogged);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div class="navbar">
        <span class="logo">GO CAR.</span>

        <span class="buttons">
          <span>{name}'s account!</span>
          {isLogged ? (
            <a class="login btn btn-primary" onClick={end} role="button">
              LOGOUT
            </a>
          ) : (
            <div>
              <a class="login btn btn-primary" href="/Login" role="button">
                LOGIN
              </a>
              <a class="signup btn btn-primary" href="/Signup" role="button">
                SIGN UP
              </a>
            </div>
          )}
        </span>
      </div>

      <div className="middle-section row">
        <div className="paragraph col-12 col-sm-4">
          <p className="par1">
            Nothing can stop you from having the perfect trip!
          </p>
          <p className="par2">
            We promise you ultimate safety, comfort, and a choice tailored for
            your needs.
          </p>
        </div>

        <div className="datetime col-12 col-sm-4">
          <form className="datetime-form" type="post">
            <div className="country">
              <select className="countrySelect">
                <option selected disabled>
                  {" "}
                  Country{" "}
                </option>
              </select>
            </div>
            <div style={{ position: "relative" }}>
              <InputBox title={"Pick-up"} />
              <div className="box">
                <SwapVertIcon />
              </div>
              <InputBox title={"Drop-off"} />
            </div>
            <div style={{ "margin-top": "20px" }}>
              <a class="login btn btn-primary" href="/BrowseCars" role="button">
                GO
              </a>
            </div>
          </form>
        </div>

        <div className="ads col-12 col-sm-4">
          <img src={require("./cars.png")} alt="cars" />
        </div>
      </div>

      <div className="last-section">
        <div className="row">
          <div className="col-3" style={{ textAlign: "left" }}>
            <div className="go">
              <span>GO CAR.</span>
            </div>
            <div className="slogan">
              your dream car, just when it crosses your mind.
            </div>
          </div>
          <div className="col-3" style={{ textAlign: "left" }}>
            <div className="property">
              <div className="property-icon">
                <GppGoodIcon />
              </div>
              <div className="property-text">Insurance on cars.</div>
            </div>
            <div className="property">
              <div className="property-icon">
                <CarRentalIcon />
              </div>
              <div className="property-text">Fexible rentals.</div>
            </div>
          </div>
          <div className="col-3" style={{ textAlign: "left" }}>
            <div className="property">
              <div className="property-icon">
                <GppGoodIcon />
              </div>
              <div className="property-text">Affordable prices.</div>
            </div>
            <div className="property">
              <div className="property-icon">
                <CreditCardIcon />
              </div>
              <div className="property-text">Safe and secure payments.</div>
            </div>
          </div>
          <div className="col-3" style={{ textAlign: "left" }}>
            <div className="founders">Our founders</div>
            <p className="founder">
              Lara Hassan <br />
              <br />
              Nourine Mohamed
              <br />
              <br />
              Ali Mekky <br />
              <br />
              Anas Emad
            </p>
          </div>
        </div>
      </div>
      <div className="footer">
        <hr />
        <span>© 2022 GO CAR, all rights reserved.</span>
        <span style={{ position: "absolute", right: "30px" }}>
          <span>Privacy & Policy</span>
          <span style={{ "margin-left": "30px" }}>Terms & Condition</span>
        </span>
      </div>
    </div>
  );
}

export default Home;
