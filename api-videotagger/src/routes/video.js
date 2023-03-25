const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.route('/').get(videoController.getAll).post(videoController.post);

module.exports = router;
