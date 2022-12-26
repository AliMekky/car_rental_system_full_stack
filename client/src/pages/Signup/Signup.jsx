import React, { useState, useEffect } from "react";
import "./Signup.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(0);
  const [error, setError] = useState(0);
  useEffect(() => {
    async function getData() {
      if(location.state){
        setCar (location.state.carDet)
      }
    }
    getData();
  }, []);
  let navigate = useNavigate();
  const location = useLocation();
  const [car, setCar] = useState(0);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name != "" && password != "" && phone_number != "" && email != "") {
      axios
        .post("http://localhost:4000/signup", {
          name,
          email,
          password,
          phone_number,
          isAdmin,
        })
        .then((response) => {
          if (response.data.title === "Welcome, user!") {
            console.log("im a user!!!!!");
            console.log(document.referrer);
            if (
              String(document.referrer) === "http://localhost:3000/BrowseCars"
            ) {
              console.log("coming from browse page");
              console.log(response.data);
              navigate("/BrowseCars", {
                state: {
                  city: response.data.city,
                  country: response.data.country,
                  startDate: response.data.startDate,
                  endDate: response.data.endDate,
                  startTime: response.data.startTime,
                  endTime: response.data.endTime,
                  startLocation: response.data.startLocation,
                  endLocation: response.data.endLocation,
                  cities: response.data.cities,
                  name: response.data.name,
                  isLogged: 1,
                  email: response.data.email,
                },
              });
            } else if (location.state || String(document.referrer) === "http://localhost:3000/Login") {
              setCar(1);
              if (location.state.ref) {
                console.log("coming from rent now");
                navigate("/Payment", {
                  state: {
                    // city: response.data.city,
                    // country: response.data.country,
                    // startDate: response.data.startDate,
                    // endDate: response.data.endDate,
                    // startTime: response.data.startTime,
                    // endTime: response.data.endTime,
                    // startLocation: response.data.startLocation,
                    // endLocation: response.data.endLocation,
                    // cities: response.data.cities,
                    // name: response.data.name,
                    // isLogged: 1,
                    // email: response.data.email
                    car: location.state.car,
                    tripData: location.state.tripData,
                  },
                });
              }
            } else {
              navigate("/", {
                state: {
                  name: response.data.name,
                  email: response.data.email,
                },
              });
            }
            // navigate(-1,{
            //     state: {
            //       name: response.data.name,
            //       new: "hi this is us"
            //     },
            //   });
          } else if (response.data.title === "error") {
            setError(1);
          }
        });
    }
  };

  return (
    <div>
      <Navbar show={false} />
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong">
              <div class="card-body p-5 text-center">
                <h3 class="mb-5">Sign up</h3>
                <br />
                <h5 class="mb-5">Enter your personal information</h5>

                <div class="container">
                  <div class="row">
                    <div class="col">
                      <div class="form-outline mb-4">
                        <input
                          type="text"
                          id="typeEmailX-2"
                          class="form-control form-control-lg"
                          placeholder="Name"
                          onChange={(event) => setName(event.target.value)}
                        />
                        {name == "" && <span> This field is required. </span>}
                      </div>
                    </div>

                    <div class="col">
                      <div class="form-outline mb-4">
                        <input
                          type="text"
                          id="typePasswordX-2"
                          class="form-control form-control-lg"
                          placeholder="Phone Number"
                          onChange={(event) => setNumber(event.target.value)}
                        />
                        {phone_number == "" && (
                          <span> This field is required. </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          id="typeEmailX-2"
                          class="form-control form-control-lg"
                          placeholder="Email"
                          onChange={(event) => setEmail(event.target.value)}
                        />
                        {email == "" && <span> This field is required. </span>}
                      </div>
                    </div>

                    <div class="col">
                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="typePasswordX-2"
                          class="form-control form-control-lg"
                          placeholder="Password"
                          onChange={(event) => setPassword(event.target.value)}
                        />
                        {email == "" && <span> This field is required. </span>}
                      </div>
                    </div>
                  </div>
                </div>
                {error == 1 && <span> This email already exists.</span>}

                <hr />
                <button
                  class="btn btn-primary btn-lg btn-block btn-disp"
                  style={{ width: "7rem" }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Continue
                </button>
                <br />
                <p class="footer p-disp">
                  Already a member? Login{" "}
                  {car == 1 && (
                    <Link
                      to="/Login"
                      state={{
                        car: location.state.car,
                        tripData: location.state.tripData,
                      }}
                    >
                      Here
                    </Link>
                  )}
                  {car == 0 && <Link to="/Login">Here</Link>}
                </p>
                {/* <p class="footer p-disp">
                  Already a member? Login <a href="/Login">Here</a>{" "}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
