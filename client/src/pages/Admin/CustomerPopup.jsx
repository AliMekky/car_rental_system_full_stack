import React from "react";
import "./Admin.css";
import { useState, useEffect } from "react";
import axios from "axios";

function CustomerPopup(props) {
  const [custName, setCustName] = useState("");
  const [custEmail, setCustEmail] = useState("");

  const cust_reservation = (event) => {
    if (custName != "" && custEmail != "") {
      axios.get("http://localhost:4000/customerReservations", {
        params: {
          name: custName,
          email: custEmail,
        },
      });
    }
  };

  return (
    <div className="popup">
      <div className=" container   py-5   ">
        <div className="row  d-flex justify-content-center align-items-center ">
          <div className=" col-8">
            <div className="card shadow-2-strong card-edit  ">
              <div class="card-header back-image ">
                <button
                  type="button"
                  class="btn-close d-flex justify-content-end "
                  aria-label="Close"
                  onClick={props.close}
                ></button>
                <h4 className="d-flex justify-content-start ">
                  Generate a report on all reservations of a specific customer
                </h4>
              </div>
              <div className=" card-body p-4 text-center">
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <div class="form-outline mb-4">
                        <span className="d-flex justify-content-start image-spacing">
                          {" "}
                          Customer's Name:
                        </span>
                        <input
                          required
                          onChange={(e) => {
                            setCustName(e.target.value);
                          }}
                          type="text"
                          id="typeEmailX-2"
                          class="form-control form-control-lg"
                          placeholder="Name"
                        />
                        {   custName == "" &&
                            <span> This field is required.</span>}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="form-outline mb-4">
                        <span className="d-flex justify-content-start image-spacing">
                          {" "}
                          Customer's Email:
                        </span>
                        <input
                          required
                          onChange={(e) => {
                            setCustEmail(e.target.value);
                          }}
                          type="text"
                          id="typeEmailX-2"
                          class="form-control form-control-lg"
                          placeholder="Email"
                        />
                        {   custEmail == "" &&
                            <span> This field is required.</span>}
                      </div>
                    </div>
                  </div>
                  <div class=" d-flex justify-content-end ">
                    <button
                      class="btn btn-primary  btn-lg btn-block"
                      type="submit"
                      onClick={cust_reservation}
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CustomerPopup;
