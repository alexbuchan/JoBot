/*jshint esversion: 6*/

const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('../helpers/passport');
const auth    = require('../helpers/auth');
const Job = require('../models/jobs');
const multer = require('multer');
const Picture = require('../models/picture');
const upload = multer({ dest: './public/uploads/' });
const uploadResume = multer({ dest: './public/uploads/Resumes' });
const CV = require('../models/cv');

// ────────────────────────────────────────────────────────── I ──────────
//   :::::: H O M E   P A G E : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//
router.get('/', (req, res, next) => {
  res.render('index', { title: 'JoBot' });
});
//
// ──────────────────────────────────────────────────────────────────────────────── II ──────────
//   :::::: L O G I N   A U T H E N T I C A T I O N : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────
//
router.post("/", passport.authenticate("local", {
  successRedirect: "/userProfile",
  failureRedirect: "/",
  failureFlash: true, //disable/enable flash messaging but need flash package
  passReqToCallback: true
}));

// ──────────────────────────────────────────────────────────────── III ──────────
//   :::::: U S E R   P R O F I L E : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────
router.get('/userProfile', auth.checkLoggedIn('You must be logged in','/'),function(req,res,next){
  let userID = req.session.passport.user._id;
  User.findById(userID)
  .populate('cvs')
  .populate('avatar')
  .exec(function(err,user){
    if(err) {return next(err);}
    res.render('userProfile',{user});
  });
});

router.post('/userProfile/:id/delete', (req,res,next)=>{
  const resumeID = req.params.id;
  const userID = req.session.passport.user._id;
  User.findByIdAndUpdate( userID, {$pull: {cvs:resumeID}}, function (err, job){
    if(err) {
      return next(err);
    } else {
      User.findById(userID)
      .populate('cvs')
      .populate('avatar')
      .exec(function(err, user) {
        if (err){ return next(err); }
        res.render('userProfile', {user:user,layout:"layouts/test"});
      });
    }
  }
);
});
// ────────────────────────────────────────────────────────── IV ──────────
//   :::::: D A S H B O A R D : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
router.get('/dashboard', auth.checkLoggedIn('You must be logged in', '/'), function (req, res, next) {
  let userID = req.session.passport.user._id;
  User.findById(userID)
    .populate('jobsApplied')
    .exec(function(err, user) {
      if (err){ return next(err); }
      res.render('dashboard', {user});
    });
});

router.post('/dashboard/:id/delete', (req,res,next)=>{
  const jobID = req.params.id;
  const userID = req.session.passport.user._id;
  User.findByIdAndUpdate( userID, {$pull: {jobsApplied:jobID}}, function (err, job){
    if(err) {
      return next(err);
    } else {
      User.findById(userID)
      .populate('jobsApplied')
      .exec(function(err, user) {
        if (err){ return next(err); }
        res.render('dashboard', {user:user,layout:"layouts/test"});
      });
    }
  }
);
});
// ──────────────────────────────────────────────────── V ──────────
//   :::::: S E A R C H : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
router.get('/search', auth.checkLoggedIn('You must be logged in', '/'), function(req, res, next) {
  res.render('search', { user: JSON.stringify(req.user) });
});

// ────────────────────────────────────────────────────────────── VI ──────────
//   :::::: J O B   D I S P L A Y : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
router.get('/job_display', (req, res, next)=> {
  Job.find({}, (err,jobs)=>{
    if(err) {return next(err); }
    res.render('job_display', { jobs });
  });
});

router.post('/job_display/:id', (req,res,next)=>{
  const jobID = req.params.id;
  const userID = req.session.passport.user._id;
  User.findByIdAndUpdate( userID, {$push: {jobsApplied:jobID}}, function (err, job){
      if(err) {
        return next(err);
      } else {
        Job.find({}, (err,jobs)=>{
          if(err) {return next(err); }
          res.render('job_display',{ jobs });
        });
      }
    }
  );
});

module.exports = router;
