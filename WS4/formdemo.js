var express = require("express");
var fs = require("fs");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/adduser", (req, res) => {
  res.sendFile(__dirname + "/public/demosite/adduser.html");
});

app.post("/adduser", (req, res) => {
  let data = require("./public/demosite/json_data_set.json");
  data.push({
    "Name": req.body.name,
    "Company": req.body.company,
    "Email": req.body.email,
    "Date": new Date()
  });

  let jsonStr = JSON.stringify(data);

  fs.writeFile("./public/demosite/json_data_set.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("its saved");
  });
});

app.get("/jsondata", (req, res) => {
  let data = require("./public/demosite/json_data_set.json");

  let results = "<table border='1'>";
  for (let i = 0; i < data.length; i++) {
    results +=
      '<tr>' +
      '<td>' + data[i].Name + '</td>' +
      '<td>' + data[i].Email + '</td>' +
      '</tr>';
  }
  results += "</table>";
  res.send(results);
});

app.listen(8081);