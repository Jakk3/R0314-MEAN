var fs = require("fs");

console.log("program started");

// we'll just give a name of the callback function
fs.readFile("example.txt", results);

for (let i = 0; i < 15; i++) {
    console.log("JUST KEEP SWIMMING");
}

function results(err, data) {
    if (err) return console.error(err);
    console.log("Results of fileread:");
    console.log(data.toString());
}