// routes/index.js

var express = require('express');
var router = express.Router();
var passport = require('passport');

//middleware to check if user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { user: req.user });
});


  // Perform the final stage of authentication and redirect to previously requested URL or '/user'
  
  // Perform session logout and redirect to homepage
  
router.get('/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', {templateId: process.env.TEMPLATE_ID, paymentStructureTemplateId: process.env.PAYMENT_STRUCTURE_ID, servicebotUrl: process.env.SERVICEBOT_URL, message: req.flash('signupMessage')});
});

router.get('/login', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login', {servicebotUrl: process.env.SERVICEBOT_URL});
});

router.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile', {
        servicebotUrl: process.env.SERVICEBOT_URL,
        user: req.user, // get the user out of session and pass to template
    });
});      
  

module.exports = router;
