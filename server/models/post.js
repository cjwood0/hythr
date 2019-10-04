const mongoose = require('mongoose'),
      postSchema = mongoose.Schema({
        hy: { type: String, required: true, minlength: 1, maxlength: 200 },
        creator: { type: idType, ref: "User", required: true },
        likes: 0
      });

module.exports = mongoose.model('Post', postSchema);
