const express = require('express'),
      router = express.Router(),
      UsersController = require('../controllers/users');

router.post('/signup', UsersController.createUser);
router.post('/login', UsersController.loginUser);
router.put('/follow', UsersController.follow);
router.put('/unfollow', UsersController.unfollow);

module.exports = router;
