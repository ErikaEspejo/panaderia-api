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

const Workers = sequelize.define(
  "Workers",
  {
    idType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    retreatDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalDayHours: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: true,
    },
    totalNightHours: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: true,
    },
    totalHolidayDayHours: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: true,
    },
    totalHolidayNightHours: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: true,
    },
    salary: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
    healthContribution: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
    pension: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
    arl: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
    risk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    compensation: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
    totalCompanyToPay: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
    totalWorkerToPay: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
    totalToSend: {
      type: DataTypes.DOUBLE(20, 2),
      allowNull: false,
    },
  },
  {
    tableName: "Workers",
  },
  {
    timestamps: true,
  }
);

module.exports = Workers;
