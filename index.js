const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./models/models');
const biereCommandeRouter = require('./router/biere_commandeRouter');
const biereRouter = require('./router/biere');

const app = express();

app.use(bodyParser.json());

dotenv.config();

//Initialise la base de donnée avec relations
initializeDatabase();

//Routes
app.use('/biere_commande', biereCommandeRouter);
app.use('/biere', biereRouter);
app.use("/bars", barsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
