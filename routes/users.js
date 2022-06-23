var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* http://localhost:3000/users/ */
router.get('/', userController.index);

/* http://localhost:3000/users/{id} */
router.get('/:id', userController.show);

/* http://localhost:3000/users/ */
router.post('/', userController.insert);

module.exports = router;
