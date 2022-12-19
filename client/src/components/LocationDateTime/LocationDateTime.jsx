import React from 'react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import "./LocationDateTime.css";

function LocationDateTime(props) {
  return (
                <div className = "main">
                    {/* <label><RadioButtonCheckedIcon/> Country</label> */}
                    <div className = "inputTitle"><span style={{"color" : "blue"}}><RadioButtonCheckedIcon/></span> {props.title}</div>
                    <div className = "row">
                      <div className = "col-4 trip"  style={{"borderRight" : "1px solid #90a3bf"}}>
                          <label>Locations</label>
                          <div>
                            <select>
                              <option selected disabled className  = "location-option"> Alexandria </option>
                            </select>
                          </div>
                      </div>
                      <div className = "col-4 trip" style={{"borderRight" : "1px solid #90a3bf"}}>
                          <label>Date</label>
                          <div><input type={"date"}></input></div>
                      </div>
                      <div className = "col-4 trip">
                          <div>Time</div>
                          <div><input type={"time"}></input></div>                      
                      </div>
                    </div>  
                  </div>
  )
}

export default LocationDateTime
