const express = require("express");
const router = require("./routes/routes");
const hbs = require("express-handlebars").create({});
const app = express();

const host = process.env.HOST || "0.0.0.0";

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json({ extended: true }));

app.use("/api/v1", host, router());

module.exports = app;
