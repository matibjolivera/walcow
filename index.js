const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// App config
const app = express();
const port = process.env.PORT || 4000;
const connection_url = process.env.DATABASE;

//Middlewares
app.use(express.json());
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

console.log("CONEXIÓN URL: " + connection_url);

mongoose.connect(connection_url, {useNewUrlParser: true})
    .then(() => console.log("Conexión OK"))
    .catch(e => console.error(e));

//Api end points
app.get("/", (req, res) => res.status(200).send("Hello Cow Boys"));

//Listeners
app.listen(port, () => console.log(`listening on port ${port}`));
