const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = (req, res, next) => {
  const creator = req.userData.userId;

  const post = new Post({
          content: req.body.content,
          creator: req.userData.userId,
        });

  post.save()
    .then(({_id: id, content}) => { res.status(201).json({ id, content })})
    .catch(error => { res.status(500).json({ message: 'Creating post failed' })});
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) res.status(200).json(post);
    else res.status(404).json({ message: 'Post not found' });
  });
};

exports.getPosts = (req, res, next) => {

  const pageSize = +req.query.pagesize, // neat trick
        currentPage = +req.query.page;

  let postQuery;

  const listType = req.params.type
  switch(listType) {
    case 'myhy':
      postQuery = Post.find({creator: req.userData.userId}).sort('-createdAt').populate('creator', 'name'); // TODO: figure out if is this lazy
      if (pageSize && currentPage) postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
      postQuery.then(documents => { // I wish they were records...
        posts = documents;
        return Post.countDocuments();
      }).then(postCount => {
        res.status(200).json({
          posts,
          postCount
        });
      }).catch(error => {
        return res.status(500).json({ message: 'Error getting posts' });
      });
      break;

    case 'following':
      User.findById(req.userData.userId, 'following').then(user => {
        postQuery = Post.find().where('creator').in(user.following).sort('-createdAt').populate('creator', 'name'); // TODO: figure out if is this lazy
        if (pageSize && currentPage) postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
        postQuery.then(documents => {
          posts = documents;
          return Post.countDocuments();
        }).then(postCount => {
          res.status(200).json({
            posts,
            postCount
          });
        }).catch(error => {
          return res.status(500).json({ message: 'Error getting posts' });
        });
      });
      break;

    default:
      postQuery = Post.find().sort('-createdAt').populate('creator', 'name'); // TODO: figure out if is this lazy
      if (pageSize && currentPage) postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
      postQuery.then(documents => { // I wish they were records...
        posts = documents;
        return Post.countDocuments();
      }).then(postCount => {
        res.status(200).json({
          posts,
          postCount
        });
      }).catch(error => {
        return res.status(500).json({ message: 'Error getting posts' });
      });
      break;
  }
};
