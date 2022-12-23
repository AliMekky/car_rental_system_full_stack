import React from "react";
import "./Admin.css";

function OneDatePicker(props){
  
    return(
        <div className = "main">
        <div className="conatiner ">
        
        <div className = "row justify-content-center">
          <div className = "col-12 trip day" >
              <div >Date</div>
              <input type={"date"}
               onChange={(e) => {
                props.handleDate(e.target.value);
              }}
              ></input>
          </div>
       
        </div>  
      </div>
      </div>
    )

}
export default OneDatePicker;