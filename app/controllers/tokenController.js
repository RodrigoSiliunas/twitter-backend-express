const jwt = require('jsonwebtoken');
const configs = require('../configs/configurations');

const Token = require('../models/Token');

const secretKey = configs.jwt.secret;

async function refreshToken(req, res) {
  const { refreshToken } = req.body;

  try {
    const token = await Token.findOne({ where: { refreshToken } });
    if (!token) {
      return res.status(401).json({ message: 'Refresh token inválido' });
    }

    const decoded = jwt.verify(refreshToken, secretKey);
    const newAccessToken = jwt.sign({ userId: decoded.userId }, secretKey, { expiresIn: configs.jwt.accessExpiresIn });

    // Atualiza o token de acesso no banco de dados
    await Token.update({ accessToken: newAccessToken }, { where: { refreshToken } });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao renovar o token', error });
  }
}

module.exports = {
  refreshToken,
};
