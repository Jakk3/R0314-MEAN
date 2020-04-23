var express = require("express");
var app = express();
var mongoose = require("mongoose");

// set view engine
app.set("view engine", "ejs");

// enable body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost/mongo_practice");

const User = mongoose.model("User", {
    username: String,
    password: String
});

app.get("/loggedin", (req, res) => {
    res.render("pages/loggedin");
});

app.get("/login", (req, res) => {
    res.render("pages/login");
});

app.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({
        username: username
    }, function (err, user) {
        if (err) throw err;

        if (password === user.password) {
            res.redirect("/loggedin");
        } else {
            res.redirect("/login");
        }
    });
});

app.get("/register", (req, res) => {
    res.render("pages/register");
});

app.post("/register", (req, res) => {
    const newuser = new User({
        "username": req.body.username,
        "password": req.body.password
    });

    newuser.save();
    res.redirect("/login")
});

app.listen(80);