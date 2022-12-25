import React from 'react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import "./LocationDateTime.css";


{/* <select className="countrySelect" onChange={(e)=>{setCountry(e.target.selectedIndex)}}> 
{countries.map((item)=><option style= {{color : "black"}}>{item.COUNTRY}</option>)}
</select> */}
function LocationDateTime(props) {
  console.log(props);
  return (
                <div className = "main">
                    {/* <label><RadioButtonCheckedIcon/> Country</label> */}
                    <div className = "inputTitle"><span style={{"color" : "blue"}}><RadioButtonCheckedIcon/></span> {props.title}</div>
                    <div className = "row">
                      <div className = "col-4 trip"  style={{"borderRight" : "1px solid #90a3bf"}}>
                          <label>Locations</label>
                          <div>
                            {/* <select>
                              <option selected disabled className  = "location-option"> Alexandria </option>
                            </select> */}
                            <select onChange={(e)=>{props.editLocation(e.target.selectedIndex-1); props.editCity(props.citiesOptions[e.target.selectedIndex-1].CITY);console.log(props.citiesOptions[e.target.selectedIndex-1].CITY);props.editError(""); }}> 
                              <option selected disabled className  = "location-option" > City </option>
                              {props.citiesOptions.map((item)=><option className  = "location-option">{item.CITY}</option>)}
                            </select>
                          </div>
                      </div>
                      <div className = "col-4 trip" style={{"borderRight" : "1px solid #90a3bf"}}>
                          <label>Date</label>
                          <div><input type={"date"} onChange = {(e)=>{props.editDate(e.target.value); props.editError("");}}></input></div>
                      </div>
                      <div className = "col-4 trip">
                          <div>Time</div>
                          <div><input type={"time"} onChange = {(e)=>{props.editTime(e.target.value); props.editError("");}}></input></div>                      
                      </div>
                    </div>  
                  </div>
  )
}

export default LocationDateTime
