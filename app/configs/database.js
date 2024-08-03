const { Sequelize } = require("sequelize");
const path = require('path');


const filePath = __filename; // Caminho do arquivo atual
const rootDir = path.dirname(path.dirname(filePath)); // Caminho para pasta pai da pasta onde está o arquivo
const databasePath = path.join(rootDir, 'databases/xuitter_db.sqlite'); // Acessando a pasta de database

// Configurações para a conexão com o SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: databasePath,
  logging: (...msg) => console.log(msg),
});

// Testa a conexão com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
})();

module.exports = sequelize;
