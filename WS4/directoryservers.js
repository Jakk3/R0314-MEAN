var express = require("express");
var app = express();

app.use(express.static("public/demosite/"));

app.listen(8081);
console.log("8081 is the stuff");