/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  age: String,
  email: String,
  occupation: String,
  phone: String,
  address: {
    street: String,
    number: String,
    city: String,
    Country: String,
    zip: String
  },
  facebookID: String,
  googleID: String,
  jobsApplied: [{type: Schema.Types.ObjectId, ref: 'Job'}],
  cvs: [{type: Schema.Types.ObjectId, ref: 'CV'}],
  avatar: {type: Schema.Types.ObjectId, ref: 'Picture'},
  }, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

userSchema.index({"$**": "text"});

const User = mongoose.model('User',userSchema);
module.exports = User;
