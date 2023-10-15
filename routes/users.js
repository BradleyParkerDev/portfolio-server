const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController')

// routes
router.post('/contact', usersController.contact);

module.exports = router;