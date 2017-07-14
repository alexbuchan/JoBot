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

