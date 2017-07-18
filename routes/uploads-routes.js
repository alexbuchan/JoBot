/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const Picture = require('../models/picture');
const CV = require('../models/cv');
const upload = multer({ dest: './public/uploads/' });

router.get('/', (req, res, next) => {
  res.render('uploads');
});

router.post('/', upload.single('file'), (req, res, next) => {
  console.log('Inside the post');
  let userID = req.session.passport.user._id;
  let fileID = req.file._id;
  let target_path = 'uploads/' + req.file.originalname;

  let newCV = new CV({
    filename: req.file.originalname,
    filepath: `/uploads/${req.file.filename}`,
  });
  console.log('before save');
  newCV.save((err, newCV) => {
    if (err) {
      console.log('There has been an error.');
      return next(err);
    }
    else {
      console.log('CV!', newCV);
      console.log("This is the file:", req.file);
      User.findByIdAndUpdate(userID, {$push: { cvs: newCV._id }}, (err, file) => {
        if (err) { return next(err); }
        else {
          console.log('file was added to', req.session.passport.user.username);
          res.render('uploads');
        }
      });
    }
  });
});

module.exports = router;
