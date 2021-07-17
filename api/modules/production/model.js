const { Sequelize, DataTypes } = require("sequelize");

const { config } = require("../../../config");

const sequelize = new Sequelize(
  config.database.db,
  config.database.user,
  config.database.password,
  {
    host: config.host,
    dialect: config.database.dialect,
    // logging: false,
  }
);

const Production = sequelize.define(
  "Production",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    production: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Production",
  },
  {
    timestamps: true,
  },
  { initialAutoIncrement: 0 }
);

module.exports = Production;
