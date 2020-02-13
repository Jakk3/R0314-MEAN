// require filesystem
var fs = require("fs");

console.log("program started");
var data = fs.readFileSync("example.txt");
console.log(data.toString());

for (let i = 0; i < 15; i++)
    console.log("JUST KEEP SWIMMING");

console.log("Program ended");