const { DataTypes } = require('sequelize');
const db = require("../config/database")
const Bar = require('./bars');

const Order = db.define('Order', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
    name : { type : DataTypes.STRING },
    price : { type : DataTypes.FLOAT, validate : { min : 0 } },
    date : { type : DataTypes.DATE },
    statut : { type : DataTypes.ENUM, values: ["en cours", "terminée"] },
    bars_id : { type : DataTypes.INTEGER, references: {
        model: Bar,
        key: "id",
      }},
})

module.exports = Order