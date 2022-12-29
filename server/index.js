const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
var session = require("express-session");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
// const redis = require('redis');
// const redisClient = redis.createClient();
// const redisStore = require('connect-redis')(session);

var auth = 0;
var sessionv;
global.data = {
  city: "",
  country: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  startLocation: "",
  endLocation: "",
  startCity: "",
  endCity: "",
  cities: [],
};
//install redis-server urgently!!
// https://github.com/microsoftarchive/redis/blob/win-3.0.504/Redis%20on%20Windows%20Release%20Notes.md
//Create Connections
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gocar",
});

const app = express();
// redisClient.on('error', (err) => {
//   console.log('Redis error: ', err);
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connection done");
});

// configure the `express-session` middleware
//     store: new redisStore({ host: 'localhost', port: 6379, client: redisClient}),

app.use(
  session({
    secret: "mySecret",
    resave: false, // don't save the session if it hasn't been modified
    saveUninitialized: false, // don't create a session if one doesn't already exist
    cookie: {
      secure: false, // if true: only transmit cookie over https
      httpOnly: true, // if true: prevents client side JS from reading the cookie
      maxAge: 1000 * 60 * 30, // session max age in milliseconds
      sameSite: "lax", // make sure sameSite is not non
    },
  })
);
// create a route to sign up a new user
app.post("/signup", (req, res) => {
  const { name, email, password, phone_number, isAdmin } = req.body;
  // let hashedPassword = password;
  bcrypt.hash(password, 10, function (err, hashedPassword) {
    let str =
      '"' +
      name +
      '",' +
      '"' +
      email +
      '",' +
      '"' +
      hashedPassword +
      '",' +
      phone_number +
      "," +
      isAdmin;
    console.log(str);
    const query =
      `INSERT INTO customer (name, email, password, phone_number, isadmin) VALUES (` +
      str +
      ")";
    db.query(
      query,
      [name, email, hashedPassword, phone_number, isAdmin],
      (err, rows) => {
        if (err) {
            console.error("error in insert");
            res.json({ title: "error", name: "" });
            return;
        }
        req.session.isAdmin = 0;
        req.session.name = name;
        req.session.isLogged = 1;
        req.session.email = email;
        sessionv = req.session;
        res.redirect("/");
      }
    );
  });
});

app.get("/", (req, res) => {
  // console.log("After using redis store: "+req.session.isAdmin);
  // req.session.wtf="wow";
  // console.log("Debugging 101: req.session.wtf is " + req.session.wtf);
  if (sessionv) {
    res.json({
      title: "Welcome, user!",
      name: sessionv.name,
      isLogged: sessionv.isLogged,
      city: global.data.city,
      country: global.data.country,
      startDate: global.data.startDate,
      endDate: global.data.endDate,
      startTime: global.data.startTime,
      endTime: global.data.endTime,
      startLocation: global.data.startLocation,
      startCity: global.data.startCity,
      endLocation: global.data.endLocation,
      endCity: global.data.endCity,
      cities: global.data.cities,
      email: sessionv.email,
    });
  } else
    res.json({
      title: "Welcome, guest!",
      name: "Guest",
      isLogged: false,
      city: global.data.city,
    });
});

app.post("/updateData", (req, res) => {
  const {
    startDate,
    startTime,
    startLocation,
    cities,
    endDate,
    endTime,
    endLocation,
  } = req.body;
  global.data.startDate = startDate;
  global.data.startTime = startTime;
  global.data.endDate = endDate;
  global.data.endTime = endTime;

  global.data.startLocation = startLocation;
  global.data.endLocation = endLocation;
  global.data.startCity = cities[startLocation].CITY;
  global.data.endCity = cities[endLocation].CITY;
  global.data.cities = cities;
  res.send("done");
});

