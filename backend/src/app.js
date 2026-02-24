const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    res.send("Hello Friend");
});

module.exports = app;
