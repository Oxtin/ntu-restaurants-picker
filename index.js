var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require("method-override"),
    Restaurant = require('./models/restaurant');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use("/static", express.static('./static/'));

// mongodb
var url = 'mongodb+srv://Austin:Austin123@cluster0-cdzey.mongodb.net/NTU_restaurant?retryWrites=true&w=majority' || process.env.DATABASEURL;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
	if (err) {
		console.log("Fail to connect to the DB!");
	} else {
		console.log("Connected to the DB!");
	}
});

app.get('/', (req, res) => {
    res.render('index');
});

// click the picker button and get the restaurants in the database
app.get('/pick', (req, res) => {
    Restaurant.find({}, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(401);
        } else {
            res.send(result);
        }
    });
})

// add new restaurant
app.post('/restaurants', (req, res) => {
    Restaurant.create({
            name: req.body.name,
            position: req.body.position
        }, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        });
    res.redirect('/restaurants');
});

// delete the restaurant
app.delete('/restaurants', (req, res) => {
    Restaurant.findOneAndRemove({ name: req.body.name }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.redirect('/restaurants');
    });
})

// get add form
app.get('/add', (req, res) => {
    res.render('add');
});

// get delete form
app.get('/delete', (req, res) => {
    res.render('delete');
});

// lists all restaurants
app.get('/restaurants', (req, res) => {
    Restaurant.find({}, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('show', { allRestaurants: result });
        }
    });
});

app.get('/login', (req, res) => {
    res.send('懶得用，以後再說');
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log('Connecting!');
});
