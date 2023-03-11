var express = require('express');
    bodyParser = require('body-parser');
    path = require('path');
    mysql = require('mysql');
    passport = require('passport');
    http = require('http');
    // Minio = require('minio');
    

var userroutes = require('../src/router/routes');
var pool = require('./src/config/dtabase');
// var minioClient = require('./src/config/minio');
// var multer = require('multer');
var app = express();

// App port
app.set('port', process.env.PORT || 3000);


// Check connection to database
pool.connect(function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Connected');
    }
});

// Trust Proxy
app.set('trust proxy', true);

// // Check connection to minio
// minioClient.bucketExists('testing', function(err, exists) {
//     if (err) {
//         return console.log(err)
//     }
//     if (exists) {
//         console.log('Bucket exists.')
//     } else {
//         console.log('Bucket does not exist.')
//     }
// })


app.use(express.json());

// test
app.get('/', function(req, res) {
    res.json ({ status: "Sukses"})
});

// User routes
app.use('/api', userroutes); // 
app.use('/api/signup', userroutes); // createuser
app.use('/api/signin', userroutes); // loginuser
app.use('/api/getall', userroutes); //getuser
app.use('/api/edit/:id', userroutes); // edituser
app.use('/api/user', userroutes); // getuserbyid
app.use('/api/get', userroutes); // getusercontri
app.use('/api/upload/video', userroutes); // uploadvideo


// Creating Server
http.createServer(app).listen(app.get('port'), function() {
    console.log('Listening to ' + app.get('port'));
});
