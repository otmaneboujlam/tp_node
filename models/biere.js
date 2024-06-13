const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

class Biere extends Model { }

Biere.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    degree: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    bars_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Biere',
    tableName: 'biere',
    timestamps: false,
});

module.exports = Biere;
