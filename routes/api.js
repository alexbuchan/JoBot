const express = require('express');
const router = express.Router();
const CV = require('../models/cv');
const Job = require('../models/jobs');
const Picture = require('../models/picture');
const User = require('../models/users');
const passport = require('../helpers/passport');

// router.route('/')
// .get((req, res) => {
//   User.find((error, users) => {
//     if (error) {
//       res.status(500).json({message: error});
//     } else {
//       res.status(200).json(users);
//     }
//   })
// });

// router.route('/job_display')
// .get((req, res) => {
//   Job.find((error, jobs) => {
//     if (error) {
//       res.status(500).json({message: error});
//     } else {
//       res.status(200).json(jobs);
//     }
//   })
// });

module.exports = router;
