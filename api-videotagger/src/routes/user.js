const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/').get(userController.getAll).post(userController.post);
router.route('/:id').get(userController.get);

module.exports = router;
