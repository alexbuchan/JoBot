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

// router.get('/jobshow', auth.checkLoggedIn('You must be logged in', '/'), function(req, res, next) {
//   res.render('jobshow', { user: JSON.stringify(req.user) });
// });


router.get('/jobshow/:id', auth.checkLoggedIn('You must be logged in', '/'), (req, res, next) => {
  const jobId = req.params.id;

  Job.findById(jobId, (err, job) => {
    console.log(jobId);
    if (err) { return next(err); }
    res.render('jobshow',{ job });
  });
});

module.exports = router;
