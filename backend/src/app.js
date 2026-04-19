const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", function (req, res) {
  res.status(200).json({ status: "Healthy!" });
});

module.exports = app;
