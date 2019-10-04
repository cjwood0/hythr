const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  hy: { type: String, required: true },
  creator: {type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  likes: { type: 0 }
});

module.exports = mongoose.model('Post', postSchema);
