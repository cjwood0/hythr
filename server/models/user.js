const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true}, // unique doesn't validate, just improves efficiency, why is it called a validator
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  following: [{ type: mongoose.Types.ObjectId, ref: User }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
