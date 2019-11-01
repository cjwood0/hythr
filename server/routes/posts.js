const express = require('express'),
      router = express.Router(),
      checkAuth = require('../middleware/check-auth'),
      PostsController = require('../controllers/posts');

router.post("", checkAuth, PostsController.createPost);
router.get('hy/:id', PostsController.getPost);
router.get('', PostsController.getPosts);
router.get('/:type', checkAuth, PostsController.getPosts);

module.exports = router;
