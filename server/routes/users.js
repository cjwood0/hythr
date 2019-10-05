const express = require('express'),
      router = express.Router(),
      UsersController = require('../controllers/users');

router.post('/signup', UsersController.createUser);
router.post('/login', UsersController.loginUser);

module.exports = router;
