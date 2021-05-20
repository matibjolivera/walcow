const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const bodyParser = require("body-parser");
// App config
const app = express();
const port = process.env.PORT || 4000;
const connection_url = "";
//Middlewares
app.use(express.json());
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//db config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
//Api end points
app.get("/", (req, res) => res.status(200).send("Hello Cow Boys"));
//Listeners
app.listen(port, () => console.log(`listening on port ${port}`));