// create a route to log in a user
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  const query = `SELECT * FROM customer WHERE email = ?`;
  db.query(query, [email], (err, rows) => {
    if (err) {
      console.error(err);
      res.send("error");
      return;
    }
    if (rows.length === 0) {
      res.send("error");
      return;
    }
    let gen = JSON.parse(JSON.stringify(rows[0]))["PASSWORD"];
    bcrypt.compare(password, gen, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        req.session.isAdmin = JSON.parse(JSON.stringify(rows[0]))["ISADMIN"];
        // console.log("Original req.session: "+req.session.isAdmin);
        req.session.name = JSON.parse(JSON.stringify(rows[0]))["NAME"];
        req.session.email = JSON.parse(JSON.stringify(rows[0]))["EMAIL"];
        req.session.isLogged = 1;
        // req.session.city = "";
        // req.session.country = "";
        // req.session.startDate = "";
        // req.session.endDate = "";
        // req.session.startTime = "";
        // req.session.endTime = "";
        sessionv = req.session;
        console.log("this is the previous city: " + sessionv.city);
        // var elem = JSON.parse(JSON.stringify(rows[0]));
        // req.session.isAdmin = elem["ISADMIN"];
        // auth = req.session.isAdmin;
        // req.session.user = JSON.stringify(rows[0]);
        // console.log(req.session.user);
        if (req.session.isAdmin == 1) {
          // redirect to the admin page if the user is an admin
          console.log("Redirecting to admin route");
          res.redirect("/Admin");
        } else if (req.session.isAdmin == 0) {
          // redirect to the home page if the user is not an admin
          res.redirect("/");
        }
        res.send(req.session.isAdmin);
      } else {
        res.json({ title: "error", name: "" });
      }
    });
  });
});

// create a middleware function to protect routes from non-admin users
const checkAdmin = (req, res, next) => {
  if(sessionv){
    if (!sessionv.isAdmin) {
      res.status(401).send("Unauthorized");
      return;
    }
    next();
  }
  
};

// create a route that is protected by the middleware
app.get("/Admin", checkAdmin, (req, res) => {
  res.json({
    title: "Welcome, admin!",
    name: sessionv.name,
    isLogged: sessionv.isLogged,
  });
});

app.get("/logout", (req, res) => {
  sessionv = 0;
  res.redirect("/");
});

// app.get("/browseCar", (req, res) => {
//   res.json({
//     name: "BMW my car",
//     msg: "This is my first tweet!",
//     username: "codrkai",
//   });
// });

app.get("/getCars", (req, res) => {
  // let city = req.query.city;
  // let country = req.query.country;
  // let startDate = req.query.startDate;
  // let endDate = req.query.endDate;
  // let startTime = req.query.startTime;
  // let endTime = req.query.endTime;
  // global.data.city = city;
  // global.data.country = country;
  // global.data.startDate = startDate;
  // global.data.endDate = endDate;
  // global.data.startTime = startTime;
  // global.data.endTime = endTime;
  //country = global.data.country;
  console.log(global.data.startCity);
  city = global.data.startCity;
  
  startDate = global.data.startDate;
  endDate = global.data.endDate;
  startTime = global.data.startTime;
  endTime = global.data.endTime;

  // console.log("get city in browse");
  // console.log(global.data.city);

  if (city && startDate && endDate && startTime && endTime) {
    let start = startDate + " " + startTime;
    let end = endDate + " " + endTime;
    db.query(
      "SELECT PLATE_ID, MANUFACTURER, MODEL, YEAR, PRICE, TYPE, CAPACITY, COLOR, IMAGE, CITY FROM CAR NATURAL JOIN office WHERE CITY = ? AND PLATE_ID IN ((SELECT PLATE_ID FROM CAR) EXCEPT (SELECT PLATE_ID FROM reservation WHERE PICKUP_DATE <= ? AND DROPOFF_DATE >= ?)) AND CURRENT_STATUS = \"ACTIVE\"",
      [city, end, start],
      (err, rows) => {
        if (!err) {
          var result = JSON.parse(JSON.stringify(rows));
          // console.log(result);
        } else {
          console.log(err);
        }
        res.send(result);
      }
    );
  }
});

