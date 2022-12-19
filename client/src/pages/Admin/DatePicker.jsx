import React from "react";
import "./Admin.css";

function DatePicker(props){
    return(
        <div className = "main">
        <div className="conatiner">
        <div className = "inputTitle"><span style={{"color" : "blue"}}></span>  <img src={props.image } alt="icon" className={props.image_class}></img> {props.text} </div>
        <div className = "row justify-content-start">
          <div className = "col-6 trip" style={{"borderRight" : "1px solid #90a3bf"}}>
              <div>Date</div>
              <input type={"date"}></input>
          </div>
          <div className = "col-6 trip">
              <div>Time</div>
              <input type={"time"}></input>                      
          </div>
        </div>  
      </div>
      </div>
    )

}
export default DatePicker;