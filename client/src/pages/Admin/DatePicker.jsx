import React from "react";
import "./Admin.css";
import { useState, useEffect } from "react";
import axios from "axios";

function DatePicker(props) {
  const [dateStart, setDate] = useState("");
  const [time, setTime] = useState("");
  return (
    <div className="main">
      <div className="conatiner">
        <div className="inputTitle">
          <span style={{ color: "blue" }}></span>{" "}
          <img src={props.image} alt="icon" className={props.image_class}></img>{" "}
          {props.text}{" "}
        </div>
        <div className="row justify-content-start">
          <div
            className="col-6 trip"
            style={{ borderRight: "1px solid #90a3bf" }}
          >
            <div>Date</div>
            <input
              onChange={(e) => {
                props.handleDate(e.target.value);
              }}
              type={"date"}
            ></input>
          </div>
          <div className="col-6 trip">
            <div>Time</div>
            <input
              onChange={(e) => {
                props.handleTime(e.target.value);
              }}
              type={"time"}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DatePicker;
