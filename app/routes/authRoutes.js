const express = require('express');

const { login, register } = require('../controllers/authController');
const { refreshToken } = require('../controllers/tokenController');

const router = express.Router();

router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/register', register)

module.exports = router;
