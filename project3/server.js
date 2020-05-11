var express = require("express");
var app = express();
var mongoose = require("mongoose");

var PORT = process.env.PORT || 80;

// set view engine
app.set("view engine", "ejs");

// route for client-side files
app.use(express.static(__dirname + "/public/"));

// parse url-encoded bodies (html forms);
app.use(express.urlencoded({
    extended: true
}));

// parse json bodies (sent by api clients)
app.use(express.json());

// connect to mongodb
var uri = "mongodb://localhost/project3";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// configure schema
const Apartment = mongoose.model(
    "Apartment", {
        type: String,
        address: String,
        area: Number,
        room_count: Number,
        rent: Number
    },
    "apartments"
);

// website routing

// homepage
app.get("/", (req, res) => {
    res.render("pages/home");
});

// add apartment page
app.get("/add", (req, res) => {
    res.render("pages/add_apartment");
});

// get-api call page
app.get("/get", (req, res) => {
    res.render("pages/get_apartment.ejs");
});

app.get("/documentation", (req, res) => {
    res.render("pages/documentation");
});


// api routing

app.get("/api/getall", (req, res) => {
    // find all apartments and return them as json
    Apartment.find({}, function (err, results) {
        res.status(200).json(results);
    });
});

// get a single apartment by address
app.get("/api/get/:address", (req, res) => {
    let address = req.params.address;
    Apartment.find({
        address: address
    }, function (err, apartments) {
        if (err) throw err;

        res.status(200).json(apartments);
    });
});

// add a document to the database
app.post("/api/add", (req, res) => {
    // get all data from the api call
    let type = req.body.type;
    let address = req.body.address;
    let area = req.body.area;
    let room_count = req.body.room_count;
    let rent = req.body.rent;

    const new_apartment = new Apartment({
        "type": type,
        "address": address,
        "area": area,
        "room_count": room_count,
        "rent": rent
    });

    new_apartment.save().then(() => res.send("New Apartment Added!"));
});

app.put("/api/update/:id", (req, res) => {
    let id = req.params.id;

    // get all data from the api call
    let update = {
        rent: req.body.rent
    };
    let options = {};

    console.log(update.rent);

    Apartment.findByIdAndUpdate(id, update, options, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).json("An error occured");
        } else {
            res.status(200).json("Apartment Updated!");
        }
    });
});

app.delete("/api/delete/:id", (req, res) => {
    let id = req.params.id;

    Apartment.findByIdAndDelete(id, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).json("Deleting failed");
        } else if (results == null) {
            res.status(200).json("Couldn't find an entry with given ID");
        } else {
            res.status(200).json("Deleted apartment!");
        }
    });
});

app.listen(PORT);