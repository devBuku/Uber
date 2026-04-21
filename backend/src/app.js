const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

app.get("/", function (req, res) {
  res.status(200).json({ status: "Healthy!" });
});

module.exports = app;
