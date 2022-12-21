import {useState, useEffect} from "react";
import axios from "axios";

import "./BrowseCars.css";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/Card/Card";
import FilterOption from "../../components/FilterOption/FilterOption";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';
import { PriceChange } from "@mui/icons-material";
import InputBox from "../../components/LocationDateTime/LocationDateTime";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ReactCard from "../../components/ReactCard/ReactCard";
import LocationDateTimeData from "../../components/LocationDateTimeData/LocationDateTimeData";

function BrowseCars() {
  const [price, setPrice] = useState(0);
  const [edit, setEdit]  = useState(false);
  const [message,setMessage] = useState("");
  useEffect( () => {
    fetchItems();
}, []);

const fetchItems = async () => {
  try{
    const res = await axios.get('http://localhost:4000/browseCar');
    console.log(res.data);
    setMessage(res.data.name);
  }
  catch(err){
    console.log(err);
  }
};


// async function postInfo(e)
// {
//    e.preventDefault()
//    const res = await axios.post('http://localhost:4000/trial', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'

//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }

  return (
    <div>
      <div className="row cont">
          {/* <Navbar style = {{position : "fixed", top : "0", left : "0"}}/> */}
          <div class = "navbarB"><a href='/' class = "logo">GO CAR.</a></div>
          <div className="sidebar col-2">
              <div className = "categoryType"><DirectionsCarFilledIcon fontSize="small" style = {{"margin-right":"5px"}}/>TYPE</div>
              <FilterOption name = {"Sport"}/>
              <FilterOption name = {"SUV"}/>
              <FilterOption name = {"MPV"}/>
              <FilterOption name = {"Sedan"}/>
              <FilterOption name = {"Coupe"}/>
              <FilterOption name = {"Hatchback"}/>
              <hr/>
              <div className = "categoryType"><GroupIcon fontSize="small" style = {{"margin-right":"5px"}}/>CAPACITY</div>
              <FilterOption name = {"2 Person"}/>
              <FilterOption name = {"4 Person"}/>
              <FilterOption name = {"6 Person"}/>
              <FilterOption name = {"8 Person or more"}/>
              <hr/>
              <label for="customRange1" class="categoryType form-label"><PaidIcon fontSize="small" style = {{"margin-right":"5px"}}/>Price = {price}$/hr</label>
              <input type="range" class="form-range" id="customRange1" min="20" max = "200" step = "1" onChange={(e)=>{setPrice(e.target.value)}}></input>
              
          </div>
          <div className="browse col-10">
              {/* <div className = "row"><Navbar /></div> */}
              <div className = "row datetime">
                <div className = "col-6"><p className = "par1">It is never too late to change!</p></div>
                <div className = "col-6">
                  { edit ? (<form className = "datetime-form" type = "post">
                      <div className = "country">
                        <select className = "countrySelect">
                          <option selected disabled > Country </option>
                        </select>
                      </div>
                       <div style={{"position" : "relative"}}>
                        <InputBox title = {"Pick-up"}/>
                        <div className = "box"><SwapVertIcon/></div>
                        <InputBox title = {"Drop-off"}/>
                      </div>  
                      <div style = {{"display": "flex","margin-top" : "20px", "align-items":"center", "justifyContent" : "center"}}>
                        <button class="login btn btn-primary"  onClick={()=>{setEdit(!edit)}}>Go</button>
                      </div> 


                  </form>)  
                  :
                  (
                  <div>
                    <div>
                      <LocationDateTimeData title = {"Pick-up"} location = {"Alexandria"} date = {"12/12/2022"} time = {"12:00 pm"}/>
                      <LocationDateTimeData title = {"Drop-off"} location = {"Alexandria"} date = {"13/12/2022"} time = {"12:00 pm"}/>
                    </div>  
                    <div style = {{"display": "flex","margin-top" : "20px", "align-items":"center", "justifyContent" : "center"}}>
                      {/* <a class="login btn btn-primary" href="#" role="button">Edit</a> */}
                      <button class="login btn btn-primary"  onClick={()=>{setEdit(!edit)}}>Edit</button>
                    </div>
                  </div> )}

              </div>
              </div>
              <div className = "cardsArea row justify-content-start">
                <ReactCard img = "https://imgd.aeplcdn.com/0x0/n/cw/ec/41375/x6-exterior-right-front-three-quarter.jpeg" name = {message} price = "90"/>
                <ReactCard img = "https://quickbutik.imgix.net/13175t/products/5de8f7e3c6852.jpeg" name = "Seat-Cupra" price = "50"/>
                <ReactCard img = "https://media.istockphoto.com/id/1157655660/photo/generic-red-suv-on-a-white-background-side-view.jpg?s=612x612&w=0&k=20&c=ecrvXZhimUHnYES-kx7L5b-TDtRU5kAFPpNm0ZtAp1Y=" name = "Audi-Q2" price = "60"/>
                <ReactCard img = "https://media.istockphoto.com/id/508007108/photo/white-van-isolated-on-white.jpg?s=612x612&w=0&k=20&c=cjajRKqun40A2QLqJqqadu1L1BHaECW1BNT0P82z4Jk=" name = "Mercedes-Benz-V" price = "80"/>
                <ReactCard img = "https://media.istockphoto.com/id/508007108/photo/white-van-isolated-on-white.jpg?s=612x612&w=0&k=20&c=cjajRKqun40A2QLqJqqadu1L1BHaECW1BNT0P82z4Jk=" name = "Mercedes-Benz-V" price = "80"/>

                
                
              </div>
          </div>
      </div>
      
    </div>
  );
}

export default BrowseCars;
