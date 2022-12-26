import React from "react";
import "./Payment.css";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/Card/Card";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// import sgMail from "@sendgrid/mail";

function Payment() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [confirmState, setconfirmState] = useState(false);

  const location = useLocation();
  useEffect(() => {
    async function load() {
      try {
        const res = await axios
          .get("http://localhost:4000/payment")
          .then((response) => {
            setEmail(response.data.email);
          });
      } catch (error) {
        console.log(error);
      }
    }
    load();
  }, []);
  console.log(location.state.tripData);
  const tripData = location.state.tripData;
  let date1 = new Date(tripData.startDate);
  let date2 = new Date(tripData.endDate);
  let difference = date2 - date1;
  let payButton = 1; // 0 means pay later [payment box invisible], 1 means pay now [payment box visible ]
  const [carResponse, setCarResponse] = useState(""); // message to be shown next to confirm
  const post = (e) => {
    e.preventDefault();
    try {
      const res = axios
        .post("http://localhost:4000/reserve", {
          email: email,
          plate_id: tripData.PLATE_ID,
          pickup_date: tripData.startDate + " " + tripData.startTime,
          dropoff_date: tripData.endDate + " " + tripData.endTime,
          pickup_loc: tripData.startLocation,
          dropoff_loc: tripData.endLocation,
          date: new Date(),
          payMethod: payButton,
        })
        .then((response) => {
          console.log("Insertion in reservation done.");
          setCarResponse("Reservation DONE!");
          setconfirmState(true);
          // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          // const msg = {
          //   to: "laraabdelbaki@gmail.com",
          //   from: "laraabdelbaki@gmail.com",
          //   subject: "Send whole page in email",
          //   text: "This is the body of the email",
          //   html: "<p>This is the body of the email</p>",
          // };
          // // Send the email
          // sgMail
          //   .send(msg)
          //   .then(() => {
          //     console.log("Email sent");
          //   })
          //   .catch((error) => {
          //     console.error(error);
          //   });

          // alert("Reservation ")
          // navigate("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Convert the difference to days
  let days = difference / (1000 * 60 * 60 * 24);
  let total = days * tripData.PRICE;
  return (
    <div>
      <Navbar />
      {carResponse != "" && (
        <div class="alert alert-success">
          <strong>Reservation Done!</strong> Return to{" "}
          <a href="/" class="alert-link">
            Home Page
          </a>
          .
        </div>
      )}
      <div>
        <div class="container py-5 h-50">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong">
                <div class="card-body p-5">
                  <h3 class="title">Rental Info for {email}</h3>
                  <label class="label_title">
                    These are your rental details.
                  </label>
                  <div class="container">
                    <label class="label_title nom">Car details </label>
                    <div class="row">
                      <div class="col">
                        <img src={tripData.IMAGE}></img>
                      </div>
                      <div class="col">
                        <div class="form-outline mb-4">
                          <h5 style={{ fontWeight: "bold" }}>
                            {tripData.MANUFACTURER +
                              " " +
                              tripData.MODEL +
                              " " +
                              tripData.YEAR}
                          </h5>
                          <h6> {tripData.TYPE}</h6>
                          <h6> {tripData.CAPACITY + " Person"}</h6>
                        </div>
                      </div>
                    </div>
                    <label class="label_title nom">Pickup Details</label>
                    <div class="row">
                      <div class="col">
                        <div class="form-outline mb-4">
                          <label class="label_text">Location</label>
                          <input
                            type="text"
                            id="typeEmailX-2"
                            class="form-control form-control-lg"
                            placeholder={tripData.startLocation}
                            disabled
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-outline mb-4">
                          <label class="label_text">Date</label>
                          <input
                            type="number"
                            id="typePasswordX-2"
                            class="form-control form-control-lg"
                            placeholder={
                              tripData.startDate + " at " + tripData.startTime
                            }
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <label class="label_title nom">Drop off Details</label>
                    <div class="row">
                      <div class="col">
                        <div class="form-outline mb-4">
                          <label class="label_text">Location</label>
                          <input
                            type="text"
                            id="typeEmailX-2"
                            class="form-control form-control-lg"
                            placeholder={tripData.endLocation}
                            disabled
                          />
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-outline mb-4">
                          <label class="label_text">Date</label>

                          <input
                            type="number"
                            id="typePasswordX-2"
                            class="form-control form-control-lg"
                            placeholder={
                              tripData.endDate + " at " + tripData.endTime
                            }
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row ">
                      <div className="col">
                        <h3 class="title">{"Total Rental Price"}</h3>
                      </div>
                      <div className="col">
                        <h3 class="title">{total + "EGP"}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="container py-4 h-50">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong">
                <div class="card-body p-5">
                  <h3 class="title">Payment</h3>
                  <label class="label_title">
                    Please enter your payment details.
                  </label>

                  <div class="container">
                    <label class="label_title nom">Credit Card</label>
                    <div class="row">
                      <div class="col">
                        <div class="form-outline mb-4">
                          <label class="label_text">Card Number</label>
                          <input
                            type="text"
                            id="typeEmailX-2"
                            class="form-control form-control-lg"
                            placeholder="Card Number"
                          />
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-outline mb-4">
                          <label class="label_text">Expiration Date</label>

                          <input
                            type="number"
                            id="typePasswordX-2"
                            class="form-control form-control-lg"
                            placeholder="Expiration Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-outline mb-4">
                          <label class="label_text">Card Holder Name</label>
                          <input
                            type="text"
                            id="typeEmailX-2"
                            class="form-control form-control-lg"
                            placeholder="Card Holder Name"
                          />
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-outline mb-4">
                          <label class="label_text">CVC</label>

                          <input
                            type="number"
                            id="typePasswordX-2"
                            class="form-control form-control-lg"
                            placeholder="CVC"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container py-5 h-50 btn_ctn" style={{ textAlign: "center" }}>
        <button
          class="btn btn-primary btn-lg btn-block"
          type="submit"
          onClick={post}
          disabled={confirmState}
        >
          Confirm Renting
        </button>
        {/* {carResponse != "" && <span>Reservation done!</span>} */}
      </div>
    </div>
  );
}

export default Payment;
