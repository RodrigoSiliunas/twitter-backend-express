/*
==========================================================================
 ➠ Configurations File
 ➠ Section By: Rodrigo Siliunas
 ➠ Related system: Database (SQLite), JWT Authentication
==========================================================================
*/

require("dotenv").config();

module.exports = {
  jwt: {
    accessExpiresIn: "15m", // 1 day
    refreshExpiresIn: "1d", // 30 minutes
    secretToken: process.env.SECRET_TOKEN,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
};
