/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  occupation: String,
  phone: String,
  address: {
    street: String,
    number: Number,
    city: String,
    Country: String,
    zip: String
  },
  facebookID: String,
  googleID: String,
  }, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model('User',userSchema);
module.exports = User;
