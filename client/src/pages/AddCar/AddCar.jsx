import React from 'react'
import './AddCar.css';
import "../Admin/Admin.css";
import { useState, useEffect } from "react";
import ErrorIcon from '@mui/icons-material/Error';
import axios from "axios";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
  } from "react-router-dom";

  

function AddCar(props) {
    const [plateId, setPlateId] = useState("");
    const [carManufacturer, setcarManufacturer] = useState("");
    const [carModel, setCarModel] = useState("");
    const [carYear, setCarYear] = useState("");
    const [carPrice, setcarPrice] = useState("");
    const [carType, setCarType] = useState("");
    const [carCapacity, setCarCapacity] = useState("");
    const [carColor, setCarColor] = useState("");
    const [officeID, setOfficeId] = useState("");
    const [carImage, setCarImage] = useState("");
    const [carResponse, setCarResponse] = useState("");
    const [error, setError] = useState("");
    const types = ["sport", "suv", "mpv", "sedan","coupe","hatchback"];

    const car_insertion = (event) => {
        
        if(plateId){
            if(plateId.length != 5){
                setError("Enter a valid plate id");
                return;
            }
            for(let i=0;i<plateId.length-1;i++){
                if(isNaN(plateId.charAt(i))){
                    setError("Enter a valid plate id");
                    return;  
                }
                if(!isNaN(plateId.charAt(4))){
                    setError("Enter a valid plate id");
                    return;  
                }
            }
        }
        if(carYear){
            let year = new Date().getFullYear();
            if(carYear > year || carYear < 1980){
                setError("Enter a valid year 1980-current");
                return;
            }
        }

        if(carPrice){
            if (carPrice <20 || carPrice >200){
                setError("Enter a valid Price 20$-200$");
                return;
            }
        }
  
        if(carType){
            if(!types.includes(carType.toLowerCase()) ){
                setError("Enter a valid car type");
                return;
            }
        }
        if(carCapacity){
            if(carCapacity<2 || carCapacity>8 || carCapacity%2==1){
                setError("Enter a valid Capacity");
                return;
            }
        }
        if(carColor){

            for(let i=0;i<carColor.length;i++){
             if(!isNaN(carColor.charAt(i))){
                setError("Enter a valid Color");
                return;  
                }
            }



        }
        if (carManufacturer != "" && carModel != "" && plateId != "" && carYear != "" && carPrice != "" && carType != "" && carCapacity != "" && carColor != "" && officeID != "" && carImage != "" ){
            axios
                .post("http://localhost:4000/addCar" , {
                   
                         plateId,
                         carManufacturer,
                         carModel,
                         carYear,
                         carPrice,
                         carType,
                         carCapacity,
                         carColor,
                         officeID,
                         carImage,
                    
                })
                

                .then((response)=>{
                    console.log(response);
                    if(response.length!=0){
                        // alert(response.data);
                        setCarResponse(response.data);
                       
                        // props.continue(false);
                    }
                 
                })
        }
    };
    



    
    return (
        <div className='popup'>
            <div class="container py-5">
                <div class="row d-flex justify-content-center align-items-center ">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card shadow-2-strong card-edit" >
                            <div class="card-header back-image ">
                                <button type="button" class="btn-close d-flex justify-content-end " aria-label="Close" onClick={props.close}></button>
                                <h4 className="d-flex justify-content-start ">
                                    Add a new car
                                </h4>
                            </div>
                            <div class="card-body p-4 text-center">



                                <div class="container">

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Plate ID'
                                                       required
                                                       onChange={(e) => {
                                                         setPlateId(e.target.value);
                                                         setError("");
                                                       }}
                                                />
                                                   {plateId == "" && (<span> This field is required.</span> )}
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Manufacturer'                             required
                                                       onChange={(e) => {
                                                        setcarManufacturer(e.target.value);
                                                         setError("");
                                                       }}
                                                />
                                                   {carManufacturer == "" && (<span> This field is required.</span> )}
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Model'   
                                                        required
                                                       onChange={(e) => {
                                                        setCarModel(e.target.value);
                                                         setError("");
                                                       }}
                                                />
                                                   {carModel== "" && (<span> This field is required.</span> )}
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Year'     
                                                        required
                                                       onChange={(e) => {
                                                        setCarYear(e.target.value);
                                                         setError("");
                                                       }}
                                                />
                                                   {carYear== "" && (<span> This field is required.</span> )}
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Price' 
                                                        required
                                                       onChange={(e) => {
                                                        setcarPrice(e.target.value);
                                                         setError("");
                                                       }}
                                                />
                                                   {carPrice== "" && (<span> This field is required.</span> )}
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Type'    
                                                     required
                                                       onChange={(e) => {
                                                        setCarType(e.target.value);
                                                         setError("");
                                                       }}
                                                />
                                                   {carType== "" && (<span> This field is required.</span> )}
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Capacity'    
                                                     required
                                                       onChange={(e) => {
                                                        setCarCapacity(e.target.value);
                                                         setError("");
                                                       }}
                                                />
                                                   {carCapacity== "" && (<span> This field is required.</span> )}
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Color'   
                                                      required
                                                       onChange={(e) => {
                                                        setCarColor(e.target.value);
                                                         setError("");
                                                       }}
                                                />
                                                   {carColor== "" && (<span> This field is required.</span> )}
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="text" id="typeEmailX-2" class="form-control form-control-lg" placeholder='Office ID'   
                                                      required
                                                       onChange={(e) => {
                                                        setOfficeId(e.target.value);
                                                         setError("");
                                                       }}
                                                />
                                                   {officeID== "" && (<span> This field is required.</span> )}
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <input type="url" id="typePasswordX-2" class="form-control form-control-lg" placeholder='Car Image'   
                                                      required
                                                       onChange={(e) => {
                                                        setCarImage(e.target.value);
                                                         setError("");
                                                       }}
                                                />
                                                   {carImage== "" && (<span> This field is required.</span> )}
                                            </div>
                                        </div>
                                    </div>


                                    <div class=" d-flex justify-content-end ">

                                        <button class="btn btn-primary btn-size btn-lg btn-block" type="submit" style={{"width":"30%"}} onClick = {car_insertion}>Add Car</button>
                                        {carResponse != "" && 
                                                   
                                               <div style = {{"margin-top" : "10px", "margin-left" : "20px"}}><span>{carResponse}{carResponse == "ERROR !!" ?<ErrorIcon style={{"margin-left" : "5px"}}/>:<CheckCircleOutlineRoundedIcon style={{"margin-left" : "5px"}} />}</span></div>
                                         
                                           
                                         }
                                    </div>
                                    {error != "" && <div class = "Error">{error}</div>}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddCar;