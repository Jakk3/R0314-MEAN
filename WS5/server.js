var express = require("express");
var app = express();

// view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("pages/index", {
        new_heading: "This was passed from the JS file",
        new_paragraph: "Lorem ipsum..",
        new_footer: "Here is a new footer"
    });
});

var data = {
    users: [{
            name: "John",
            age: 25
        },
        {
            name: "Mike",
            age: 42
        },
        {
            name: "Samantha",
            age: 51
        },
    ]
}

app.get("/users", (req, res) => {
    res.render("pages/users", data);
});

app.listen(8081);