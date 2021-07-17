const { Sequelize, DataTypes } = require("sequelize");

const { config } = require("../../../config");
const User = require("../users/model");

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

const Sales = sequelize.define(
  "Sales",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    buyer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserIdentificationNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalValue: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
  },
  {
    tableName: "Sales",
  },
  {
    timestamps: true,
  },
  { initialAutoIncrement: 0 }
);

Sales.belongsTo(User);
User.hasMany(Sales);

module.exports = Sales;