// SELECT PLATE_ID, MANUFACTURER, MODEL, `YEAR`, PRICE, TYPE, CAPACITY, COLOR, IMAGE, CITY FROM CAR NATURAL JOIN office WHERE ((TYPE IN('Sedan','SUV','MPV','SportS','Coupe','Hatchback')) AND (CAPACITY IN(6,4,2)) AND(PRICE<=200)) AND PLATE_ID IN (SELECT PLATE_ID FROM CAR NATURAL JOIN office WHERE CITY = 'Paris' AND PLATE_ID IN ((SELECT PLATE_ID FROM CAR) EXCEPT (SELECT PLATE_ID FROM reservation WHERE PICKUP_DATE <= '2022-12-10 00:00:00' AND DROPOFF_DATE >= '2022-12-1 00:00:00')));

// filter cars
app.get("/filterCars",(req,res)=>{
  const {type : type, capacity : capacity, price: price} = req.query;
  // console.log(type);
  // console.log(capacity);
  // console.log(price);
  var typekeys = Object.keys(type);
  var capacitykeys = Object.keys(capacity);

  let city = global.data.startCity;
  let startDate = global.data.startDate;
  let endDate = global.data.endDate;
  let startTime = global.data.startTime;
  let endTime = global.data.endTime;

  let start = startDate + " " + startTime;
  let end = endDate + " " + endTime;


  var filteredType = [] ;
  typekeys.map(k=>{type[k] == "true" && filteredType.push(k)});

  var filteredCapacity = [] ;
  capacitykeys.map(k=>{capacity[k] == "true" && filteredCapacity.push(parseInt(k.charAt(0)))});





  if(filteredType.length == 0){
    filteredType = ['Sedan','SUV','MPV','Sport','Coupe','Hatchback'];
  }

  if(filteredCapacity.length == 0){
    filteredCapacity = [2,4,6,8];
  }

  console.log(filteredType);
  console.log(filteredCapacity);
  console.log(price);

  db.query("SELECT PLATE_ID, MANUFACTURER, MODEL, `YEAR`, PRICE, TYPE, CAPACITY, COLOR, IMAGE, CITY FROM CAR NATURAL JOIN office WHERE ((TYPE IN(?)) AND (CAPACITY IN(?)) AND(PRICE<=?)) AND PLATE_ID IN (SELECT PLATE_ID FROM CAR NATURAL JOIN office WHERE CITY = ? AND CURRENT_STATUS = 'ACTIVE' AND PLATE_ID IN ((SELECT PLATE_ID FROM CAR) EXCEPT (SELECT PLATE_ID FROM reservation WHERE PICKUP_DATE <= ? AND DROPOFF_DATE >= ?)))"
  ,[filteredType,filteredCapacity,parseFloat(price),city,end,start],(err,rows)=>{
    if(!err){
      var result = JSON.parse(JSON.stringify(rows));
       console.log(result);
    }
    else{
      console.log(err);
    }
    res.send(result);
  })

});

app.get("/getData", (req, res) => {
  result = {
    startDate: global.data.startDate,
    startTime: global.data.startTime,
    startLocation: global.data.startLocation,
    endDate: global.data.endDate,
    endTime: global.data.endTime,
    endLocation: global.data.endLocation,
    cities: global.data.cities,
  }
  res.send(result);
});



app.post("/updateandgetCars", (req, res) => {
  const {
    startDate,
    startTime,
    startLocation,
    cities,
    endDate,
    endTime,
    endLocation,
  } = req.body;
  global.data.startDate = startDate;
  global.data.startTime = startTime;
  global.data.endDate = endDate;
  global.data.endTime = endTime;
  global.data.startLocation = startLocation;
  global.data.endLocation = endLocation;
  global.data.startCity = cities[startLocation].CITY;
  global.data.endCity = cities[endLocation].CITY;
  global.data.cities = cities;
  res.redirect("/getCars");
});

app.post("/updateStatus", (req, res) => { 
  const {plateId : plate_Id,status : status} = req.body;
  console.log(req.body);

  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  let dateTime = cDate + ' ' + cTime;

  let str =
  '"' +
  plate_Id +
  '",' +
  '"' +
  status +
  '",' +
  '"' +
  dateTime +
  '"';


  console.log("update status server");


  db.query('UPDATE CAR SET CURRENT_STATUS = ? WHERE PLATE_ID = ?',[status,plate_Id]);
  const query=   `INSERT INTO status_logger (PLATE_ID,STATUS,START_DATE) VALUES (` +
  str +
  ")";


  

  db.query(query, function(err, result) {
    if (err){
      console.log(err);
      res.send("ERROR !!");
    } 
    else{
      console.log('record inserted');
      var response=plate_Id+" Status Updated SuccessFully";
      res.send(response);
    } 
  })

});

