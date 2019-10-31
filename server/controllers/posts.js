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
        currentPage = +req.query.page,
        postQuery = Post.find().populate('creator', 'name'); // TODO: figure out if is this lazy

  let posts;

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
};
