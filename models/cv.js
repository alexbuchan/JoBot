/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cvSchema = new Schema({
  filename: String,
});

const CV = mongoose.model('CV',cvSchema);
module.exports = CV;
