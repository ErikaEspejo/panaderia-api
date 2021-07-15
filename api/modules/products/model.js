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

const Products = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
    supplies: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Products",
  },
  {
    timestamps: true,
  },
  { initialAutoIncrement: 0 }
);

module.exports = Products;
