import React from "react";
import "./Admin.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function CarPopup(props) {
  const [carManufacturer, setcarManufacturer] = useState("");
  const [carModel, setCarModel] = useState("");
  const [plateId, setPlateId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const car_reservation = (event) => {
    if (carManufacturer != "" && carModel != "" && plateId !="") {
      axios
        .get("http://localhost:4000/carReservations", {
          params: {
            plate_id: plateId,
            man: carManufacturer,
            model: carModel
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.length == 0) {
            setError("no entry");
            return;
          }
          navigate("/Table", {
            state: {
              info: response.data,
              title:
                "Report on all reservations of " +
                carManufacturer +" " + carModel + 
                " - PLATE ID: " +
                plateId, 
            },
          });
        });
    }
  };

  return (
    <div className="popup ">
      <div className=" container   py-5   ">
        <div className="row  d-flex justify-content-center align-items-center ">
          <div className=" col-8">
            <div className="card shadow-2-strong card-edit ">
              <div class="card-header back-image ">
                <button
                  type="button"
                  class="btn-close d-flex justify-content-end "
                  aria-label="Close"
                  onClick={props.close}
                ></button>
                <h4 className="d-flex justify-content-start ">
                  Generate a report on all reservations of a specific car
                </h4>
              </div>
              <div className=" card-body p-4 text-center">
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <div class="form-outline mb-4">
                        <span className="d-flex justify-content-start image-spacing">
                          {" "}
                          Car Manufacturer:
                        </span>
                        <input
                          required
                          onChange={(e) => {
                            setcarManufacturer(e.target.value);
                            setError("");
                          }}
                          type="text"
                          id="carManufacturer"
                          class="form-control form-control-lg"
                          placeholder="Type"
                        />
                         {carManufacturer == "" && (
                          <span> This field is required.</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="form-outline mb-4">
                        <span className="d-flex justify-content-start image-spacing">
                          {" "}
                          Car Model:
                        </span>
                        <input
                          required
                          onChange={(e) => {
                            setCarModel(e.target.value);
                            setError("");
                          }}
                          type="text"
                          id="CarModel"
                          class="form-control form-control-lg"
                          placeholder="Model"
                        />
                         {carModel == "" && (
                          <span> This field is required.</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="form-outline mb-4">
                        <span className="d-flex justify-content-start image-spacing">
                          {" "}
                          Plate Id:
                        </span>
                        <input
                          required
                          onChange={(e) => {
                            setPlateId(e.target.value);
                            setError("");
                          }}
                          type="text"
                          id="CarModel"
                          class="form-control form-control-lg"
                          placeholder="Plat Id"
                        />
                         {plateId == "" && (
                          <span> This field is required.</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {error == "no entry" && (
                          <span> Can't find database match.</span>
                        )}
                  <div class=" d-flex justify-content-end ">
                    <button
                      class="btn btn-primary btn-size  btn-lg btn-block"
                      type="submit"
                      style={{ width: "30%" }}
                      onClick={car_reservation}

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
export default CarPopup;
