// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// create absolutePath variable
let absolutePath = __dirname + "/views/index.html";
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use("/public", express.static("/public/style.css"));
//app.use("/public", express.static(__dirname + "/public"));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

// Function that check if a date is valid or not
const check_date = (d) => {
  if (/Invalid\sDate/.test(d)) return true;
};

// your first API endpoint...
app.get("/api/:date", (req, res) => {
  // rpd variable contain the :date input
  let rpd = req.params.date;
  // Using the rpd variable we format it to a new Date();
  let date = new Date(rpd);
  // Using the check_date function will check if date is invalid or not
  // The value of truth will be contain in a variable call tf
  let tf = check_date(date);
  //  If tf is true (meanign that date is an invalid date), it will make the varaible date to a valid date
  if (tf) {
    date = new Date(+rpd);
  }
  // now we use the knew data variable value to check again if it's valiable
  // if not then I'll response with a json object
  tf = check_date(date);
  if (tf) {
    res.json({ error: "Invalid Date" });
  }
  // if Date pass either the first or second filter, It' ll respond with a json that containt  the unix getTime() and the utc date format;
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/", function (req, res) {
  let date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

module.exports = app;
