const dotenv = require("dotenv");

dotenv.config();

const config = {
  http: {
    host: process.env.HTTP_HOST || "0.0.0.0",
    port: process.env.PORT || process.env.HTTP_PORT,
  },
  log: {
    access: "../logs/" + process.env.LOG_ACCESS,
  },
  jwtKey: process.env.JWTKEY,
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    db: process.env.DB_SCHEMA,
    dialect: process.env.DB_DIALECT,
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
};

module.exports = { config };