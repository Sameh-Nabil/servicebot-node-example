// in app.js
const session = require('express-session');
const express = require("express");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var flash    = require('connect-flash');
var app      = express();
var port     = process.env.PORT || 8080;
var dotenv = require('dotenv');

dotenv.load();

// configure session object
let sessionObject = {
  secret: 'THIS SHOULD BE CHANGED',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

// use secure cookies, needs HTTPS
if (app.get('env') === 'production') {
  sessionObject.cookie.secure = true; 
}

app.use(session(sessionObject));
	// set up our express application
app.use(logger('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // read cookies (needed for auth)
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('view engine', 'ejs'); // set up ejs for templating


// load all the things we need
let passport = require('passport');
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//configure JWT strategy
const strategy = new JwtStrategy(
    {
        secretOrKey : process.env.SERVICEBOT_SECRET,
        jwtFromRequest: ExtractJwt.fromBodyField("token")
    },
    function(payload, done) {
        console.log(payload);
        // payload.uid is the Servicebot User ID for the user
        // payload.instances contains information about subscriptions
        // payload.user contains information about the user's profile
        done(null, payload.user)
    }
)

passport.use("servicebot-login", strategy);

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
done(null, user);
});
  


app.use(passport.initialize());
app.use(passport.session());
  
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/render"));
app.listen(port);
