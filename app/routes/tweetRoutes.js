const express = require('express');
const { createTweet, getTweets, getTrendings } = require('../controllers/tweetController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para criar um tweet (somente para usuários autenticados)
router.post('/', authenticateToken, createTweet);
router.get('/', authenticateToken, getTweets);
router.get('/trendings', authenticateToken, getTrendings);

module.exports = router;
