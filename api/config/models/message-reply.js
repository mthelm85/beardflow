const mongoose = require('mongoose');
const validator = require('validator');

const messageReplySchema = mongoose.Schema({
  messageId: {
    type: String
  },
  text: {
    type: String,
    required: true
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
  }
});

module.exports = mongoose.model('MessageReply', messageReplySchema);
