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

const Quality = sequelize.define(
  "Quality",
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
    findingType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    finding: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accomplishment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "Quality",
  },
  {
    timestamps: true,
  },
  { initialAutoIncrement: 0 }
);

module.exports = Quality;
