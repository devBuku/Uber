const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    res.send("Hello Friend");
});

app.use("/api/v1/user", userRouter);

module.exports = app;
