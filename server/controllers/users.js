const User = require('../models/user'),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
          });

    user.save().then(result => {
      res.status(201).json({ result });
    }).catch(err => {
      res.status(500).json({ err });
    });
  });
};

exports.loginUser = (req, res, next) => {
  let foundUser = null;

  User.findOne({ email: req.body.email}).then(user => {
    if(!user) {
      return res.status(401).json({ message: "This isn't the user you're looking for" });
    }

    foundUser = user;

    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if(!result) {
      return res.status(401).json({ message: 'You successfully failed to log in' });
    }

    const token = jwt.sign({ email: foundUser.email, userId: foundUser._id }, process.env.JWT_KEY, { expiresIn: '7d' });

    res.status(200).json({ token, expiresIn: 7 * 24 * 60 * 60 * 1000, userId: foundUser._id });
  }).catch(error => {
    return res.status(401).json({ message: 'Nice try' });
  });
};
