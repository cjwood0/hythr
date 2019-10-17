const express = require('express'),
      router = express.Router(),
      checkAuth = require('../middleware/check-auth'),
      UsersController = require('../controllers/users');

router.post('/signup', UsersController.createUser);
router.post('/login', UsersController.loginUser);
router.put('/follow', checkAuth, UsersController.follow);
router.put('/unfollow', checkAuth, UsersController.unfollow);

module.exports = router;
