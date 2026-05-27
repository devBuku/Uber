const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Healthy" });
});

app.use("/api/user", userRouter);

module.exports = app;
