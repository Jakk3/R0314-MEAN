var express = require("express");
var app = express();
var fs = require("fs");

// set view engine
app.set("view engine", "ejs");

// enable body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

// homepage
app.get("/", (req, res) => {
    res.render("pages/index");
});

// guestbook page
app.get("/guestbook", (req, res) => {
    let data = require("./data.json");
    res.render("pages/guestbook", data);
});

// page to leave a new guestbook entry
app.get("/newmessage", (req, res) => {
    res.render("pages/newmessage");
});

app.post("/newmessage", (req, res) => {
    addToGuestbook(req);
    res.redirect("/guestbook");
});

// launch app on port 8080
app.listen(8080);

function addToGuestbook(req) {
    let data = require("./data.json");

    data["messages"].push({
        "username": req.body.name,
        "country": req.body.country,
        "date": new Date(),
        "message": req.body.message
    });

    let jsonStr = JSON.stringify(data);

    fs.writeFile("./data.json", jsonStr, (err) => {
        if (err) throw err;
    });
}