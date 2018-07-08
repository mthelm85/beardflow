const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
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
  },
  likes: {
    type: Number,
    default: 0
  }
});
postSchema.index({ text: 'text' });
postSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Post', postSchema);
