const { Sequelize, DataTypes } = require("sequelize");

const { config } = require("../../config");

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

const Costs = sequelize.define(
  "Costs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    costName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    costType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    costValue: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
  },
  {
    tableName: "Costs",
  },
  {
    timestamps: true,
  },
  { initialAutoIncrement: 0 }
);

module.exports = Costs;
