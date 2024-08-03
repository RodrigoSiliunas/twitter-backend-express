const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const configs = require("../configs/configurations");

const User = require("../models/User");
const Token = require("../models/Token");

const secretKey = configs.jwt.secretToken;

async function register(req, res) {
  const { username, email, password } = req.body;

  // Validação básica dos dados de entrada
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    // Verifica se o e-mail já está registrado
    const existingUserEmail = await User.findOne({ where: { email } });
    const existingUsername = await User.findOne({ where: { username } });

    if (existingUserEmail) {
      return res.status(400).json({ message: "E-mail já registrado." });
    }

    if (existingUsername) {
      return res.status(400).json({ message: "Nome de usuário já existe." });
    }

    // Criação do novo usuário
    const newUser = await User.create({
      username,
      email,
      password,
    });

    return res
      .status(201)
      .json({ message: "Usuário registrado com sucesso!", user: newUser });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Erro ao registrar usuário.", error });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Encontre o usuário pelo e-mail
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Email ou senha incorretos" });
    }

    // Verifica se a senha está correta
    const isPasswordValid = (password == user.password)
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou SENHA incorretos" });
    }

    const accessToken = jwt.sign({ userId: user.uuid }, secretKey, {
      expiresIn: configs.jwt.accessExpiresIn,
    });
    const refreshToken = jwt.sign({ userId: user.uuid }, secretKey, {
      expiresIn: configs.jwt.refreshExpiresIn,
    });

    // Salvar tokens no banco de dados
    await Token.upsert({
      userId: user.uuid,
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Define expiração de 1 dias
    });

    res.json({ accessToken, refreshToken, user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao autenticar", error });
    console.log(error)
  }
}

module.exports = {
  login,
  register,
};