app.post("/addCar", (req, res) => { 

  if(sessionv){
    if(sessionv.isAdmin){
      const {plateId : plate_Id,carManufacturer : manufacturer,carModel : model,carYear : year,carPrice : price,carType : type,carCapacity : capacity,carColor : color,officeID : office_Id,carImage : image} = req.body;
      console.log(req.body);
    
      
      let str =
      '"' +
      plate_Id +
      '",' +
      '"' +
      manufacturer +
      '",' +
      '"' +
      model +
      '",' +
      '"' +
      year +
      '",' +
      '"' +
      price +
      '",' +
      '"' +
      type +
      '",' +
      '"' +
      capacity +
      '",' +
      '"' +
      color +
      '",' +
      '"' +
      office_Id +
      '",' +
      '"' +
      image +
      '"';
    
    
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    
    
      let str2 =
      '"' +
      plate_Id +
      '",' +
      '"' +
      "ACTIVE" +
      '",' +
      '"' +
      dateTime +
      '"';
    
     
    
    
      console.log(str);
    
      const query =
      `INSERT INTO car (PLATE_ID, MANUFACTURER , MODEL , YEAR ,  PRICE , TYPE , CAPACITY , COLOR , OFFICE_ID , IMAGE ) VALUES (` +
      str +
      ")";
    
      const query2=   `INSERT INTO status_logger (PLATE_ID,STATUS,START_DATE) VALUES (` +
      str2 +
      ")";
      
     
    
      var response=manufacturer+"-"+model+" Added SuccessFully";
    
      db.query(query, function(err, result) {
        if (err){
          console.log(err);
          res.json({ title: "error"});
          res.send("ERROR !!");

        } 
        else{
          console.log('record inserted');
          db.query(query2, function(err, result) {
            if (err){
              // console.log(err);
              res.send("ERROR !!");
            } 
            else{
              console.log('status_logger inserted');
        
            }
          })
          res.send(response);
        } 
      })
    }
  }
});

