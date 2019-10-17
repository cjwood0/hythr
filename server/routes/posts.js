const express = require('express'),
      router = express.Router(),
      checkAuth = require('../middleware/check-auth'),
      PostsController = require('../controllers/posts');

router.post("", checkAuth, PostsController.createPost);
router.get('/:id', PostsController.getPost);
router.get('', PostsController.getPosts);

module.exports = router;
