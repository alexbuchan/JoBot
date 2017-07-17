/*jshint esversion: 6*/

const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('../helpers/passport');
var auth    = require('../helpers/auth');
const Job = require('../models/jobs');

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

router.get('/dashboard', auth.checkLoggedIn('You must be logged in', '/'), function(req, res, next) {
  res.render('dashboard', { user: JSON.stringify(req.user) });
});

router.get('/search', auth.checkLoggedIn('You must be logged in', '/'), function(req, res, next) {
  res.render('search', { user: JSON.stringify(req.user) });
});

router.get('/job_display', (req, res, next)=> {
  Job.find({}, (err,jobs)=>{
    if(err) {return next(err); }
    res.render('job_display', { jobs });
  });
});

router.get('/:id', (req, res, next) => {
  const jobID = req.params.id;

  Job.findById(jobID, (err, job) => {
    if (err) { return next(err); }
    res.render('userProfile', { job: job });
  });
});

module.exports = router;
