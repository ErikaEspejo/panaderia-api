const { Sequelize } = require('sequelize');
const { config } = require('../config');

const init = async () => {
  const db = new Sequelize(config.database.db, config.database.user, config.database.password,{
    host: config.host,
    dialect: config.database.dialect,
    // logging: false,
  });

  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};


module.exports = { init };