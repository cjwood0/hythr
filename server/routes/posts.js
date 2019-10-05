const express = require('express'),
      router = express.Router(),
      PostsController = require('../controllers/posts');

router.post("", PostsController.createPost);
router.get('/:id', PostsController.getPost);
router.get('', PostsController.getPosts);

module.exports = router;
