const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

// App config
const app = express();
const port = process.env.PORT || 4000;

const usersRouter = require("./routes/users");
const tokensRouter = require("./routes/tokens");
const walletRouter = require("./routes/wallets");

//HOME
express.get("/", async function (req, res) {
  res.send("OK");
});
//Middlewares
app.use(express.json());
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then((r) => console.log("Conexión OK"));

app.use("/api/users", usersRouter);
app.use("/api/tokens", tokensRouter);
app.use("/api/wallets", walletRouter);

//Listeners
app.listen(port, () => console.log(`listening on port ${port}`));
