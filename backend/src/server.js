const app = require("./app");
const connectToDb = require("./config/db");
const http = require("http");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

async function startServer() {
    try {
        await connectToDb();
        server.listen(PORT, function () {
            console.log(`Server is listening on port: ${PORT}`);
        });
    } catch (error) {
        console.error("Error in running the server: ", error);
    }
}

startServer();
