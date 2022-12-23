import React, { useState } from "react";
import "./Signup.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(0);
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/signup", {
        name,
        email,
        password,
        phone_number,
        isAdmin,
      })
      .then((response) => {
        if (response.data == "Welcome, user!") {
          navigate("/");
        }
      });
  };

  return (
    <div>
      <Navbar />
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
                      </div>
                    </div>
                  </div>
                </div>

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
                  Already a member? Login <a href="/Login">Here</a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
