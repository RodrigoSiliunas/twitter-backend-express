// Importando os requerimentos para o aplicativo rodar
const cron = require("node-cron");
const express = require("express");
const cors = require("cors");
const sequelize = require("./app/configs/database");

// Importando serviços e configurações personalizadas
const configs = require("./app/configs/configurations");
const updateTrendingTopics = require("./app/services/updateTrendingTopics");

// Importando as rotas da nossa aplicação
const authRoutes = require("./app/routes/authRoutes");
const tweetRoutes = require("./app/routes/tweetRoutes");

// Importa as associações de modelos de dados
require("./app/models/associations");

// Definindo configurações de aplicativo
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*", // Substitua pelo domínio de onde sua aplicação frontend está servida
    methods: ["GET", "POST", "PUT", "PATH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rotas da API
app.use("/v1/users", authRoutes);
app.use("/v1/tweets", tweetRoutes);

// Configuração do agendador de tarefas do aplicativo; utilizado unicamente para que os thrending topics sejam atualizados a cada meia hora
cron.schedule("*/1 * * * *", async () => {
  console.log("Atualizando trending topics...");
  await updateTrendingTopics();
});

async function startServer() {
  try {
    // Sincroniza todos os modelos com o banco de dados
    await sequelize.sync(); // Usa { force: true } para recriar as tabelas
    console.log("Modelos sincronizados com o banco de dados.");
  } catch (error) {
    console.error("Erro ao sincronizar os modelos:", error);
  }

  // Inicializa o servidor express com as configurações de endereço personalizadas
  try {
    app.listen(configs.server.port, configs.server.host, () => {
      console.log(
        `Servidor rodando em http://${configs.server.host}:${configs.server.port}`
      );
    });
  } catch (error) {
    console.error("Erro na inicialização do servidor: ", error);
  }
}

startServer();
