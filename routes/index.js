/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const flash = require('connect-flash');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index',{ "message": req.flash("error") });
});

router.post("/", passport.authenticate("local", {
  successRedirect: "/auth/userProfile",
  failureRedirect: "/",
  failureFlash: true, //disable/enable flash messaging but need flash package
  passReqToCallback: true
}));

module.exports = router;


// const username = req.body.username;
// const password = req.body.password;
//
// if (username === "" || password === "") {
//   res.render("auth/signup", {
//     errorMessage: "Indicate a username and a password to sign up"
//   });
//   return;
// }
//
// User.findOne({ username: username }, 'username', (err, user) =>{
//   if (user !== null) {
//     res.render("auth/signup", {
//       errorMessage: "The username already exists"
//     });
//     return;
//   }
//   const salt = bcrypt.genSaltSync(bcryptSalt);
//   const hashPass = bcrypt.hashSync(password, salt);
//
//   const newUser = new User({
//     username: username,
//     password: hashPass,
//   });
//
//   newUser.save((err) => {
//     if (err) { return next(err); }
//     res.redirect('userProfile');
//   });
// });
