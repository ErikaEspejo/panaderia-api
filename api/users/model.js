const { Sequelize, DataTypes } = require('sequelize');

const { config } = require("../../config");

const sequelize = new Sequelize(config.database.db, config.database.user, config.database.password, {
  host: config.host,
  dialect: config.database.dialect,
  // logging: false,
});

const User = sequelize.define('User', {
  identificationNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "activo",
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Users',
}, {
  timestamps: true
});



module.exports = User;