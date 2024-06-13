const { Sequelize } = require('sequelize');

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './config/database/database.sqlite'
});

