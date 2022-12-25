import React from "react";
import "./Card.css";
import { useLocation } from "react-router-dom";

function Card() {
  const location = useLocation();
  const car = location.state.car;
  return (
    <div class="cards">
        <a href="" class="card">
          <img
            src="https://imgd-ct.aeplcdn.com/1056x660/n/cw/ec/40432/scorpio-n-exterior-front-view.jpeg?isig=0&q=75"
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
                            <span class="car__price">90$/day</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <span class="car__name_m">Nissan GT-R</span>
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
                <div class="col-sd-3 title-word">Manufacturer:</div>
                <div class="col-sd-3 value-word">Nissan</div>
                <div class="col-sd-3 title-word">Model:</div>
                <div class="col-sd-3 value-word">GT - R</div>
              </div>
              <div class="row">
                <div class="col-sd-3 title-word">Year:</div>
                <div class="col-sd-3 value-word">2017</div>
                <div class="col-sd-3 title-word">Price:</div>
                <div class="col-sd-3 value-word">90$/day</div>
              </div>
              <div class="row">
                <div class="col-sd-3 title-word">Type:</div>
                <div class="col-sd-3 value-word">Sports</div>
                <div class="col-sd-3 title-word">Capacity:</div>
                <div class="col-sd-3 value-word">4 people</div>
              </div>
            </div>
          </div>
        </a>
    </div>
  );
}

export default Card;