app.get("/getCountries", (req, res) => {
  let stat = "SELECT DISTINCT COUNTRY FROM OFFICE"
  db.query(stat, (err, rows) => {
    if (!err) {
      var result = JSON.parse(JSON.stringify(rows));
    } else {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/getCities", (req, res) => {
  country = req.query.country;
  if (country) {
    db.query(
      "SELECT CITY FROM OFFICE WHERE COUNTRY = ?",
      [country.COUNTRY],
      (err, rows) => {
        if (!err) {
          var result = JSON.parse(JSON.stringify(rows));
        } else {
          console.log(err);
        }
        res.send(result);
      }
    );
  }
});

//////////Admin routes//////////////////
app.get("/customerReservations", (req, res) => {
  let name = req.query.name;
  let email = req.query.email;
  let stat =
    'SELECT PICKUP_LOCATION,PICKUP_DATE,DROPOFF_LOCATION,DROPOFF_DATE,RESERVATION_DAY,PLATE_ID,MANUFACTURER,MODEL FROM RESERVATION NATURAL JOIN CUSTOMER NATURAL JOIN CAR WHERE NAME="' +
    name +
    '" AND EMAIL="' +
    email +
    '"';
  console.log(stat);
  db.query(stat, (err, rows) => {
    if (!err) {
      var result = JSON.parse(JSON.stringify(rows));
    } else {
      console.log(err);
    }
    console.log("Reservations are: \n", result);
    res.send(result);
  });
});

app.get("/carReservations", (req, res) => {
  let plate_id = req.query.plate_id;
  let man = req.query.man;
  let model = req.query.model;
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;
  let startTime = req.query.startTime;
  let endTime = req.query.endTime;
  let start = startDate + " " + startTime;
  let end = endDate + " " + endTime;

  // let stat = "SELECT PICKUP_LOCATION,PICKUP_DATE,DROPOFF_LOCATION,DROPOFF_DATE,RESERVATION_DAY FROM RESERVATION NATURAL JOIN CAR WHERE PLATE_ID=\"" + plate_id + "\"" + "AND MANUFACTURER=\"" + man + "\"" + "AND MODEL=\"" +model + "\"";
  let stat =
    " SELECT RESERVATION_DAY, PICKUP_DATE, PICKUP_LOCATION, DROPOFF_DATE, DROPOFF_LOCATION PLATE_ID, MANUFACTURER, MODEL, YEAR, TYPE, CAPACITY FROM RESERVATION NATURAL JOIN CAR WHERE PICKUP_DATE>'" +
    start +
    "' AND DROPOFF_DATE<'" +
    end +
    "' AND PLATE_ID=\"" +
    plate_id +
    '"' +
    'AND MANUFACTURER="' +
    man +
    '"' +
    'AND MODEL="' +
    model +
    '"';

  console.log(stat);
  db.query(stat, (err, rows) => {
    if (!err) {
      var result = JSON.parse(JSON.stringify(rows));
    } else {
      console.log(err);
    }
    console.log("Reservations are: \n", result);
    res.send(result);
  });
});
app.get("/dailyPayments", (req, res) => {
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;
  let startTime = req.query.startTime;
  let endTime = req.query.endTime;
  let start = startDate + " " + startTime;
  let end = endDate + " " + endTime;

  let stat =
    " SELECT PAYMENT_DAY as 'DATE',SUM(DATEDIFF(DROPOFF_DATE, PICKUP_DATE)* CAR.PRICE  ) as 'TOTAL PAYMENTS' FROM RESERVATION NATURAL  JOIN CAR WHERE PAYMENT_DAY>'" +
    start +
    "' AND DROPOFF_DATE<'" +
    end +
    "'  GROUP BY (DATE(PAYMENT_DAY))";
  console.log(stat);
  db.query(stat, (err, rows) => {
    if (!err) {
      var result = JSON.parse(JSON.stringify(rows));
    } else {
      console.log(err);
    }
    console.log("Reservations are: \n", result);
    res.send(result);
  });
});

app.get("/reservations", (req, res) => {
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;
  let startTime = req.query.startTime;
  let endTime = req.query.endTime;
  let start = startDate + " " + startTime;
  let end = endDate + " " + endTime;
  // let stat = " SELECT STR_TO_DATE(\""+start+"\", '%Y-%m-%d %T') AS startT\; SELECT STR_TO_DATE(\""+end+"\", '%Y-%m-%d %T') AS endT\; SELECT * FROM RESERVATION WHERE PICKUP_DATE< startT AND DROPOFF_DATE>endT\;"

  let stat =
    " SELECT RESERVATION_DAY, PICKUP_DATE, PICKUP_LOCATION, DROPOFF_DATE, DROPOFF_LOCATION PLATE_ID, MANUFACTURER, MODEL, YEAR, TYPE, CAPACITY, NAME, EMAIL, PHONE_NUMBER FROM RESERVATION NATURAL JOIN CAR NATURAL JOIN CUSTOMER WHERE PICKUP_DATE>'" +
    start +
    "' AND DROPOFF_DATE<'" +
    end +
    "'";
  console.log(stat);
  db.query(stat, (err, rows) => {
    if (!err) {
      var result = JSON.parse(JSON.stringify(rows));
    } else {
      console.log(err);
    }
    console.log("Reservations are: \n", result);
    res.send(result);
  });
});
app.get("/CarStatus", (req, res) => {
  let start = req.query.statDate;

  let stat =
    "with temp as (SELECT STATUS,PLATE_ID, Row_number() OVER (PARTITION BY PLATE_ID order by abs(datediff(START_DATE,?)) ASC) as row FROM status_logger) SELECT PLATE_ID,STATUS,car.MANUFACTURER,car.MODEL,car.YEAR,car.TYPE from temp  NATURAL JOIN car WHERE row = 1";

  console.log(stat);
  db.query(stat, [start], (err, rows) => {
    if (!err) {
      var result = JSON.parse(JSON.stringify(rows));
    } else {
      console.log(err);
    }
    console.log("Reservations are: \n", result);
    res.send(result);
  });
});

app.get("/search", (req, res) => {
  let key = req.query.key;
  let selectedValues = req.query.selectedValues;
  console.log(selectedValues);
  let stat1 =
    '(SELECT NAME, EMAIL, PHONE_NUMBER FROM customer WHERE NAME LIKE "%' +
    key +
    '%" OR EMAIL LIKE "%' +
    key +
    '%" OR PHONE_NUMBER LIKE "%' +
    key +
    '%")';
  let stat2 =
    '(SELECT PLATE_ID, MANUFACTURER, MODEL, YEAR, PRICE, TYPE, CAPACITY, COLOR FROM CAR WHERE PLATE_ID LIKE "%' +
    key +
    '%" OR MANUFACTURER LIKE "%' +
    key +
    '%" OR MODEL LIKE "%' +
    key +
    '%"' +
    'OR YEAR LIKE "%' +
    key +
    '%" OR PRICE LIKE "%' +
    key +
    '%"' +
    'OR CAPACITY LIKE "%' +
    key +
    '%" OR TYPE LIKE "%' +
    key +
    '%");';
  let stat3 =
    '(SELECT RESERVATION_DAY, PICKUP_LOCATION,PICKUP_DATE, DROPOFF_LOCATION, DROPOFF_DATE, PLATE_ID, NAME, PHONE_NUMBER, EMAIL FROM RESERVATION NATURAL JOIN CUSTOMER WHERE RESERVATION_DAY LIKE "%' +
    key +
    '%");';
  let stat4 =
    '(SELECT NAME, EMAIL, PHONE_NUMBER, PLATE_ID, MANUFACTURER, MODEL, YEAR, PRICE, TYPE, CAPACITY, COLOR  FROM customer natural join reservation natural join car WHERE NAME LIKE "%' +
    key +
    '%" OR EMAIL LIKE "%' +
    key +
    '%" OR PHONE_NUMBER LIKE "%' +
    key +
    '%" OR PLATE_ID LIKE "%' +
    key +
    '%" OR MANUFACTURER LIKE "%' +
    key +
    '%" OR MODEL LIKE "%' +
    key +
    '%"' +
    'OR YEAR LIKE "%' +
    key +
    '%" OR PRICE LIKE "%' +
    key +
    '%"' +
    'OR CAPACITY LIKE "%' +
    key +
    '%" OR TYPE LIKE "%' +
    key +
    '%");';
  let stat5 =
    '(SELECT PLATE_ID, MANUFACTURER, MODEL, YEAR, PRICE, TYPE, CAPACITY, COLOR, RESERVATION_DAY, PICKUP_LOCATION,PICKUP_DATE, DROPOFF_LOCATION, DROPOFF_DATE, PLATE_ID FROM CAR NATURAL  JOIN RESERVATION WHERE PLATE_ID LIKE "%' +
    key +
    '%" OR MANUFACTURER LIKE "%' +
    key +
    '%" OR MODEL LIKE "%' +
    key +
    '%"' +
    'OR YEAR LIKE "%' +
    key +
    '%" OR PRICE LIKE "%' +
    key +
    '%"' +
    'OR CAPACITY LIKE "%' +
    key +
    '%" OR TYPE LIKE "%' +
    key +
    '%" OR RESERVATION_DAY LIKE "%' +
    key +
    '%");';
  let stat6 =
    '(SELECT NAME, EMAIL, PHONE_NUMBER, RESERVATION_DAY, PICKUP_LOCATION,PICKUP_DATE, DROPOFF_LOCATION, DROPOFF_DATE, PLATE_ID FROM CUSTOMER NATURAL  JOIN RESERVATION WHERE PLATE_ID LIKE "%' +
    key +
    '%" OR NAME LIKE "%' +
    key +
    '%" OR EMAIL LIKE "%' +
    key +
    '%"' +
    'OR PHONE_NUMBER LIKE "%' +
    key +
    '%" OR RESERVATION_DAY LIKE "%' +
    key +
    '%");';
  let stat7 =
    '(SELECT RESERVATION_DAY, PICKUP_LOCATION,PICKUP_DATE, DROPOFF_LOCATION, DROPOFF_DATE, NAME, EMAIL, PHONE_NUMBER, PLATE_ID, MANUFACTURER, MODEL, YEAR, PRICE, TYPE, CAPACITY, COLOR  FROM customer natural  join car natural  join reservation WHERE NAME LIKE "%' +
    key +
    '%" OR EMAIL LIKE "%' +
    key +
    '%" OR PHONE_NUMBER LIKE "%' +
    key +
    '%" OR PLATE_ID LIKE "%' +
    key +
    '%" OR MANUFACTURER LIKE "%' +
    key +
    '%" OR MODEL LIKE "%' +
    key +
    '%"' +
    'OR YEAR LIKE "%' +
    key +
    '%" OR PRICE LIKE "%' +
    key +
    '%"' +
    'OR CAPACITY LIKE "%' +
    key +
    '%" OR TYPE LIKE "%' +
    key +
    '%" OR RESERVATION_DAY LIKE "%' +
    key +
    '%");';
  let final = [];
  if (selectedValues.length == 1) {
    if (selectedValues[0] == "car") {
      final = stat2;
    }
    if (selectedValues[0] == "customer") {
      final = stat1;
    }
    if (selectedValues[0] == "day") {
      final = stat3;
    }
  }
  if (selectedValues.length == 2) {
    if (selectedValues[1] == "car" && selectedValues[0] == "customer") {
      final = stat4;
    }
    if (selectedValues[0] == "car" && selectedValues[1] == "customer") {
      final = stat4;
    }
    if (selectedValues[1] == "car" && selectedValues[0] == "day") {
      final = stat5;
    }
    if (selectedValues[0] == "car" && selectedValues[1] == "day") {
      final = stat5;
    }
    if (selectedValues[1] == "customer" && selectedValues[0] == "day") {
      final = stat6;
    }
    if (selectedValues[0] == "customer" && selectedValues[1] == "day") {
      final = stat6;
    }
  }
  if (selectedValues.length == 3) {
    final = stat7;
  }

  db.query(final, (err, rows) => {
    if (!err) {
      var result = JSON.parse(JSON.stringify(rows));
    } else {
      console.log(err);
    }
    res.send(result);
  });
});

const PORT = 4000; // backend routing port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get("/payment", (req, res) => {
  // console.log("After using redis store: "+req.session.isAdmin);
  // req.session.wtf="wow";
  // console.log("Debugging 101: req.session.wtf is " + req.session.wtf);
  if (sessionv) {
    console.log(sessionv.email);
    res.json({
      email: sessionv.email,
    });
  }
});

app.post("/reserve", (req, res) => {
  const {
    email,
    plate_id,
    pickup_date,
    dropoff_date,
    pickup_loc,
    dropoff_loc,
    date,
    payMethod,
  } = req.body;

  const getID = `SELECT CUSTOMER_ID FROM CUSTOMER WHERE EMAIL=?`;
  db.query(getID, [email], (err, ID) => {
    if (err) {
      console.error(err);
      return;
    } else {
      let custId = JSON.parse(JSON.stringify(ID[0]))["CUSTOMER_ID"];
      console.log(custId);
      console.log(JSON.parse(JSON.stringify(ID[0]))["CUSTOMER_ID"]);
      let payDate = " ";
      if (payMethod == 1) {
        // pay METHOD is 1 means he'll pay now, payment date = reservation day
        payDate = date;
      } else {
        // pay method is 0 means he'll pay on drop off date
        payDate = pickup_date;
      }
      const query = `INSERT INTO RESERVATION VALUES(?,?,?,?,?,?,?,?) `;
      db.query(
        query,
        [
          plate_id,
          custId,
          pickup_loc,
          pickup_date,
          dropoff_loc,
          dropoff_date,
          date,
          payDate,
        ],
        (err, rows) => {
          if (err) {
            console.error(err);
            res.send("error");
            return;
          } else {
            console.log("DATA\n");
            console.log(
              plate_id +
                " " +
                custId +
                " " +
                pickup_loc +
                " " +
                pickup_date +
                " " +
                dropoff_loc +
                " " +
                dropoff_date +
                " " +
                date +
                " " +
                payDate
            );
            res.send("DONE");
          }
        }
      );
    }
  });
});
