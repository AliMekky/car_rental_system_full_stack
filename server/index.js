const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql");

//Create Connections
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gocar"
});

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

// Connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connection done");
});


app.get('/browseCar', (req, res) => {
  res.json({
    "name": "BMW my car",
    "msg": "This is my first tweet!",
    "username": "codrkai"
})
});

app.get("/customerReservations", (req, res) => {
  let name = req.query.name;
  let email = req.query.email;
  let stat = "SELECT PICKUP_LOCATION,PICKUP_DATE,DROPOFF_LOCATION,DROPOFF_DATE,RESERVATION_DAY,PLATE_ID,MANUFACTURER,MODEL FROM RESERVATION NATURAL JOIN CUSTOMER NATURAL JOIN CAR WHERE NAME=\"" + name + "\" AND EMAIL=\""+email+"\"";
  console.log(stat);
  db.query(stat, (err, rows) => {
    if (!err) {
        var result = JSON.parse(JSON.stringify(rows));
    } else {
        console.log(err)
    }
    console.log('Reservations are: \n', result);
    res.send(result);
})
});

app.get("/carReservations", (req, res) => {
  let plate_id = req.query.plate_id;
  let man = req.query.man;
  let model = req.query.model;
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;
  let startTime = req.query.startTime;
  let endTime = req.query.endTime;
  let start = startDate + " "+startTime;
  let end = endDate + " "+endTime;

  // let stat = "SELECT PICKUP_LOCATION,PICKUP_DATE,DROPOFF_LOCATION,DROPOFF_DATE,RESERVATION_DAY FROM RESERVATION NATURAL JOIN CAR WHERE PLATE_ID=\"" + plate_id + "\"" + "AND MANUFACTURER=\"" + man + "\"" + "AND MODEL=\"" +model + "\"";
  let stat = " SELECT RESERVATION_DAY, PICKUP_DATE, PICKUP_LOCATION, DROPOFF_DATE, DROPOFF_LOCATION PLATE_ID, MANUFACTURER, MODEL, YEAR, TYPE, CAPACITY FROM RESERVATION NATURAL JOIN CAR WHERE PICKUP_DATE>'"+ start +"' AND DROPOFF_DATE<'"+end+"' AND PLATE_ID=\"" + plate_id + "\"" + "AND MANUFACTURER=\"" + man + "\"" + "AND MODEL=\"" +model + "\"";

  console.log(stat);
  db.query(stat, (err, rows) => {
    if (!err) {
        var result = JSON.parse(JSON.stringify(rows));
    } else {
        console.log(err)
    }
    console.log('Reservations are: \n', result);
    res.send(result);
})
});

app.get("/reservations", (req, res) => {
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;
  let startTime = req.query.startTime;
  let endTime = req.query.endTime;
  let start = startDate + " "+startTime;
  let end = endDate + " "+endTime;
  // let stat = " SELECT STR_TO_DATE(\""+start+"\", '%Y-%m-%d %T') AS startT\; SELECT STR_TO_DATE(\""+end+"\", '%Y-%m-%d %T') AS endT\; SELECT * FROM RESERVATION WHERE PICKUP_DATE< startT AND DROPOFF_DATE>endT\;"


  let stat = " SELECT RESERVATION_DAY, PICKUP_DATE, PICKUP_LOCATION, DROPOFF_DATE, DROPOFF_LOCATION PLATE_ID, MANUFACTURER, MODEL, YEAR, TYPE, CAPACITY, NAME, EMAIL, PHONE_NUMBER FROM RESERVATION NATURAL JOIN CAR NATURAL JOIN CUSTOMER WHERE PICKUP_DATE>'"+ start +"' AND DROPOFF_DATE<'"+end+"'";
  console.log(stat);
  db.query(stat, (err, rows) => {
    if (!err) {
        var result = JSON.parse(JSON.stringify(rows));
    } else {
        console.log(err)
    }
    console.log('Reservations are: \n', result);
    res.send(result);
})
});

app.post("/login",(req,res)=>{

});

const PORT = 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

