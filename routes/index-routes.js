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
