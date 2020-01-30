var http = require("http");
http.createServer(function (request, response) {
	response.writeHead(200, { 'Content-type': 'text/html' });
	response.write("<h1>I am</h1>");
	response.write("<p>Therefore, I think</p>");
	response.write("No wait, thats not how it goes..\n");

	response.write(
		"<table style='width: 100%; text-align: center;'>" +
		"<tr><th>Name</th><th>Address</th></tr>" +
		"<tr><td>Vlad</td><td><a href='https://en.wikipedia.org/wiki/Russia'>Russia</a></td></tr>" +
		"</table>"
	);

	response.end('Hello World\n');
}).listen(8081);

console.log('SErver running at 127.0.0.1:8081');
