/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  pic_path: String,
  pic_name: String,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;
