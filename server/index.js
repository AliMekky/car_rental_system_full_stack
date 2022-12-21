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
  let stat = "SELECT PICKUP_LOCATION,PICKUP_DATE,DROPOFF_LOCATION,DROPOFF_DATE,RESERVATION_DAY,PLATE_ID FROM RESERVATION NATURAL JOIN CUSTOMER WHERE NAME=\"" + name + "\" AND EMAIL=\""+email+"\"";
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
// console.log('Reservations are: \n', data);

});

const PORT = 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

