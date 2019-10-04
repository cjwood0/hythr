const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  hy: { type: String, required: true, minlength: 1, maxlength: 200 },
  creator: {type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  likes: 0
});

module.exports = mongoose.model('Post', postSchema);
