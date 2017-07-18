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

router.post('/', upload.single('CV'), (req, res, next) => {
  let userID = req.session.passport.user._id;
  console.log("req.files!!!!", req.file);
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  let newCV = new CV({ filename: req.file.filename });

  newCV.save((err, cv) => {
    if (err) {
      console.log('Error in save method!');
      return next(err);
    }
    else {
      User.findByIdAndUpdate(userID, { $set: { newCV: pic.pic_path }}, (err, user) => {
        if (err) { return next(err); }
        else { res.redirect('/userProfile'); }
      });
    }
  });

});


// router.post('/userProfile', upload.single('photo'), function(req, res){
//   let userID = req.session.passport.user._id;
//
//   let pic = new Picture({
//     name: req.body.name,
//     pic_path: `./uploads/${req.file.filename}`,
//     pic_name: req.file.originalname
//   });
//   console.log("picture",pic);
//   pic.save((err,pic) => {
//     if(err){res.redirect('/'); }
//     else {
//       User.findByIdAndUpdate(userID, { $set: { avatar: pic.pic_path }}, function (err, user) {
//         console.log('in function before error');
//         if (err) { return next(err); } else{
//           console.log('after error in function');
//           res.render('userProfile', {user});
//           // res.redirect('/userProfile')
//           console.log('what the hell');
//         }
//
//       });
//     }
//   });
//   console.log('before update');
//
//
// });


module.exports = router;
