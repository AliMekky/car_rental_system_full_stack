import {useState,useEffect} from "react";
import "./Home.css";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import InputBox from "../../components/LocationDateTime/LocationDateTime";
import GppGoodIcon from "@mui/icons-material/GppGood";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CarRentalIcon from "@mui/icons-material/CarRental";
import TripInputSection from "../../components/TripInputSection/TripInputSection";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function Home() {
  const [name, setName] = useState("");
  const [startDate, setstartDate] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endDate, setendDate] = useState("");
  const [endTime, setendTime] = useState("");
  const [startLocation, setstartLocation] = useState("0");
  const [endLocation, setendLocation] = useState("0");
  const [error, setError] = useState("");
  const [country,setCountry] = useState("");
  const [countries,setCountries] = useState([]);
  const [cities,setCities] = useState([]);
  const navigate = useNavigate();

  //fetching countries
  useEffect(()=>{
    async function getCountries() {
      try {
        const res =  axios.get("http://localhost:4000/getCountries").then((response) => {
        console.log(response.data);
        setCountries(response.data);
        // console.log(countries[0]);
        setCountry(countries[0]);
        console.log(country);
        // console.log(countries)
        })
      } catch (error) {
      console.log(error);
      }
    }
    getCountries();
  },[]);

  //fetching cities according to the country chosen
  useEffect(()=>{
    if(countries[0]){
      async function getCities() {
        try {
          const res =  axios.get("http://localhost:4000/getCities",{
            params : {
              country : countries[country]
            }
          }).then((response) => {
          console.log(response.data);
          // setCountries(response.data);
          // console.log(countries[0]);
            setCities(response.data);
          console.log(cities)
          })
        } catch (error) {
        console.log(error);
        }
      }
      getCities();
    }
  },[country]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:4000/").then((response) => {
        console.log(response.data.name);
        setName(response.data.name);
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
            });
    } catch (err) {
      console.log(err);
    }
  };


  const goBrowse = (e)=>{
    e.preventDefault();
    if(startDate == "" || startTime == "" || endDate == "" || endTime == "")
    {
      setError("all fields are required");
    }
    else{
      navigate("/BrowseCars", {
        state: {
          startDate : startDate,
          startTime : startTime,
          startLocation : startLocation,
          cities : cities,
          endDate : endDate,
          endTime : endTime,
          endLocation : endLocation,
          country : countries[country]
        }
    })


    }
  }


  return (
    <div>
      <div class="navbar">
        <span class="logo">GO CAR.</span>

        <span class="buttons">
          <span>{name}'s account!</span>
          <a class="login btn btn-primary" onClick={end} role="button">
            LOGOUT
          </a>
          <a class="login btn btn-primary" href="/Login" role="button">
            LOGIN
          </a>
          <a class="signup btn btn-primary" href="/Signup" role="button">
            SIGN UP
          </a>
        </span>
      </div>

      <div className="middle-section row">
        <div className="paragraph col-12 col-lg-4">
          <p className="par1">
            Nothing can stop you from having the perfect trip!
          </p>
          <p className="par2">
            We promise you ultimate safety, comfort, and a choice tailored for
            your needs.
          </p>
        </div>

        <div className="datetime col-12 col-lg-4">
          <form style = {{alignItems:"center"}} className="datetime-form" type="post">
            <div className="country">
              <label style = {{color : "white",fontWeight:"500"}}>Country</label>
              <select className="countrySelect" onChange={(e)=>{setCountry(e.target.selectedIndex)}}> 
                {countries.map((item)=><option style= {{color : "black"}}>{item.COUNTRY}</option>)}
              </select>
            </div>
            <div style={{ position: "relative" }}>
              <InputBox title={"Pick-up"} citiesOptions = {cities} editDate = {setstartDate} editTime = {setstartTime} editLocation = {setstartLocation} editError = {setError}/>
              <div className="box">
                <SwapVertIcon />
              </div>
              <InputBox title={"Drop-off"} citiesOptions = {cities} editDate = {setendDate} editTime = {setendTime} editLocation = {setendLocation} editError = {setError}/>
            </div>
            <div style={{ "margin-top": "10px",display:"inline-block",width : "100%",textAlign:"left",alignItems:"center"}}>
              <button style = {{marginRight:"40%"}} className="login btn btn-primary" href="/BrowseCars" role="button" onClick={goBrowse}>
                GO
              </button>
            </div>
            {error != "" && <div style = {{color:"white",textAlign:"center"}}><span>All fields are required</span></div>}
          </form>
        </div>

        <div className="ads col-12 col-lg-4">
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
