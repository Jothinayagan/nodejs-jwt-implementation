const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const route = require('./routes');
const { authUser } = require('./script');

// introducing cluster module to utilize all CPU cores
const cluster = require('cluster');
const CPU = require('os').cpus().length;

dotenv.config();
const PORT = process.env.PORT;

// Establish DB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connected to DB!"));

mongoose.connection.on('error', () => console.log("Error in DB connection!"))

if (cluster.isMaster) {
    for (let i = 0; i < CPU; i++) {
        cluster.fork();
    }

    // Listening workers in action
    cluster.on('online', (worker) => console.log(`Worker ${worker.process.pid} is online.`));
    // Listening if any worker is dead
    cluster.on('exit', (worker) => console.log(`Worker ${worker.process.pid} died.`));
} else {

    // middlewares
    app.use(express.json());

    // route
    app.use('/auth', route);
    app.use('/api', authUser, route);
    console.log(`Worker ${cluster.worker.id} is in action.`)
    app.listen(PORT, () => console.log(`Server up @ http://localhost:${PORT}`));
}