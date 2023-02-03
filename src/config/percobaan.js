
/**
 * Module dependencies.
 */

var app = require('../app.js');
    http = require('http');
    
// berisi tentang server

// Call .env 
require('dotenv').config();

const { error } = require('console');
// Require Module
var express = require('express');
    session = require('express-session');
    bcryscript = require('bcrypt');
    bodyParser = require('body-parser');
    http = require('http');

// MySQL require
var connection = require('../config/dtabase');

//The app express
var app = express();

//Middleware = authentication, untuk mengecek apakah seseorang yang mengakses suatu web sudah log-in dan memiliki hak akses atau belum.
// Membuat Middleware menggunakan Express Session
app.use(
    session({
        secret: 'tribi',
        resave: true,
        saveUninitialized: false,
    })
);

// App port
app.set('port', process.env.PORT || 3000);

// Parsing the JSON
app.use(express.json());
app.use(bodyParser.json());

// Root path
app.get('/', function (req, res) {
    res.json({
        message: 'Welcome to Tribi API',
    });
});


// Regular registration
// app.get('/register', function (req, res) {
//     // Check if the user is logged in
//     if (req.session.user) return res.redirect('/dashboard');
//     res.render('register');
// });

app.post('/register', function (req, res) {
    // Body request
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var token = require('crypto').randomBytes(64).toString('hex')
    

    // Check if the user already exists
    connection.query(
        'SELECT * FROM user WHERE email = ?',
        [email],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.json({
                    message: 'User already exists',
                });
            } else {
            // Hash Password
                bcryscript.hash(password, 10, function (err, hash){
                //insert user
                    connection.query(
                        'INSERT INTO user (name, email, password, token) VALUES (?, ?, ?, ?)',
                        [name, email, hash, token],
                        function (err, results, fields) {
                            if (error) throw error;
                            res.send(
                                `User created successfully<br />
                                <a href="/">Go to Homepage</a><br />
                                <a href="/login">Login</a>`
                    );
                }
            );
         });
        }
      }
    ); 
});

// Creating the server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Listening to ' + app.get('port'));
});

===================================
var express = require('express');
const { rawListeners } = require('process');
    app = express();
    mysql = require('mysql');
    bodyParser = require('body-parser');
    bcrypt = require('bcrypt');
    http = require('http');
    session = require('express-session');


// App port
app.set('port', process.env.PORT || 3000);


// Parsing the body
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

var pool = require('./src/config/dtabase');

// Check connection to database
pool.connect(function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Connected');
    }
});

// Register user
// app.get ('/login', function(req, res) {

//     pool.query('SELECT * FROM account WHERE id = $1', [id], 
//     function(error, results, fields) { 
//         if (error) {
//             console.log(error);
//         } else {
//             res.send('User already exists');
//         }
//     });
// });

app.get('/', function(req, res) {
    res.json ({ status: "Sukses"})
});

app.get('/', function(req, res) {
    res.json ({ status: "Sukses"})
});


app.post ('/register', function(req, res) {
   
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

   pool.query('INSERT INTO account (username, email, password) VALUES (?, ?, ?)', [username, email, password], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json({"status": 200, "error": null, "response": result, "message": "User registered"});
        }
    });
});

// app.get ('/login', function(req, res) {
//     var email = req.body.email;
//     var password = req.body.password;
//     pool.query('SELECT * FROM account WHERE email = ?', [email],
//     function(error, results, fields) {
//         if (error) {
//             res.json({"status": 400, reason: error.code});
//         } else {
//             if (results.length > 0) {
//                 bcrypt.compare(password, results[0].password, function(err, result) {
//                     if (result == true) {
//                         res.json({"status": 200, "message": "User logged in", data: req.body});
//                     } else {
//                         res.json({"status": 400, "message": "Wrong password"});
//                     }
//                 });
//             } else {
//                 res.json({"status": 400, "message": "User not found"});
//             }   
//         }
//     });
// });


// Creating the server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Server is running on port ' + app.get('port'));
});
