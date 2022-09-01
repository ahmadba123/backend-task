var express = require('express');
var router = express.Router();
const controller = require('../controller/task');
const { auth } = require("../middleware/authMiddleware");

// routes with user
router.get('/', controller.getAll)
router.get('/user',[auth],  controller.getTasksByUser)
router.post('/', [auth], controller.add)
router.put('/:id',[auth], controller.update)


module.exports = router
