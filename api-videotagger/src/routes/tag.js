const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.route('/').get(tagController.getAll).post(tagController.post);
router.route('/:id').delete(tagController.del);
router.route('/:video/:user').get(tagController.getFromVideoAndEmail);

module.exports = router;
