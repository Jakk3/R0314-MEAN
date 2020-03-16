var express = require("express");
var fs = require("fs");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/guestbook", (req, res) => {
  let data = require("./data.json");
  let results = "<table border='1' style='width: 100%'>" +
    '<tr><th>Name</th><th>Country</th><th>Message</th></tr>';
  for (let i = 0; i < data.length; i++) {
    results +=
      '<tr>' +
      '<td>' + data[i].username + '</td>' +
      '<td>' + data[i].country + '</td>' +
      '<td>' + data[i].message + '</td>' +
      '</tr>';
  }
  results += "</table>";

  res.send(results);
});

app.get("/newmessage", (req, res) => {
  res.sendFile(__dirname + "/public/addmessage.html");
});

app.post("/newmessage", (req, res) => {
  addToGuestbook(req);
  res.redirect("/guestbook");
});

app.get("/ajaxmessage", (req, res) => {
  res.sendFile(__dirname + "/public/ajaxmessage.html");
});

app.post("/ajaxmessage", (req, res) => {
  addToGuestbook(req);
});

app.listen(8081);

function addToGuestbook(req) {
  let data = require("./data.json");

  data.push({
    "username": req.body.name,
    "country": req.body.country,
    "date": new Date(),
    "message": req.body.message
  });

  let jsonStr = JSON.stringify(data);

  fs.writeFile("./data.json", jsonStr, (err) => {
    if (err) throw err;
  });
}