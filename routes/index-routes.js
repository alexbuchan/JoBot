/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
var auth    = require('../helpers/auth');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'JoBot' });
});



router.get('/userProfile', auth.checkLoggedIn('You must be logged in', '/'), function(req, res, next) {
  res.render('userProfile', { user: JSON.stringify(req.user) });
});

router.get('/admin', auth.checkLoggedIn('You must be logged in', '/'), auth.checkCredentials('ADMIN'), function(req, res, next) {
	// console.log(req.user);
  res.render('admin', { user: JSON.stringify(req.user) });
});

module.exports = router;
