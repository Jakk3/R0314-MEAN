var fs = require("fs");

let text = "pls";

console.log("Program started");

// console.log(fs.readFile("example.txt", read));
text = fs.readFileSync("example.txt", read).toString() + "\n";
text += fs.readFileSync("info.txt", read).toString() + "\n";
text += "I wrote this";

fs.writeFileSync("combined.txt", text);
console.log("Program ended");

function read(err, data) {
    if (err) return console.error(err);
    let ret = data.toString();
    return ret;
}