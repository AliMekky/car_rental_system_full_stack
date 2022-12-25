import React from "react";
import "./CarDetail.css";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";

function CarDetail() {
  const location = useLocation();
  const car = location.state.car;

  return (
    <div>
      <Navbar />
      <ul class="cards">
        <li>
          <a href="" class="card">
            <img
              src={car.IMAGE}
              class="card__image"
              alt=""
            />
            <div class="card__overlay">
              <div class="card__header">
                <div class="card__header-text">
                  <div>
                    <div>
                      <table>
                        <tr class="table__data">
                          <td>
                            <div>
                              <span class="car__name">.</span>
                              <span class="car__price">{car.PRICE + "$/day"}</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div>
                              <span class="car__name_m">{car.MANUFACTURER + "-" + car.MODEL}</span>
                              <span>
                                <button class="btn btn-primary car__price_m">
                                  Rent Now
                                </button>
                              </span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="data">
                <div class="row">
                  <div class="col-md-3 title-word">Manufacturer:</div>
                  <div class="col-md-3 value-word">{car.MANUFACTURER}</div>
                  <div class="col-md-3 title-word">Model:</div>
                  <div class="col-md-3 value-word">{car.MODEL}</div>
                </div>
                <div class="row">
                  <div class="col-md-3 title-word">Year:</div>
                  <div class="col-md-3 value-word">{car.YEAR}</div>
                  <div class="col-md-3 title-word">Price:</div>
                  <div class="col-md-3 value-word">{car.PRICE + "$/day"}</div>
                </div>
                <div class="row">
                  <div class="col-md-3 title-word">Type:</div>
                  <div class="col-md-3 value-word">{car.TYPE}</div>
                  <div class="col-md-3 title-word">Capacity:</div>
                  <div class="col-md-3 value-word">{car.CAPACITY + "people"} </div>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default CarDetail;
