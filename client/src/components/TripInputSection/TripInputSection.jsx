import React from 'react'
import "./TripInputSection";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import InputBox from "../../components/LocationDateTime/LocationDateTime";


function TripInputSection() {
  return (
    <div className = "datetime">
    <form className = "datetime-form" type = "post">
        <div className = "country">
          {/* <label><RadioButtonCheckedIcon/> Country</label> */}
          <select className = "countrySelect">
            <option selected disabled > Country </option>
          </select>
        </div>
        <div style={{"position" : "relative"}}>
          <InputBox title = {"Pick-up"}/>
          <div className = "box"><SwapVertIcon/></div>
          <InputBox title = {"Drop-off"}/>
        </div>  
        <div style = {{"margin-top" : "20px"}}>
        <a class="login btn btn-primary" href="#" role="button">GO</a>
        </div>
    </form>    

</div>
  )
}

export default TripInputSection
