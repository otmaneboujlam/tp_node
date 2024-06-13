const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./models/models');
const biereRouter = require('./router/biere');

dotenv.config();

const app = express();
app.use(bodyParser.json());

//Initialise la base de donnée avec relations
initializeDatabase();

app.use('/biere', biereRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
