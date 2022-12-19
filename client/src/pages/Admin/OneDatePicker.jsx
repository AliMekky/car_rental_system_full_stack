import React from "react";
import "./Admin.css";

function OneDatePicker(){
    return(
        <div className = "main">
        <div className="conatiner ">
        
        <div className = "row justify-content-center">
          <div className = "col-12 trip day" >
              <div >Date</div>
              <input type={"date"}></input>
          </div>
       
        </div>  
      </div>
      </div>
    )

}
export default OneDatePicker;