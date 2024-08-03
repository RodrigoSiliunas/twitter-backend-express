const { Op } = require("sequelize");
const Tweet = require("../models/Tweet");
const TrendingTopic = require("../models/TrendingTopic");

// Função para buscar tweets das últimas 4 horas
async function getRecentTweets() {
  try {
    const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000); // 4 horas atrás
    const recentTweets = await Tweet.findAll({
      where: {
        timestamp: {
          [Op.gte]: fourHoursAgo,
        },
      },
    });
    return recentTweets;
  } catch (error) {
    console.error("Erro ao obter tweets recentes:", error);
    return [];
  }
}

async function updateTrendingTopics() {
  try {
    const tweets = await getRecentTweets();

    if (tweets.length <= 0 || tweets == undefined) {
      console.log("Nenhum tweet recente encontrado.");
      return;
    }

    // Conta a frequência das hashtags
    const topicCounts = {};
    tweets.forEach((tweet) => {
      const topics = tweet.text.match(/#\w+/g); // Extrai hashtags
      if (topics) {
        topics.forEach((topic) => {
          if (topicCounts[topic]) {
            topicCounts[topic]++;
          } else {
            topicCounts[topic] = 1;
          }
        });
      }
    });

    // Atualiza o modelo TrendingTopic com os dados
    for (const [topic, count] of Object.entries(topicCounts)) {
      await TrendingTopic.upsert({
        topic: topic,
        mentions: count,
        timestamp: new Date(),
      });
    }

    console.log("Trending topics atualizados com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar trending topics:", error);
  }
}

module.exports = updateTrendingTopics;
