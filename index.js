const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./models/models');
const biereCommandeRouter = require('./router/biere_commandeRouter');

dotenv.config();

const app = express();
app.use(bodyParser.json());

//Initialise la base de donnée avec relations
initializeDatabase();

//Routes
app.use('/biere_commande', biereCommandeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
