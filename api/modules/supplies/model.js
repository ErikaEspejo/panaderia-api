const { Sequelize, DataTypes } = require("sequelize");

const { config } = require("../../../config");
const Providers = require("../providers/model");

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

const Supplies = sequelize.define(
  "Supplies",
  {
    supply_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
    units: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalCost: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    ProviderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Supplies",
  },
  {
    timestamps: true,
  },
  { initialAutoIncrement: 0 }
);

Supplies.belongsTo(Providers);
Providers.hasMany(Supplies);

module.exports = Supplies;
