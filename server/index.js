// let express = require('express');
// let cors = require('cors');
// let bodyParser = require('body-parser');
// let router = express.Router();

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(cors());

// app.use(express.json());
// // app.use('/students', studentRoute);

// // router.get("/message",(req,res) =>{
// //     res.json({message : "Hello Go car"});
// // });

// app.get("/message",(req,res) =>{
//     res.json({message : "Hello Go car"});
// })





// // PORT
// const port = process.env.PORT || 4000;
// const server = app.listen(port, () => {
//   console.log('Connected to port ' + port)
// })
  
// // 404 Error
// app.use((req, res, next) => {
//   res.status(404).send('Error 404!')
// });
  
// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });


//================================================================

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
// const routesHandler = require('./routes/handler.js');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
// app.use('/', routesHandler);



const mysql = require("mysql");



//Create Connections

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql"
});

//connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connection done");
});

//create DB

// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE nodemysql";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("result");
//     res.send("Database Created");
//   });
// });


app.get("/insert", (req, res) => {
  let sql = "CREATE TABLE FIRSTTABLE(ID INT)";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("result");
    res.send("Database Created");
  });
});
app.get('/browseCar', (req, res) => {
  // const str = {
  //             "name": "Codr Kai",
  //             "msg": "This is my first tweet!",
  //             "username": "codrkai"
  //         };

          
  // res.end(JSON.stringify(str));
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