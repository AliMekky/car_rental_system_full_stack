const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql");

//Create Connections
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "carrentalcompany"
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



const PORT = 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

