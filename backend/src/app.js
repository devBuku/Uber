const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");
const captainRouter = require("./routes/captain.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Healthy" });
});

app.use("/api/user", userRouter);
app.use("/api/captain", captainRouter);

module.exports = app;
