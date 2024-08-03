const jwt = require('jsonwebtoken');
const configs = require('../configs/configurations');

const Token = require('../models/Token');

const secretKey = configs.jwt.secretToken;

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(500).json({ message: "Bearer token não encontrado nos headers da requisição." });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const storedToken = await Token.findOne({ where: { accessToken: token } });

    if (!storedToken) {
      res.status(403).json({
        message: "Token inválido ou expirado. Faça login novamente.",
        token: `${token} ${storedToken}`
      })
    }

    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.sendStatus(403); // Forbidden
    console.error("Erro ao autenticar token:", error);
  }
}

module.exports = authenticateToken;
