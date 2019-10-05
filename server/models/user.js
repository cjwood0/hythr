const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator');
      userSchema = mongoose.Schema({
        name: { type: String, required: true, unique: true}, // unique doesn't validate, just improves efficiency, why is it called a validator
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        following: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
      });

userSchema.plugin(uniqueValidator); // lies

module.exports = mongoose.model('User', userSchema); // why is model not capitalized
