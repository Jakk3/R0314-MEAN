var http = require("http");

// var options = {
//   host: "http://www.omdbapi.com",
//   // path: "/?i=tt3896198&apikey=e433680"
//   path: "/?s=star+wars&apikey=e433680"
// }
var options = "http://www.omdbapi.com/?s=star+wars&apikey=e433680";

var data = '';
var request = http.request(options, function (res) {
  res.on('data', function (chunk) {
    data += chunk;
  });
  res.on('end', function () {
    // console.log(data);
    data = JSON.parse(data);
    // get the search results
    data = data["Search"];
    createServer(data);
  });
});
request.on('error', function (e) {
  console.log(e.message);
});

request.end();

function createServer(data) {
  var server = require("http");
  server.createServer(function (request, response) {
    response.writeHead(200, { 'Content-type': 'text/html' });
    if (request.url === "/") {
      response.write("<table>");
      response.write("<tr>");
      response.write("<th>Title</th>");
      response.write("<th>Year</th>");
      response.write("<th>Type</th>");
      response.write("<th>Poster</th>");
      response.write("</tr>");
      for (let i = 0; i < data.length; i++) {
        response.write("<tr>");
        response.write("<td>" + data[i]["Title"] + "</td>");
        response.write("<td>" + data[i]["Year"] + "</td>");
        response.write("<td>" + data[i]["Type"] + "</td>");
        response.write("<td>" + "<img style='height: 80px' src='" + data[i]["Poster"] + "'>" + "</td>");
        response.write("</tr>");
      }
      response.write("</table>");
    }
    response.end();
  }).listen(8081);
}


