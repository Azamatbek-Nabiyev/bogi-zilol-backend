const dotenv = require('dotenv');
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = 8000
dotenv.config();
mongoose.connection.once("open", () => {
    console.log("MongoDb connection is ready!")
})

mongoose.connection.on('error', (err) => {
    console.error(err)
});

const server = http.createServer(app);

async function startServer(){
    await mongoose.connect(process.env.MONGO_API, {
        tlsAllowInvalidCertificates: true
    });

    server.listen(PORT, () => console.log("Server is running!", PORT))
}

startServer();