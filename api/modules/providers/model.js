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

const Providers = sequelize.define(
  "Providers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    providerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    providerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    providerWeb: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactPhone: {
      type: DataTypes.STRING,
    },
    contactEmail: {
      type: DataTypes.STRING,
    },
    supplies: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Providers",
  },
  {
    timestamps: true,
  },
  { initialAutoIncrement: 0 }
);

module.exports = Providers;
