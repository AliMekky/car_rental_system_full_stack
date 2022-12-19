import React from "react";
import "./Payment.css";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/Card/Card";

function Payment() {
  return (
    <div>
      <Navbar />
      <div class="edit">
        <Card/>
      </div>
      <div>
        <div class="container py-5 h-50">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong">
                <div class="card-body p-5">
                  <h3 class="title">Rental Info</h3>
                  <label class="label_title">
                    These are your rental details.
                  </label>
                  <div class="container">
                    <label class="label_title nom">Pickup Details</label>
                    <div class="row">
                      <div class="col">
                        <div class="form-outline mb-4">
                          <label class="label_text">Location</label>
                          <input
                            type="text"
                            id="typeEmailX-2"
                            class="form-control form-control-lg"
                            placeholder="Pickup Location"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-outline mb-4">
                          <label class="label_text">Time</label>
                          <input
                            type="number"
                            id="typePasswordX-2"
                            class="form-control form-control-lg"
                            placeholder="Time"
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
                            placeholder="Pickup Location"
                          />
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-outline mb-4">
                          <label class="label_text">Time</label>

                          <input
                            type="number"
                            id="typePasswordX-2"
                            class="form-control form-control-lg"
                            placeholder="Time"
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
      <div class="container py-5 h-50 btn_ctn">
        <button class="btn btn-primary btn-lg btn-block center" type="submit">
          Confirm Renting
        </button>
      </div>
    </div>
  );
}

export default Payment;
