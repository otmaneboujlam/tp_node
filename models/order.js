const sequelize = require("sequelize")
const db = require("../config/database")

const Order = db.define('Order', {
    id : { type : sequelize.INTEGER, primaryKey : true, autoIncrement : true },
    name : { type : sequelize.STRING },
    price : { type : sequelize.FLOAT, validate : { min : 0 } },
    date : { type : sequelize.DATE },
    statut : { type : sequelize.ENUM('en cours', 'terminée') }
})

module.exports = Order