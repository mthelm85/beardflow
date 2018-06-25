const mongoose = require('mongoose');
const validator = require('validator');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 70
  },
  text: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 3000
  },
  user: {
    type: String,
    required: true,
    unique: false
  },
  userPic: {
    type: String,
    required: true,
    unique: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  keywords: [],
  category: {
    type: String,
    required: true,
    unique: false
  },
  postPicUrl: {
    type: String
  }
});

module.exports = mongoose.model('Post', postSchema);
