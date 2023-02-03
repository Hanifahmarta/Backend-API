//Call dotenv
require('dotenv').config();

//Require module
var express = require('express');
    bodyParser = require('body-parser');
    path = require('path');
    mysql = require('mysql');
    session = require('express-session');
    passport = require('passport');
    http = require('http');

// Mysql connection
var pool = require('../config/dtabase');

//The app express
var app = express();

//App Port
app.set('port', process.env.PORT || 3000);

//Using passport
app.use(passport.initialize());
app.use(passport.session());

// Check connection to database
pool.connect(function(error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected');
    }
});

//Middleware
// Express session
var session = require('express-session');
app.use(
    session({
        secret: 'tribi',
        resave: false,
        saveUninitialized: true,
    })
);


// Parsing the body
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));


app.post ('/register', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;   
    var email = req.body.email;
    var sql = "INSERT INTO users (username, password, email) VALUES ('" + username + "', '" + password + "', '" + email + "')";
    pool.query(sql, (err, result) => {          
        if (err) throw err;
        res.json({"status": 200, "error": null, "response": result, "message": "User registered"});
    });
});

//Creating the server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
});

