const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
const validator = require('validator');

const messageSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  userTo: {
    type: String,
    required: true,
    unique: false
  },
  userFrom: {
    type: String,
    required: true,
    unique: false
  },
  userFromPic: {
    type: String,
    required: true,
    unique: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});
messageSchema.index({ text: 'text' });
messageSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Message', messageSchema);
