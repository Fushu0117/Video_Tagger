const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.route('/').get(videoController.getAll).post(videoController.post);
router.route('/:email').get(videoController.getFromEmail);

module.exports = router;
