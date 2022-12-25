import { React, useState } from "react";
import "./Login.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(0);
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let history = document.referrer;
    console.log(history);
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
            if (String(history) === "http://localhost:3000/BrowseCars") {
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
                  isLogged: response.data.isLogged
                },
              });
            } else {
              navigate("/", {
                state: {
                  name: response.data.name,
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
                  New member? Sign up <a href="/Signup">Here</a>{" "}
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
