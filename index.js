const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

// App config
const app = express();
const port = process.env.PORT || 4000;
const { DATABASE } = require("./config");

const usersRouter = require("./routes/users");
const tokensRouter = require("./routes/tokens");

//Middlewares
app.use(express.json());
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", usersRouter);
app.use("/api/tokens", tokensRouter);

mongoose
  .connect(DATABASE, { useNewUrlParser: true })
  .then((r) => console.log("Conexión OK"));

//Listeners
app.listen(port, () => console.log(`listening on port ${port}`));
