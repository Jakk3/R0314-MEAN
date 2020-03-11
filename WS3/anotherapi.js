var http = require("http");

// var options = {
//   host: "http://www.omdbapi.com",
//   // path: "/?i=tt3896198&apikey=e433680"
//   path: "/?s=star+wars&apikey=e433680"
// }
var options = "http://xkcd.com/info.0.json";

// var data = '';
// var request = http.request(options, function (res) {
//   res.on('data', function (chunk) {
//     data += chunk;
//   });
//   res.on('end', function () {
//     // console.log(data);
//     // data = JSON.parse(data);
//     createServer(data);
//   });
// });
// request.on('error', function (e) {
//   console.log(e.message);
// });

// request.end();

var axios = require("axios");
const promise = axios.get(options).then(response => {
  const data = response.data;
  createServer(data);
});

function createServer(data) {
  var server = require("http");
  server.createServer(function (request, response) {
    response.writeHead(200, { 'Content-type': 'text/html' });
    console.log(data);
    if (request.url === "/") {
      response.write("<h1>" + data["safe_title"] + " (#" + data["num"] + ")</h1>");
      response.write("<p>Year: " + data["year"] + "</p>");
      response.write("<img src='" + data["img"] + "'><br>");
      response.write("<i>" + data["alt"] + "</i>");
    }
    response.end();
  }).listen(8081);
}


