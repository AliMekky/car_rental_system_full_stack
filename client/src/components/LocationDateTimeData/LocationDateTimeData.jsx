import React from 'react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import "./LocationDateTimeData.css";

function LocationDateTimeData(props) {
  return (
                <div className = "main">
                    {/* <label><RadioButtonCheckedIcon/> Country</label> */}
                    <div className = "inputTitle"><span style={{"color" : "blue"}}><RadioButtonCheckedIcon/></span> {props.title}</div>
                    <div className = "row">
                      <div className = "col-4 trip"  style={{"borderRight" : "1px solid #90a3bf"}}>
                          <label>Locations</label>
                          <div>
                            <label className = "value">{props.Location}</label>
                          </div>
                      </div>
                      <div className = "col-4 trip" style={{"borderRight" : "1px solid #90a3bf"}}>
                          <label>Date</label>
                          <div><label className = "value">{props.date}</label></div>
                      </div>
                      <div className = "col-4 trip">
                          <div>Time</div>
                          <div><label className = "value">{props.time}</label></div>                      
                      </div>
                    </div>  
                  </div>
  )
}

export default LocationDateTimeData;
