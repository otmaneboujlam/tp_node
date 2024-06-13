const sequelize = require('../config/database');
const Bar = require('./bars');
const Biere = require('./biere');
const Commande = require('./order');
const BiereCommande = require('./biere_commande');

Bar.hasMany(Biere, { foreignKey: 'bars_id' });
Bar.hasMany(Commande, { foreignKey: 'bars_id' });

Biere.belongsTo(Bar, { foreignKey: 'bars_id' });
Biere.belongsToMany(Commande, { through: BiereCommande, foreignKey: 'biere_id' });

Commande.belongsTo(Bar, { foreignKey: 'bars_id' });
Commande.belongsToMany(Biere, { through: BiereCommande, foreignKey: 'commande_id' });

const initializeDatabase = async () => {
  await sequelize.sync({ force: true });
};

module.exports = {
  initializeDatabase,
  Bar,
  Biere,
  Commande,
  BiereCommande
};
