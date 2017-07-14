/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const flash = require('connect-flash');


/* GET home page. */
