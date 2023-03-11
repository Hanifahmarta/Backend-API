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

// var Minio = require ('minio')


// // credensial minio
// var minioClient = new Minio.Client({
//     endPoint: '172.20.0.84',
//     port: 9000,
//     useSSL: false,
//     accessKey: 'xjUQ3DwRN4LepbaH',
//     secretKey: 'NQTArldunpvAWZJhZOrarAdvjjpjNXKc'
// });


// Melihat list bucket bisa
// minioClient.listBuckets(function(err, buckets) {
//     if (err) return console.log(err)
//     console.log('buckets :', buckets)
//   });


// Create bucket tobe public
// minioClient.setBucketPolicy('testing', 'public-read', function(err) {
//     if (err) {
//       return console.log(err)
//     }
//     console.log('Bucket mybucket is now public')
//   })


// Get link URL public from file in bucket (done)
// Get Link URL public from file in bucket dgn waktu kedaluwarsa dari URL yang dikembalikan, dalam detik.
//   minioClient.presignedUrl('GET', 'testing', 'kitten.png', 60 * 60 * 24, function(err, url) {
// // 60*60*24 = 1 hari => Itu akan mencetak URL public dari file 'myfile.jpg' di bucket 'mybucket' yang akan kadaluwarsa dalam 24 jam.
//     if (err) {
//       return console.log(err)
//     }
//     console.log(url)
//   })


// Upload file to bucket (done)
//   minioClient.fPutObject('testing2', 'kitten.png', 'E:/Capstone Server/kitten.png', function(err, etag) {
//     if (err) {
//       return console.log(err)
//     }
//     console.log('File uploaded successfully. eTag: ' + etag)
//   })



// minioClient.fPutObject('testing2', 'american-sign-language_1.tar.gz', 'E:/Capstone Server/american-sign-language_1.tar.gz', function(err, etag) {
//     if (err) {
//       return console.log(err)
//     }
//     console.log('File uploaded successfully. eTag: ' + etag)
//   })