import { useState, useEffect, React } from "react";
import "./Login.css";
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
function Login() {

  useEffect(() => {
    async function getData() {
      if(location.state){
        setCar (location.state.carDet)
      }
    }
    getData();
  }, []);

  const location = useLocation();

  const [email, setEmail] = useState("");
  const [car, setCar] = useState(0);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(0);
  let navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    let history = document.referrer;
    console.log("PREVIOUS PAGE: " + history);
    // console.log("NEXT VARIABLE" + location.state.next);
    if (email != "" && password != "") {
      axios
        .post("http://localhost:4000/login", {
          email,
          password,
        })
        .then((response) => {
          if (response.data.title === "Welcome, admin!") {
            navigate("/Admin");
          } else if (response.data.title === "Welcome, user!") {
            console.log("im a user!!!!!");
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
            } else if (location.state) {
              setCar(1);
              if (location.state.next) {
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
                <h3 class="mb-5">Login</h3>
                <form onSubmit={handleSubmit}>
                  <div class="form-outline mb-4">
                    {/* <label class="form-label" for="typeEmailX-2">Email</label> */}
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="email"
                      id="typeEmailX-2"
                      class="form-control form-control-lg"
                      placeholder="Email"
                    />
                    {email == "" && <span> This field is required. </span>}
                  </div>

                  <div class="form-outline mb-4">
                    {/* <label class="form-label" for="typePasswordX-2">Password</label> */}
                    <input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      id="typePasswordX-2"
                      class="form-control form-control-lg"
                      placeholder="Password"
                    />
                    {password == "" && <span> This field is required. </span>}
                  </div>
                  {error == 1 && <span> Credentials do not match.</span>}

                  <button
                    class="btn btn-primary btn-lg btn-block btn-disp"
                    style={{ width: "7rem" }}
                    type="submit"
                  >
                    Continue
                  </button>
                </form>
                <hr />
                <p class="footer p-disp">
                  New member? Sign up{" "}
                  {car == 1 && (
                    <Link
                      to="/Signup"
                      state={{
                        car: location.state.car,
                        tripData: location.state.tripData,
                        ref: 1,
                      }}
                    >
                      Here
                    </Link>
                  )}
                  {car == 0 && <Link to="/Signup">Here</Link>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Login;
