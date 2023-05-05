let express = require('express');
let app = express();
let bodyParser = require("body-parser");
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}));

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next();
})

const absolutePath = __dirname + "/views/index.html";

app.get("/", (req, res) => {
  res.sendFile(absolutePath);
})

app.get("/json", (req, res) => {
  let greeting = "Hello json";
  if(process.env.MESSAGE_STYLE === "uppercase"){
    greeting = greeting.toUpperCase();
  }
  res.json({message: greeting})
})

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time})
})

// ./freecodecamp/echo

app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({echo: word})
})

app.route("/name").get((req, res) => {
  res.json({name: req.query.first + " " + req.query.last})
}).post((req, res) => {
  res.json({name: req.body.first + " " + req.body.last})
})

module.exports = app;




































 module.exports = app;
