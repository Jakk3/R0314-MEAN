var express = require("express");
var app = express();

app.use(express.static("public/demosite/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/demosite/index.html");
});

app.get("/list", (req, res) => {
  res.sendFile(__dirname + "/public/demosite/sample_tabular_data.txt");
});

app.get("/jsondata", (req, res) => {
  let data = require("./public/demosite/json_data_set.json");
  data.push({
    "Name": "Vili Muotka",
    "Company": "Laurea",
    "Email": "vili@laurea.fi",
    "Date": "12/3/2020 \r\n"
  });

  let results = "<table border='1'>";
  for (let i = 0; i < data.length; i++) {
    results +=
      '<tr>' +
      '<td>' + data[i].Name + '</td>' +
      '<td>' + data[i].Email + '</td>' +
      '</tr>';
  }
  res.send(results);
});

app.get("/add", (req, res) => {
  res.send("Lets try to add some data to a file!");
});

app.get("*", (req, res) => {
  res.send("Cant find the requested page", 404);
});

app.listen(8081, () => {
  console.log("Example app listening on port 8081");
});