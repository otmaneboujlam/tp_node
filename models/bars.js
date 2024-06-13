const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bar = sequelize.define("Bar", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  adresse: {
    type: DataTypes.STRING,
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Bar;
