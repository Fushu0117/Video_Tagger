const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.route('/').get(tagController.getAll).post(tagController.post);

module.exports = router;
