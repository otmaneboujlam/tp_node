const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const barsRouter = require("./router/barsRouter");
const app = express();

app.use("/bars", barsRouter);
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
