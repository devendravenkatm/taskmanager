const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Updated controller

// POST /login - User login
router.post('/login', authController.login);

// POST /register - User registration
router.post('/register', authController.register);

module.exports = router;
