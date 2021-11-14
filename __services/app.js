const express = require("express");
const app = express();
const cors = require("cors");
const routePayment = require("../___routes/routePayment");
const routeOrder = require("../___routes/routeOrder");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/payment", routePayment);
app.use("/order", routeOrder);

//Default routes
app.get("/", async (req, res) => {
  res.send(`<h1>Its online!!!</h1>`);
});

app.get("/favicon.ico", async (req, res) => {
  res.redirect("/");
});

module.exports = app;
