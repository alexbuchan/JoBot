/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
var auth    = require('../helpers/auth');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/userProfile', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('userProfile', { user: JSON.stringify(req.user) });
});

router.get('/admin', auth.checkLoggedIn('You must be login', '/login'), auth.checkCredentials('ADMIN'), function(req, res, next) {
	// console.log(req.user);
  res.render('admin', { user: JSON.stringify(req.user) });
});

module.exports = router;

