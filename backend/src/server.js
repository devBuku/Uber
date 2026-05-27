const dotenv = require("dotenv");
dotenv.config({ quiet: true });

const http = require("http");
const app = require("./app.js");

const { PORT, NODE_ENV } = require("./constants/env.js");

const server = http.createServer(app);

const port = PORT;

server.listen(port, () => {
  console.log(`Server is listening on port ${port} in ${NODE_ENV} mode.`);
});
