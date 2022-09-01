var express = require('express');
var router = express.Router();
const controller = require('../controller/categories');

// routes with user
router.get('/', controller.getAll)
router.post('/', controller.add)
router.put('/:id', controller.update)


module.exports = router;
