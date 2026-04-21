const dotenv = require("dotenv");
dotenv.config({ quiet: true });
const app = require("./app.js");
const connectToDb = require("./config/db.js");

const port = process.env.PORT;

async function startServer() {
  try {
    await connectToDb();
    app.listen(port, function () {
      console.log(`App is listening to port: ${port}`);
    });
  } catch (error) {
    console.log(`Error in connecting to DB: ${error}`);
    process.exit(1);
  }
}

startServer();
