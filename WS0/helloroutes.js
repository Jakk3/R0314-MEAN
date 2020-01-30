var http = require("http");
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-type': 'text/html' });

    if (request.url === "/helloroutes") {
        response.write("HELLO WORLD IN html");
        response.write(request.url);
    } else if (request.url === "/") {
        response.write("Hello people");
    }
    response.end();
}).listen(8081);
console.log('SErver running at 127.0.0.1:8081');
