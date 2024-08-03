const TrendingTopic = require("../models/TrendingTopic");
const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function createTweet(req, res) {
  const { text } = req.body;
  const userId = req.user.userId;

  if (!text || text.trim() === "") {
    return res
      .status(400)
      .json({ message: "Texto do tweet não pode ser vazio." });
  }

  try {
    const newTweet = await Tweet.create({
      text,
      userId: userId,
    });

    res
      .status(201)
      .json({ message: "Tweet criado com sucesso!", tweet: newTweet });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar o tweet.", error });
  }
}

async function getTweets(req, res) {
  try {
    // Buscar tweets com dados do usuário incluídos
    const tweets = await Tweet.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"], // Inclua apenas os atributos necessários
          as: "user", // Nome do alias que você usará para acessar os dados do usuário
        },
      ],
    });

    // Formatar a resposta para incluir o username
    const formattedTweets = tweets.map((tweet) => ({
      id: tweet.id,
      username: tweet.user.username,
      text: tweet.text,
      timestamp: tweet.timestamp,
    }));

    return res.status(200).json({ tweets: formattedTweets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar tweets.", error });
  }
}

async function getTrendings(req, res) {
  try {
    const trendings = await TrendingTopic.findAll();

    return res.status(200).json({ trendings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar trendings.", error });
  }
}

module.exports = {
  createTweet,
  getTweets,
  getTrendings
};
