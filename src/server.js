var express = require('express');
    bodyParser = require('body-parser');
    path = require('path');
    mysql = require('mysql');
    passport = require('passport');
    http = require('http');
    Minio = require('minio');

const session = require('express-session');
const app = express();
const userroutes = require('./router/routes');
const pool = require('./config/dtabase');


// Trust Proxy
app.set('trust proxy', true);

// View engine ejs
app.set('view engine', 'ejs');

// Parsing the body
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

// Parsing the JSON
app.use(express.json());
app.use(bodyParser.json());

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

app.use(express.json());

//Middleware
//Express session
app.use(
    session({
        secret: 'tribi',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 3600000 } // 1 jam
    })
);

app.get('/test', function(req, res, next) {
    console.log(req.session)
res.send('Hello World')
})

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// User Contributor routes
app.use('/api', userroutes); //
app.use('/api/signup/contributor', userroutes); // usercontri
app.use('/api/signin/contributor', userroutes); // loginusercontri
app.use('api/get/auth',userroutes); // userauth
app.use('/api/checkuser', userroutes); //checkuser
app.use('/api/getall/contributor', userroutes); // getusercontri
app.use('/api/edit/contributor/:id', userroutes); // editusercontri
app.use('/api/signout', userroutes); // logoutuser')
app.use('/api/checkout', userroutes); // checkoutuser
app.use('/api/delete/:id', userroutes); // deleteuser
app.use('/api/upload/videos', userroutes); // uploadimage
app.use('/api/uplod/profile', userroutes); // uploadimage
app.use('/api/get/video/name', userroutes); // getVideo
app.use('/api/result', userroutes); // result')
app.use('/api/ranking/user', userroutes); // rankinguser
app.use('/api/history/user', userroutes); // historyuser
app.use('/api/delete/upload/:id', userroutes); // deleteuser
app.use('/api/get/article', userroutes); // getArticle
app.use('/api/article/:id', userroutes); // getArticleById
app.use('/api/addfav/:id', userroutes); // addArticle
app.use('/api/update/photo/:id', userroutes); // uploadimage
app.use('/api/update/video/:id', userroutes); // uploadimage

// Creating Server
http.createServer(app).listen(app.get('port'), function() {
    console.log('Listening to ' + app.get('port'));
});
