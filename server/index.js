const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const session = require("express-session");
const bcrypt = require("bcrypt");
var auth = 0;

//Create Connections
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gocar",
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connection done");
});

// set up express-session
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 100 // 24 hours in milliseconds
    }
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
      (err, result) => {
        if (err) {
          console.error(err);
          res.send("Error signing up");
          return;
        }
        res.redirect("/");
      }
    );
  });
});

// create a route to log in a user
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const query = `SELECT * FROM customer WHERE email = ?`;
  db.query(query, [email], (err, rows) => {
    if (err) {
      console.error(err);
      res.send("Error logging in");
      return;
    }
    if (rows.length === 0) {
      res.send("Invalid email or password");
      return;
    }
    let hash = "";
    let gen = "";
    gen = JSON.parse(JSON.stringify(rows[0]))["PASSWORD"];
    console.log("True hash " + gen);
    // bcrypt.hash(password, 10, function (err, hashedPassword) {
    //   hash = hashedPassword;
    //   console.log("password "+password);
    //   console.log("Generated hash" + hash);
    // gen = JSON.parse(JSON.stringify(rows[0]))["PASSWORD"];
    // console.log("True hash " + gen);
    // });
    bcrypt.compare(password, gen, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        console.log("correct password!");
        var elem = JSON.parse(JSON.stringify(rows[0]));
        console.log("True hash " + elem["PASSWORD"]);
        console.log(elem["ISADMIN"]);
        req.session.userId = elem["CUSTOMER_ID"];
        req.session.isAdmin = elem["ISADMIN"];
        auth = req.session.isAdmin;
        console.log("auth: " + auth);
        console.log("req.session.isAdmin: " + req.session.isAdmin);

        if (req.session.isAdmin == 1) {
          // redirect to the admin page if the user is an admin
          console.log("Redirecting to admin route");
          res.redirect("/Admin");
        } else if (req.session.isAdmin == 0) {
          // redirect to the home page if the user is not an admin
          res.redirect("/");
        }
        res.send(req.session.isAdmin);
      }
    });
  });
});

// create a middleware function to protect routes from non-admin users
const checkAdmin = (req, res, next) => {
  console.log("in checkAdmin sess " + req.session.isAdmin);

  console.log("in checkAdmin " + auth);
  if (!auth) {
    res.status(401).send("Unauthorized");
    return;
  }
  next();
};

// create a route that is protected by the middleware
app.get("/Admin", checkAdmin, (req, res) => {
  res.send("Welcome, admin!");
});

app.get("/", (req, res) => {
  console.log(req.session.isAdmin);
  res.send("Welcome, user!");
});

app.get("/browseCar", (req, res) => {
  res.json({
    name: "BMW my car",
    msg: "This is my first tweet!",
    username: "codrkai",
  });
});

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
    " SELECT PICKUP_DATE as 'DATE',SUM(DATEDIFF(DROPOFF_DATE, PICKUP_DATE)* CAR.PRICE  ) as 'TOTAL PAYMENTS' FROM RESERVATION NATURAL  JOIN CAR WHERE PICKUP_DATE>'" +
    start +
    "' AND DROPOFF_DATE<'" +
    end +
    "'  GROUP BY (DATE(PICKUP_DATE))";
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
  let start = req.query.statDate 


  let stat =  " SELECT STATUS,car.MANUFACTURER, car.MODEL ,car.YEAR ,car.TYPE,PLATE_ID  FROM status_logger NATURAL JOIN CAR WHERE abs(datediff(START_DATE,'" +
  start +
  "' )) = ( select  min( abs(datediff(START_DATE,'" +
  start +
  "'  )) ) from status_logger ) UNION SELECT STATUS,car.MANUFACTURER, car.MODEL ,car.YEAR ,car.TYPE,PLATE_ID FROM status_logger NATURAL JOIN CAR where START_DATE < '" +
  start +
  "' and car.PLATE_ID not in ( SELECT PLATE_ID FROM status_logger NATURAL JOIN CAR where abs(datediff(START_DATE,'" +
  start +
  "')) = ( select  min( abs(datediff(START_DATE,'" +
  start +
  "')) ) from status_logger ) )";

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
    '(SELECT NAME, EMAIL, PHONE_NUMBER, PLATE_ID, MANUFACTURER, MODEL, YEAR, PRICE, TYPE, CAPACITY, COLOR  FROM customer natural join car WHERE NAME LIKE "%' +
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
