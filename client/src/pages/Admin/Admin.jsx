import React from "react";
import "./Admin.css";
import Checkbox from "@mui/material/Checkbox";
import Navbar from "../../components/navbar/Navbar";
import CustomerPopup from "./CustomerPopup";
import CarPopup from "./CarPopup";
import DatTimePopup from "./DateTimePopup";
import Money from "./Assets/money-svgrepo-com (1).svg";
import Car from "./Assets/car-svgrepo-com.svg";
import Update from "./Assets/update-clock-svgrepo-com.svg";
import Customer from "./Assets/user-search-svgrepo-com.svg";
import Status from "./Assets/status-manual-svgrepo-com.svg";
import Chart from "./Assets/chart-up-svgrepo-com.svg";
import OneDatePopup from "./OneDatePopup";
import UpdateStatus from "../UpdateStatus/UpdateStatus";
import AddCar from "../AddCar/AddCar";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function Admin() {
  useEffect(() => {
    fetchItems();
  }, []);


  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:4000/Admin");
      console.log("Successful");
    } catch (err) {
      navigate("/ERROR");
    }
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  /////for status on a specific date///
  const [StatusOpen, setStatus] = useState(false);
  ////// for any car on a specific period///
  const [CarOpen, setCar] = useState(false);
  ///// for all resrvations on a specific period////
  const [DateOpen, setDate] = useState(false);
  //////for all customer reservation////
  const [CustOpen, setCust] = useState(false);
  ///// for daily payments//////
  const [PaymentOpen, setPayment] = useState(false);
  /// for add new car//
  const [NewCarOPen, setNewCar] = useState(false);
  //// for update status///
  const [UpdatStatusOPen, setUpdateStatus] = useState(false);

  const handleClose = () => {
    setStatus(false);
    setCar(false);
    setDate(false);
    setCust(false);
    setPayment(false);
    setNewCar(false);
    setUpdateStatus(false);
  };

  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const [selectedValues, setSelectedValues] = useState([]);
  const options = [
    { value: "car", label: "Car" },
    { value: "customer", label: "Customer" },
    { value: "day", label: "Reservation Day" },
  ];
  // Handle changes to the checkbox list
  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    }
  };

  const advanced = (event) => {
    if (key != "") {
      axios
        .get("http://localhost:4000/search", {
          params: {
            key: key,
            selectedValues: selectedValues,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.length == 0) {
            return;
          }
          navigate("/Table", {
            state: {
              info: response.data,
              title: "All record containing " + key,
            },
          });
        });
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <div class="container">
        <div class="align-items-center">
            
        <form class="elem form-check">
                {options.map((option) => (
                  <li key={option.value}>
                    <input
                      type="checkbox"
                      className="check-input"
                      value={option.value}
                      checked={selectedValues.includes(option.value)}
                      onChange={handleChange}
                    />
                    {option.label}
                    
                  </li>
                ))}
              </form>
        </div>
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="search">
              <i className="fa fa-search"></i>
              <input
                onChange={(e) => {
                  setKey(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Search by car details, customer details or reservation day"
              />
              <div></div>
              
              <button onClick={advanced} class="btn btn-primary">
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className=" container  justify-content-center align-items-center ">
        <div className="row justify-content-center">
          <div className=" col-8 col-md-8 col-sm-8 col-lg-4 col-xl-4">
            <div className="card shadow-2-strong report">
              <div
                className=" card-body p-5 text-center card-size "
                onClick={() => {
                  setNewCar(true);
                }}
              >
                <img
                  src={Car}
                  alt="car"
                  className="image-spacing"
                  style={{ marginBottom: "5%" }}
                ></img>
                <h2> Add new car </h2>
              </div>
            </div>
          </div>
          <div className=" col-8 col-md-8 col-sm-8 col-lg-4 col-xl-4">
            <div className="card shadow-2-strong report">
              <div
                className=" card-body p-5 text-center card-size"
                onClick={() => {
                  setUpdateStatus(true);
                }}
              >
                <img
                  src={Update}
                  alt="update"
                  className="image-spacing"
                  style={{ marginBottom: "5%" }}
                ></img>
                <h2> update status </h2>
              </div>
            </div>
          </div>
          <div className=" col-8 col-md-8 col-sm-8 col-lg-4 col-xl-4">
            <div
              className="card shadow-2-strong report"
              onClick={() => {
                setStatus(true);
              }}
            >
              <div className=" card-body p-5 text-center card-size ">
                <img
                  src={Status}
                  alt="status"
                  className="image-spacing"
                  style={{ marginBottom: "5%" }}
                ></img>
                <h2> car status </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className=" col-8 col-md-8 col-sm-8 col-lg-4 col-xl-4">
            <div
              className="card shadow-2-strong report"
              onClick={() => {
                setDate(true);
              }}
            >
              <div className=" card-body p-5 text-center card-size">
                <img src={Chart} alt="chart" className="image-spacing"></img>
                <h2> Browse by date </h2>
              </div>
            </div>
          </div>
          <div className=" col-8 col-md-8 col-sm-8 col-lg-4 col-xl-4 h-100">
            <div
              className="card shadow-2-strong report"
              onClick={() => {
                setCar(true);
              }}
            >
              <div className=" card-body p-5 text-center card-size">
                <img
                  src={Chart}
                  alt="chart"
                  className="image-spacing"
                  style={{ marginBottom: "5%" }}
                ></img>
                <h2> Browse by car </h2>
              </div>
            </div>
          </div>
          <div className=" col-8  col-md-8 col-sm-8 col-lg-4 col-xl-4 h-100">
            <div
              className="card shadow-2-strong report"
              onClick={() => {
                setCust(true);
              }}
            >
              <div className=" card-body p-5 text-center card-size ">
                <img
                  src={Customer}
                  alt="customer"
                  className="image-spacing"
                ></img>
                <h2> Browse by customer </h2>
              </div>
            </div>
          </div>
          <div className=" col-8 col-md-8 col-sm-8 col-lg-4 col-xl-4 ">
            <div
              className="card shadow-2-strong report"
              onClick={() => {
                setPayment(true);
              }}
            >
              <div className=" card-body p-5 text-center card-size">
                <img src={Money} alt="Money" className="image-spacing"></img>
                <h2> Daily payments </h2>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row justify-content-start">

                    <div className=" col-8 col-md-8 col-sm-8 col-lg-4 col-xl-4 ">
                        <div className="card shadow-2-strong report" onClick={() => { setPayment(true); }}>
                            <div className=" card-body p-5 text-center card-size">
                                <img src={Money} alt="Money" className="image-spacing"  ></img>
                                <h2> Daily payments </h2>
                            </div>
                        </div>
                    </div>
                </div> */}
      </div>
      {CustOpen && <CustomerPopup close={handleClose} />}
      {CarOpen && <CarPopup close={handleClose} />}
      {DateOpen && (
        <DatTimePopup
          close={handleClose}
          title={
            "Generate a report on all reservations within a specific period"
          }
          func={"date"}
        />
      )}
      {PaymentOpen && (
        <DatTimePopup
          close={handleClose}
          title={"Generate a report on daily payments within a specific period"}
          func={"payment"}
        />
      )}
      {StatusOpen && (
        <OneDatePopup
          close={handleClose}
          title={"Generate a report on daily payments within a specific period"}
        />
      )}
      {UpdatStatusOPen && <UpdateStatus close={handleClose} />}
      {NewCarOPen && <AddCar close={handleClose} />}
    </div>
  );
}
export default Admin;
