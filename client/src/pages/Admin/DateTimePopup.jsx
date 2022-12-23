import React from "react";
import "./Admin.css";
import DatePicker from "./DatePicker";
// import { DatePicker } from 'antd';
import Pick from "./Assets/Mark.svg";
import Drop from "./Assets/Drop.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
function DatTimePopup(props) {
  const [startDate, setstartDate] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endDate, setendDate] = useState("");
  const [endTime, setendTime] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const reservations = (event) => {


    if (startDate != "" && endDate != "" && startTime !="" && endTime!="") {
      axios
        .get("http://localhost:4000/reservations", {
          params: {
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
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
                "Information about all Reservations from " +
                startDate +
                " " +
                startTime +
                " to " +
                endDate +
                " " +
                endTime,
            },
          });
        });
    }
  };
  const dailyPayments = (event) => {


    if (startDate != "" && endDate != "" && startTime !="" && endTime!="") {
      axios
        .get("http://localhost:4000/dailyPayments", {
          params: {
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
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
                "Information about all Daily Payments from " +
                startDate +
                " " +
                startTime +
                " to " +
                endDate +
                " " +
                endTime,
            },
          });
        });
    }
  };
  return (
    <div className="popup">
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
                <h4 className="d-flex justify-content-start ">{props.title}</h4>
              </div>
              <div className=" card-body p-4 text-center">
                <div class="container">
                  <div class="row">
                    <DatePicker
                      handleDate={(value) => setstartDate(value)}
                      handleTime={(value) => setstartTime(value)}
                      image={Pick}
                      image_class={"pick"}
                      text={"From"}
                    />
                    {(startTime=="" || startDate == "") && <span> This field is required.</span>}
                  </div>
                  <div class="row">
                    <DatePicker
                      handleDate={(value) => setendDate(value)}
                      handleTime={(value) => setendTime(value)}
                      image={Drop}
                      image_class={"drop"}
                      text={"To"}
                    />
                    {(endDate == "" || endTime == "") && <span> This field is required.</span>}
                    {error == "no entry" && (
                      <span> Can't find database match.</span>
                    )}
                  </div>

                  <div class=" d-flex justify-content-end ">
                    <button
                      class="btn btn-primary btn-size btn-lg btn-block"
                      type="submit"
                      style={{ width: "30%" }}
                      onClick={props.func== "date" ?( reservations):(dailyPayments)}
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
export default DatTimePopup;
