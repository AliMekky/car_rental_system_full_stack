import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./BrowseCars.css";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/Card/Card";
import FilterOption from "../../components/FilterOption/FilterOption";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import GroupIcon from "@mui/icons-material/Group";
import PaidIcon from "@mui/icons-material/Paid";
import { PriceChange } from "@mui/icons-material";
import InputBox from "../../components/LocationDateTime/LocationDateTime";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ReactCard from "../../components/ReactCard/ReactCard";
import LocationDateTimeData from "../../components/LocationDateTimeData/LocationDateTimeData";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function BrowseCars() {
  let navigate = useNavigate();

  const [typeFilter,setTypeFilter] = useState({Sport : false,SUV : false, MPV : false, Sedan : false, Coupe : false, Hatchback : false});
  const [capacityFilter,setCapacityFilter] = useState({'2 Person' : false,'4 Person' : false, '6 Person' : false, '8 Person or more' : false});
  const [priceFilter,setPriceFilter] = useState(0);
  const [startDate, setstartDate] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endDate, setendDate] = useState("");
  const [endTime, setendTime] = useState("");
  const [startLocation, setstartLocation] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [endLocation, setendLocation] = useState("");
  const [getCar, setGetCar] = useState(false);
  const [cars, setCars] = useState([]);
  const [startCity, setStartCity] = useState("");
  const [endCity, setEndCity] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const [price, setPrice] = useState(0);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("Guest");
  const [isLogged, setIsLogged] = useState(0);

  useEffect(() => {
    if (location.state) {
      setstartDate(location.state.startDate);
      setstartTime(location.state.startTime);
      setstartLocation(location.state.startLocation);
      setendDate(location.state.endDate);
      setendTime(location.state.endTime);
      setendLocation(location.state.endLocation);
      setCountry(location.country);
      setCities(location.state.cities);
      setStartCity(location.state.cities[location.state.startLocation].CITY);
      setEndCity(location.state.cities[location.state.endLocation].CITY);
      setName(location.state.name);
      setIsLogged(location.state.isLogged);
      console.log(location.state);

      // setGetCar(!getCar);
      async function getCars() {
        try {
          const res = await axios
            .get("http://localhost:4000/getCars", {
              params: {
                country: location.state.country,
                city: location.state.cities[location.state.startLocation].CITY,
                startDate: location.state.startDate,
                startTime: location.state.startTime,
                endDate: location.state.endDate,
                endTime: location.state.endTime,
              },
            })
            .then((response) => {
              console.log(response.data);
              // setCountries(response.data);
              // console.log(countries[0]);

              setCars(response.data);
              // console.log(response.data);;
            });
        } catch (error) {
          console.log(error);
        }
      }
      getCars();
    } else {
      navigate("/");
    }
  }, []);


  // use effect that is called if any of the filter options changes
  useEffect(()=>{
    async function filterCars(){
      const res = await axios.get("http://localhost:4000/filterCars",{
        params : {
          type : typeFilter,
          capacity : capacityFilter,
          price : priceFilter
        }
      })
    }
    filterCars();
  },[typeFilter,capacityFilter,priceFilter]);

  // },[typeFilter,capacityFilter,price]);
  // use effect for debugging after each change.
  // useEffect(()=>{
  //   console.log(typeFilter);
  //   console.log(capacityFilter);
  //   console.log(priceFilter);
  // },[priceFilter]);


  // SELECT * FROM CAR
  // NATURAL JOIN office
  // WHERE COUNTRY = 'Egypt'
  // AND PLATE_ID IN ((SELECT PLATE_ID FROM CAR)
  // EXCEPT
  // (SELECT PLATE_ID FROM reservation
  // WHERE PICKUP_DATE <= '2022-12-20 00:00:00' AND DROPOFF_DATE >= '2022-12-10 00:00:00'));
  useEffect(() => {
    async function getCountries() {
      if (location.state) {
        try {
          const res = axios
            .get("http://localhost:4000/getCountries")
            .then((response) => {
              console.log(response.data);
              setCountries(response.data);
              // console.log(countries[0]);
              setCountry(countries[0]);
              // console.log(country);
              // console.log(countries)
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        await axios.get("http://localhost:4000/");
      }
    }
    getCountries();
  }, []);

  // fetching cities
  useEffect(() => {
    if (countries[0]) {
      async function getCities() {
        try {
          const res = axios
            .get("http://localhost:4000/getCities", {
              params: {
                country: countries[country],
              },
            })
            .then((response) => {
              console.log(response.data);
              // setCountries(response.data);
              // console.log(countries[0]);
              setCities(response.data);
              console.log(cities);
            });
        } catch (error) {
          console.log(error);
        }
      }
      getCities();
    }
  }, [country]);

  //   useEffect( () => {
  //     fetchItems();
  // }, []);

  // const fetchItems = async () => {
  //   try{
  //     const res = await axios.get('http://localhost:4000/browseCar');
  //     console.log(res.data);
  //     setMessage(res.data);
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // };

  // const fetchItems = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:4000/").then((response) => {
  //       console.log(response.data.name);
  //       setName(response.data.name);
  //     });
  //     console.log("Successful");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleGo = (e) => {
    e.preventDefault();
    if (startDate == "" || startTime == "" || endDate == "" || endTime == "") {
      setError("all fields are required");
    } else {
      try {
        const res = axios
          .get("http://localhost:4000/getCars", {
            params: {
              country: country,
              city: cities[startLocation].CITY,
              startDate: startDate,
              startTime: startTime,
              endDate: endDate,
              endTime: endTime,
            },
          })
          .then((response) => {
            console.log(response.data);
            // setCountries(response.data);
            // console.log(countries[0]);
            setCars(response.data);
            // console.log(response.data);;
          });
      } catch (error) {
        console.log(error);
      }
      setEdit(!edit);
    }
  };

  const end = () => {
    try {
      const res = axios.get("http://localhost:4000/logout").then((response) => {
        !response.data.isLogged && navigate("/");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="row cont">
        {/* <Navbar style = {{position : "fixed", top : "0", left : "0"}}/> */}
        <div class="navbarB">
          <a href="/" class="logo">
            GO CAR.
          </a>
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

        <div className="sidebar col-2">
          <div className="categoryType">
            <DirectionsCarFilledIcon
              fontSize="small"
              style={{ "margin-right": "5px" }}
            />
            TYPE
          </div>
          <FilterOption name={"Sport"}  editFilter = {setTypeFilter}/>
          <FilterOption name={"SUV"}  editFilter = {setTypeFilter}/>
          <FilterOption name={"MPV"}  editFilter = {setTypeFilter}/>
          <FilterOption name={"Sedan"}  editFilter = {setTypeFilter}/>
          <FilterOption name={"Coupe"}  editFilter = {setTypeFilter}/>
          <FilterOption name={"Hatchback"}  editFilter = {setTypeFilter}/>
          <hr />
          <div className="categoryType">
            <GroupIcon fontSize="small" style={{ "margin-right": "5px" }} />
            CAPACITY
          </div>
          <FilterOption name={"2 Person"}  editFilter = {setCapacityFilter}/>
          <FilterOption name={"4 Person"}  editFilter = {setCapacityFilter}/>
          <FilterOption name={"6 Person"}  editFilter = {setCapacityFilter}/>
          <FilterOption name={"8 Person or more"}  editFilter = {setCapacityFilter}/>
          <hr />
          <label for="customRange1" class="categoryType form-label">
            <PaidIcon fontSize="small" style={{ "margin-right": "5px" }} />
            Price = {price}$/hr
          </label>
          <input
            type="range"
            class="form-range"
            id="customRange1"
            min="20"
            max="200"
            step="1"
            onChange={(e) => {
              setPrice(e.target.value)}} onMouseUp = {(e)=>{setPriceFilter(e.target.value);
            }}
          ></input>
        </div>
        <div className="browse col-10">
          {/* <div className = "row"><Navbar /></div> */}
          <div className="row datetime">
            <div className="col-12 col-lg-6">
              <p className="par1">It is never too late to change!</p>
            </div>
            <div className="col-12 col-lg-6">
              {edit ? (
                <form className="datetime-form" type="post">
                  <div className="country">
                    <label style={{ color: "white", fontWeight: "500" }}>
                      Country
                    </label>
                    <select
                      className="countrySelect"
                      onChange={(e) => {
                        setCountry(e.target.selectedIndex);
                      }}
                    >
                      {countries.map((item) => (
                        <option style={{ color: "black" }}>
                          {item.COUNTRY}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ position: "relative" }}>
                    <InputBox
                      title={"Pick-up"}
                      editCity={setStartCity}
                      citiesOptions={cities}
                      editDate={setstartDate}
                      editTime={setstartTime}
                      editLocation={setstartLocation}
                      editError={setError}
                    />
                    <div className="box">
                      <SwapVertIcon />
                    </div>
                    <InputBox
                      title={"Drop-off"}
                      editCity={setEndCity}
                      citiesOptions={cities}
                      editDate={setendDate}
                      editTime={setendTime}
                      editLocation={setendLocation}
                      editError={setError}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      "margin-top": "20px",
                      "align-items": "center",
                      justifyContent: "center",
                    }}
                  >
                    <button class="login btn btn-primary" onClick={handleGo}>
                      Go
                    </button>
                  </div>
                  {error != "" && (
                    <div style={{ color: "white", textAlign: "center" }}>
                      <span>All fields are required</span>
                    </div>
                  )}
                </form>
              ) : (
                <div>
                  <div>
                    <LocationDateTimeData
                      title={"Pick-up"}
                      Location={startCity}
                      date={startDate}
                      time={startTime}
                    />
                    <LocationDateTimeData
                      title={"Drop-off"}
                      Location={endCity}
                      date={endDate}
                      time={endTime}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      "margin-top": "20px",
                      "align-items": "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* <a class="login btn btn-primary" href="#" role="button">Edit</a> */}
                    <button
                      class="login btn btn-primary"
                      onClick={() => {
                        setEdit(!edit);
                        setstartDate("");
                        setstartTime("");
                        setendDate("");
                        setendTime("");
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="cardsArea row justify-content-start">
            {/* <ReactCard img = "https://imgd.aeplcdn.com/0x0/n/cw/ec/41375/x6-exterior-right-front-three-quarter.jpeg" name = {message} price = "90"/>
                <ReactCard img = "https://quickbutik.imgix.net/13175t/products/5de8f7e3c6852.jpeg" name = "Seat-Cupra" price = "50"/>
                <ReactCard img = "https://media.istockphoto.com/id/1157655660/photo/generic-red-suv-on-a-white-background-side-view.jpg?s=612x612&w=0&k=20&c=ecrvXZhimUHnYES-kx7L5b-TDtRU5kAFPpNm0ZtAp1Y=" name = "Audi-Q2" price = "60"/>
                <ReactCard img = "https://media.istockphoto.com/id/508007108/photo/white-van-isolated-on-white.jpg?s=612x612&w=0&k=20&c=cjajRKqun40A2QLqJqqadu1L1BHaECW1BNT0P82z4Jk=" name = "Mercedes-Benz-V" price = "80"/>
                <ReactCard img = "https://media.istockphoto.com/id/508007108/photo/white-van-isolated-on-white.jpg?s=612x612&w=0&k=20&c=cjajRKqun40A2QLqJqqadu1L1BHaECW1BNT0P82z4Jk=" name = "Mercedes-Benz-V" price = "80"/> */}
            {cars.map((car) => (
              <ReactCard carData={car} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseCars;
