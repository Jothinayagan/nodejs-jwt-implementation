const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const route = require('./routes');

dotenv.config();
const PORT = process.env.PORT;

// Establish DB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connect to DB!"));

// middlewares
app.use(express.json());

// route
app.use('/api', route);

app.listen(PORT, () => console.log(`Server up @ http://localhost:${PORT}`));