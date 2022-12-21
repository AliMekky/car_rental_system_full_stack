import React from "react";
import "./Admin.css";
import OneDatePicker from "./OneDatePicker";
function OneDatePopup(props) {
    return (
        <div className="popup" >
            <div className=" container   py-5   ">
                <div className="row  d-flex justify-content-center align-items-center ">
                    <div className=" col-8">
                        <div className="card shadow-2-strong card-edit ">
                            <div class="card-header back-image ">
                                <button type="button" class="btn-close d-flex justify-content-end " aria-label="Close" onClick={props.close}></button>
                                <h4 className="d-flex justify-content-start ">
                                Generate a report on the status of a all cars on a specific day
                                </h4>
                            </div>
                            <div className=" card-body p-4 text-center">
                                <div class="container">

                                    <div class="row">
                                        <OneDatePicker />
                                    </div>
                                   
                                    
                                    <div class=" d-flex justify-content-end ">

                                        <button class="btn btn-primary btn-size btn-lg btn-block" type="submit" style={{"width":"20%"}}>Generate</button>

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
export default OneDatePopup;