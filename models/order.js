const sequelize = require("sequelize")
const db = require("../config/database")
const Bar = require('./bars');

const Order = db.define('Order', {
    id : { type : sequelize.INTEGER, primaryKey : true, autoIncrement : true },
    name : { type : sequelize.STRING },
    price : { type : sequelize.FLOAT, validate : { min : 0 } },
    date : { type : sequelize.DATE },
    statut : { type : sequelize.ENUM, values: ["en cours", "terminée"] },
    bars_id : { type : sequelize.INTEGER, references: {
        model: Bar,
        key: "id",
      }},
})

module.exports = Order