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
  // let payButton = 1; // 0 means pay later [payment box invisible], 1 means pay now [payment box visible ]
  const [carResponse, setCarResponse] = useState(""); // message to be shown next to confirm
  const [payCard, setPayCard] = useState(false);
  const [payLater, setPayLater] = useState(false);
  const [payButton, setPayButton] = useState(0);
  const [disable1, setdisable1] = useState(false);
  const [disable2, setdisable2] = useState(false);
  const [promoCode, setpromoCode] = useState("");
  const [discount, setDiscount] = useState(false);
  const [error, setError] = useState(false);

  let validPromo = "NEW2023";
  console.log(promoCode)
  const handleChange = event => {
    if (event.target.checked) {
      console.log('✅ Checkbox is checked');
      if (event.target.id === "card") {
        setPayCard(true)
        setPayButton(1)
        setdisable2(true)

      }
      else if (event.target.id === "cash") {
        setPayLater(true)
        setPayButton(0)
        setdisable1(true)
      }
    }
    else {
      setPayCard(false)
      setPayLater(false)
      setPayButton(0)
      setdisable1(false)
      setdisable2(false)
    }

  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log(promoCode)
    if (promoCode === validPromo) {
      setDiscount(true)
    }
    else{
      setError(true)
    }
  };
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
  let newPrice = (80 / 100) * total;
  let discounted = (20 / 100) * total;
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
                    <div className="row " style={{ marginTop: "20px", marginBottom: "20px" }}>
                      <div className="col">
                        <div class=" promo">
                          <input
                            type="text"
                            id="typePasswordX-2"
                            class="form-control form-control-lg"
                            placeholder="Apply promocode"
                            value={promoCode}
                            onChange={(e) => {
                              setpromoCode(e.target.value);
                              setError(false)
                            }}

                          />
                          {
                          discount ?(<button className="btn btn-primary btn-lg btn-block"   onClick={() => {
                  setDiscount(false);
                  setpromoCode("");
                }}> Remove</button>)
                          :(<button className="btn btn-primary btn-lg btn-block" onClick={handleSubmit}> Apply</button>)
                          }
                        </div>

                      </div>



                     {error &&( <span style={{ color: "red" ,paddingLeft:"20px"}}> Oops! Promo Code invalid</span>)}
                    </div>
                    
                    <div class="row justify-content-start" style={{ paddingLeft: "10px" }}>
                      <div className="col-8">
                        <label class="label_title"> subtotal</label>
                        {
                          discount && (
                            <label class="label_title" style={{ color: "red" }}> Discount</label>)}
                      </div>
                      <div className="col">
                        <h6 style={{ fontWeight: "bold", paddingLeft: "28px" }} >{total + "EGP"}</h6>
                        {
                          discount && (<h6 style={{ fontWeight: "bold", paddingLeft: "28px", color: "red" }} >{discounted + "EGP"}</h6>)}
                      </div>
                    </div>
                    <div class="row " style={{ paddingLeft: "10px" }}>
                      <div className="col-8">

                        <h3 class="title">{"Total Rental Price"}</h3>
                        <label class="label_title">
                          Overall price inclusive of VAT
                        </label>
                      </div>
                      <div className="col">
                        {
                          discount ? (<h3 style={{ fontWeight: "bold" }} >{newPrice + "EGP"}</h3>) : (<h3 style={{ fontWeight: "bold" }} >{total + "USD"}</h3>)}
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
                  <h3 class="title">Please Enter your payment method</h3>
                  <div class="container">

                    <div class="row" style={{ paddingLeft: "30px", paddingTop: "20px" }}>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value={payCard} id="card" onChange={handleChange} disabled={disable1} />
                        <h5 class="form-check-label" for="flexCheckChecked">
                          Debit/Credit Card
                        </h5>
                      </div>

                    </div>
                    <div class="row" style={{ paddingLeft: "30px", paddingTop: "20px" }}>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value={payLater} id="cash" onChange={handleChange} disabled={disable2} />
                        <h5 class="form-check-label" for="flexCheckChecked">
                          Cash on Pickup
                        </h5>
                      </div>

                    </div>
                    {
                      payLater && (

                        <div className="row justify-content-center" style={{ marginTop: "20px" }}>
                          <button
                            class="btn btn-primary btn-lg btn-block"
                            type="submit"
                            onClick={post}
                            disabled={confirmState}
                            style={{ "width": "100%" }}
                          >
                            Confirm
                          </button>
                        </div>

                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {payCard && (<div>
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
                    <div className="row justify-content-center" style={{ marginTop: "20px" }}>
                      <button
                        class="btn btn-primary btn-lg btn-block"
                        type="submit"
                        onClick={post}
                        style={{ "width": "100%" }}
                        disabled={confirmState}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}


    </div>
  );
}

export default Payment;
