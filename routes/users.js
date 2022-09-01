var express = require('express');
var router = express.Router();
const controller = require('../controller/user');

// routes with user
router.get('/', controller.getAll)
router.post('/signin', controller.signin)
router.post('/signup', controller.signup)


module.exports = router;
