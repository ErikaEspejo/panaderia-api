const { Sequelize, DataTypes } = require("sequelize");

const { config } = require("../../../../config");

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

const CostType = sequelize.define(
  "CostType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "CostType",
  },
  {
    timestamps: true,
  },
  { initialAutoIncrement: 0 }
);

module.exports = CostType;
