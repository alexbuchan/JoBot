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

// ########### UPLOAD AVATAR ########### UPLOAD AVATAR ########### UPLOAD AVATAR ########### UPLOAD AVATAR ###########

router.post('/userProfile', upload.single('photo'), function(req, res){
  var userID = req.session.passport.user._id;

  let pic = new Picture({
    name: req.body.name,
    pic_path: `./uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });
  console.log("picture",pic);
  pic.save((err,pic) => {
    if(err){res.redirect('/'); }
    else {
      User.findByIdAndUpdate(userID, { $set: { avatar: pic.pic_path }}, function (err, user) {
        console.log('in function before error');
        if (err) { return next(err); } else{
          console.log('after error in function');
          res.render('userProfile', {user});
          // res.redirect('/userProfile')
          console.log('what the hell');
        }

      });
    }
  });
  console.log('before update');


});

router.get('/', function(req, res, next) {
  Picture.find((err, pic) => {
    res.render('index', {pic});
  });
});

// ########### VIEWS ########### VIEWS ########### VIEWS ########### VIEWS ########### VIEWS ########### VIEWS ###########

router.get('/userProfile', auth.checkLoggedIn('You must be logged in', '/'), function(req, res, next) {
  console.log("userProfile",JSON.stringify(req.user));
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
