const dotenv = require("dotenv");
dotenv.config({ quiet: true });

const http = require("http");

const app = require("./app.js");
const { PORT, NODE_ENV } = require("./constants/env.js");
const connectToDb = require("./config/db.js");

const server = http.createServer(app);

const port = PORT;

server.listen(port, async () => {
  await connectToDb();
  console.log(`Server is listening on port ${port} in ${NODE_ENV} mode.`);
});
