const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");
const captainRouter = require("./routes/captain.route");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (_req, res) {
    res.send("Hello Friend");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/captain", captainRouter);

module.exports = app;
