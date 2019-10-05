const mongoose = require('mongoose'),
      postSchema = mongoose.Schema({
        content: { type: String, required: true, minlength: 1, maxlength: 200 },
        creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true }
      });

module.exports = mongoose.model('Post', postSchema);
