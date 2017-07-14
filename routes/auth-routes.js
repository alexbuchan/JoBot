const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (username === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }
  
  User.findOne({ username: username }, 'username', (err, user) =>{

    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The username already exists"
      });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
    })

    newUser.save((err) => {
      if (err) { return next(err) }
      res.redirect('/');
    })
  })
});

router.get('/login', (req, res, next) => {
  console.log('route /login get');
  res.render('auth/login',{ "message": req.flash("error") });
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login",
  failureFlash: true, //disable/enable flash messaging but need flash package
  passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/login');
})

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
