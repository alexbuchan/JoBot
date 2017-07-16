/*jshint esversion: 6*/

const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('../helpers/passport');
var auth    = require('../helpers/auth');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'JoBot' });
});

router.post("/", passport.authenticate("local", {
  successRedirect: "/userProfile",
  failureRedirect: "/",
  failureFlash: true, //disable/enable flash messaging but need flash package
  passReqToCallback: true
}));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("USER AUTHENTICATED");
    return next();
  } else {
    console.log("USER NOT AUTHENTICATED :(");
    res.redirect('/');
  }
}

router.get('/userProfile', auth.checkLoggedIn('You must be logged in', '/'), function(req, res, next) {
  res.render('userProfile', { user: JSON.stringify(req.user) });
});

router.get('/dashboard', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('dashboard', { user: JSON.stringify(req.user) });
});

router.get('/search', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('search', { user: JSON.stringify(req.user) });
});

router.get('/admin', auth.checkLoggedIn('You must be login', '/login'), auth.checkCredentials('ADMIN'), function(req, res, next) {
	// console.log(req.user);
  res.render('admin', { user: JSON.stringify(req.user) });
});

module.exports = router;
