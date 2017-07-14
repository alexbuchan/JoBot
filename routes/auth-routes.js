/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const flash = require('connect-flash');

const bcryptSalt = 10;


//SIGNUP ########## SIGNUP ########## SIGNUP ########## SIGNUP ########## SIGNUP ########## SIGNUP ##########
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({ username: username }, 'username', (err, user) =>{
    if (user !== null) {
      res.render("signup", {
        errorMessage: "The username already exists"
      });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
    });

    newUser.save((err) => {
      if (err) { return next(err); }
      console.log("new user saved!");
      res.redirect('/userProfile');
    });
  });
});


//USERPROFILE ########## USERPROFILE USERPROFILE ########## USERPROFILE ########## USERPROFILE ##########

router.get('/userProfile', ensureAuthenticated, (req, res, next) => {
  res.render('auth/userProfile');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    res.redirect('/')
  }
}

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/login');
});

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/secret",
  failureRedirect: "/"
}));

router.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/secret"
}));

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

module.exports = router;


