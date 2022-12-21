import React from "react";
import "./Admin.css";
function CarPopup(props){
    return (
        <div className="popup ">
            <div className=" container   py-5   ">
                <div className="row  d-flex justify-content-center align-items-center ">
                    <div className=" col-8">
                        <div className="card shadow-2-strong card-edit ">
                            <div class="card-header back-image ">
                                <button type="button" class="btn-close d-flex justify-content-end " aria-label="Close" onClick={props.close}></button>
                                <h4 className="d-flex justify-content-start ">
                                    Generate a report on all reservations of a specific car
                                </h4>
                            </div>
                            <div className=" card-body p-4 text-center">
                                <div class="container">

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <span className="d-flex justify-content-start image-spacing"> Car Type:</span>
                                                <input type="text" id="CarType" class="form-control form-control-lg" placeholder='Type' />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <span className="d-flex justify-content-start image-spacing"> Car Model:</span>
                                                <input type="text" id="CarModel" class="form-control form-control-lg" placeholder='Model' />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-outline mb-4">
                                                <span className="d-flex justify-content-start image-spacing"> Plate Id:</span>
                                                <input type="text" id="CarModel" class="form-control form-control-lg" placeholder='Plat Id' />
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" d-flex justify-content-end ">
                                        
                                        <button class="btn btn-primary btn-size  btn-lg btn-block" type="submit" style={{"width":"30%"}}>Generate</button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CarPopup;