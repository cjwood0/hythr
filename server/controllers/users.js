const User = require('../models/user'),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken');

getUser = (userId) => User.findById(userId).then(user => user);

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

    res.status(200).json({ token, expiresIn: 7 * 24 * 60 * 60 * 1000, userId: foundUser._id, following: foundUser.following });
  }).catch(error => {
    return res.status(401).json({ message: 'Nice try' });
  });
};

exports.follow = (req, res, next) => {
  let follower = null,
      followee = null;

  getUser(req.body.followerId).then(user => {
    follower = user;
    getUser(req.body.followId).then(user2 => {
      followee = user2;

      if(!follower || !followee) return res.status(401).json({ message: "Failed to follow"});

      follower.following.addToSet(followee._id);

      follower.save().then(response => {
        res.status(200).json({ following: follower.following });
      });
    });
  });
}

exports.unfollow = (req, res, next) => {
  let follower = null,
      followee = null;

  getUser(req.body.followerId).then(user => {
    follower = user;
    getUser(req.body.followId).then(user2 => {
      followee = user2;

      if(!follower || !followee) return res.status(401).json({ message: "Failed to unfollow"});

      follower.following.pull(followee._id);
      follower.save().then(response => {
        res.status(200).json({ following: follower.following });
      });
    });
  });
}
