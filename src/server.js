const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const PORT = process.env.PORT || 8000;

mongoose.connection.once("open", () => {
    console.log("MongoDb connection is ready!")
});

mongoose.connection.on('error', (err) => {
    console.error(err)
});

const server = http.createServer(app);

async function startServer(){
    try {
        await mongoose.connect(process.env.MONGO_API, {
            tlsAllowInvalidCertificates: true
        });

        server.listen(PORT, '0.0.0.0' ,() => console.log("Server is running!", PORT));
    } catch (err) {
        console.error("Server start error:", err);
        process.exit(1);
    }
}

startServer();