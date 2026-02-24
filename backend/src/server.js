require("dotenv").config({ quiet: true });

const app = require("./app");
const http = require("http");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

try {
    function startServer() {
        server.listen(PORT, function () {
            console.log(`Server is listening on port: ${PORT}`);
        });
    }
} catch (error) {
    console.error("Error in running the server: ", error);
}

startServer();
