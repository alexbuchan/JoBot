/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('users-routes get');
  res.send('respond with a resource');
});

module.exports = router;
