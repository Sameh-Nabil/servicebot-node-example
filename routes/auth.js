// routes/index.js

var express = require('express');
var router = express.Router();
var passport = require('passport');



  
  // Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

router.post('/login', passport.authenticate('servicebot-login'), function(req, res){
    //send OK status
    res.status(200);
});
  

  

module.exports = router;
