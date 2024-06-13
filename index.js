const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./models/models');

const app = express();

app.use("/bars", barsRouter);
app.use(bodyParser.json());

dotenv.config();

//Initialise la base de donnée avec relations
initializeDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
