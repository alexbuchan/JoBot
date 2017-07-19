/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const Picture = require('../models/picture');
const CV = require('../models/cv');
const uploadResume = multer({ dest: './public/uploads/Resumes' });
const uploadAvatar = multer({ dest: './public/uploads/Avatars' });

router.get('/', (req, res, next) => {
  res.render('uploads');
});
// ──────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S A V E   RESUME   P O S T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
router.post('/addResume', uploadResume.single('file'), (req, res, next) => {
  let userID = req.session.passport.user._id;

  newCV = new CV({
  resumeName: req.body.Resumename,
  file_path: `/uploads/Resumes/${req.file.filename}`,
  file_name: req.file.originalname,
  });

  newCV.save((err, newCV) => {
    if (err) {
      return next(err);
    }
    else {
      User.findByIdAndUpdate(userID, {$push: { cvs: newCV._id }}, (err, file) => {
        if (err) { return next(err); }
        else {
          res.redirect('/uploads');
        }
      });
    }
  });
});
// ────────────────────────────────────────────────────────────────── II ──────────
//   :::::: U P L O A D   A V A T A R : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────
router.post('/addAvatar', uploadAvatar.single('photo'), function(req, res){
  var userID = req.session.passport.user._id;

  let pic = new Picture({
    picName: req.body.Avatarname,
    pic_path: `./uploads/Avatars/${req.file.filename}`,
    pic_name: req.file.originalname
  });
  pic.save((err,pic) => {
    if(err){res.redirect('/'); }
    else {
      User.findByIdAndUpdate(userID, { $set: { avatar: pic._id }}, function (err, file) {
        if (err) { return next(err); } 
        else{
          res.redirect('/uploads');
        }
      });
    }
  });
});
module.exports = router;
