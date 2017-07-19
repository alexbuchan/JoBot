/*jshint esversion: 6*/
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session");
const expressLayouts = require('express-ejs-layouts');
const portDB = require('./config').portDB;
const databaseName = require('./config').databaseName;
const auth = require('./helpers/auth');
const flash = require('connect-flash');
const bcrypt        = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const ensureLogin = require("connect-ensure-login");
const MongoStore = require("connect-mongo")(session);
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

//CONNECT MONGODB
mongoose.connect(`mongodb://localhost:${portDB}/${databaseName}`);

//INIITIALIZE ROUTES

const authRoutes = require('./routes/auth-routes');
const index = require('./routes/index-routes');
const uploadRoutes = require('./routes/uploads-routes');
const api = require('./routes/api');

const User = require('./models/users');
const Job = require('./models/jobs');
const CV = require('./models/cv');

const app = express();

app.use(expressLayouts);
// view engine setup
app.set('layout', 'layouts/main');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "bower_components")));

//CREATE SESSION
app.use(session({
  secret              : "jobot-profile",
  resave              : true,
  saveUninitialized   : true,
  cookie              : { maxAge: 600000 }
}));

app.use(flash());
const passport = require('./helpers/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(auth.setCurrentUser);

app.use('/uploads', uploadRoutes);
app.use('/', authRoutes);
app.use('/', index);
app.use('/api',api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
