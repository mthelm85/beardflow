const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const postReplySchema = mongoose.Schema({
  postObjectID: {
    type: String
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
  }
});
postReplySchema.index({ text: 'text' });
postReplySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Reply', postReplySchema);
