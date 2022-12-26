import React from 'react'
import './UpdateStatus.css';
import "../Admin/Admin.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
  } from "react-router-dom";

function UpdateStatus(props) {
  const [plateId, setPlateId] = useState("");
  const [status, setStatus] = useState("");
  const [carStatusResponse, setcarStatusResponse] = useState("");
  const [error, setError] = useState("");


  const update_status = (event) => {



    if(plateId !="" && status !="" ){
      axios
           .post("http://localhost:4000/updateStatus" , {
            plateId,
            status,
            })

            .then((response)=>{
              console.log(response);
              if(response.length!=0){
                setcarStatusResponse(response.data);

              }
            },(error)=> {
              console.log(error);

            })

    }
  };

    

    




  return (
    <div className="popup">


      <div class="container py-5 ">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong card-edit" >
              <div class="card-header back-image ">
                <button type="button" class="btn-close d-flex justify-content-end " aria-label="Close" onClick={props.close}></button>
                <h4 className="d-flex justify-content-start ">
                  Update Satatus of a car
                </h4>
              </div>
              <div class="card-body p-4 text-center">



                <div class="form-outline mb-4">
                  {/* <label class="form-label" for="typeEmailX-2">Email</label> */}
                  <input type="email" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Plate ID'       
                         required
                         onChange={(e) => {
                         setPlateId(e.target.value);
                         setError("");
                           }}
                   />
                  {plateId== "" && (<span> This field is required.</span> )}
                </div>

                <div class="form-outline mb-4">
                  {/* <label class="form-label" for="typePasswordX-2">Password</label> */}
                  <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='New Status'                          required
                         onChange={(e) => {
                         setStatus(e.target.value);
                         setError("");
                           }}
                   />
                  {status== "" && (<span> This field is required.</span> )}
                </div>


                <div class=" d-flex justify-content-end ">

                  <button class="btn btn-primary btn-size btn-lg btn-block" type="submit" onClick = {update_status}>Update</button>
                  {carStatusResponse != "" && 
                                                   
                         <div style = {{"margin-top" : "10px", "margin-left" : "20px"}}><span>{carStatusResponse}{carStatusResponse == "ERROR !!" ?<ErrorIcon style={{"margin-left" : "5px"}}/>:<CheckCircleOutlineRoundedIcon style={{"margin-left" : "5px"}} />}</span></div>
                                             
                                               
                  }



                </div>
                {error != "" && <div class = "Error">{error}</div>}

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default UpdateStatus;