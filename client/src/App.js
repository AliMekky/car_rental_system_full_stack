//import logo from './logo.svg';
import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import Login from './pages/Login/Login.jsx';
import CarDetail from './pages/CarDetail/CarDetail.jsx';
import BrowseCars from './pages/BrowseCars/BrowseCars.jsx';
import Signup from './pages/Signup/Signup.jsx';
import Payment from './pages/Payment/Payment.jsx';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin.jsx';
;


function App() {

//   const [message,setMessage] = useState("");

//   useEffect( () => {
//     fetchItems();
// }, []);

// const fetchItems = async () => {
  
//   try{
//     const res = await axios.get('http://localhost:4000/tweets');
//     console.log(res.data);
//     setMessage(res.data.name);
//   }
//   catch(err){
//     console.log(err);
//   }

// };

  // const [items, setItems] = useState([]);

  return (
    <div className="App">
      <BrowseCars/>
      {/* <Home/> */}
      {/* <Login/> */}
      {/* <h1>{message}</h1> */}
      {/* <h1>{items.name}</h1>
      <h1>{items.username}</h1>
      <h1>{items.msg}</h1> */}
    </div>
  );
}

export default App;
