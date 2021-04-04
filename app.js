const express = require("express");
const router = require("./routes/routes");
const hbs = require("express-handlebars").create({});
const app = express();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json({ extended: true }));

app.use("/api/v1", router());

module.exports = app;
