import React from "react";
import "./Admin.css";
import DatePicker from "./DatePicker";
import Pick from "./Assets/Mark.svg"
import Drop from "./Assets/Drop.svg"
function DatTimePopup(props) {
    return (
        <div className="popup" >
            <div className=" container   py-5   ">
                <div className="row  d-flex justify-content-center align-items-center ">
                    <div className=" col-8">
                        <div className="card shadow-2-strong card-edit ">
                            <div class="card-header back-image ">
                                <button type="button" class="btn-close d-flex justify-content-end " aria-label="Close" onClick={props.close}></button>
                                <h4 className="d-flex justify-content-start ">
                                {props.title}
                                </h4>
                            </div>
                            <div className=" card-body p-4 text-center">
                                <div class="container">

                                    <div class="row">
                                        <DatePicker image={Pick} image_class={"pick"} text={"From"} />
                                    </div>
                                    <div class="row">
                                    <DatePicker image={Drop} image_class={"drop"} text={"To"} />
                                        
                                    </div>
                                    
                                    <div class=" d-flex justify-content-end ">

                                        <button class="btn btn-primary btn-size btn-lg btn-block" type="submit" style={{"width":"30%"}}>Generate</button>

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
export default DatTimePopup;