/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cvSchema = new Schema({
  resumeName: String,
  file_path: String,
  file_name: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const CV = mongoose.model('CV',cvSchema);
module.exports = CV;
