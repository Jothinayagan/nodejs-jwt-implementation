const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const route = require('./routes');
const { authUser } = require('./script');

dotenv.config();
const PORT = process.env.PORT;

// Establish DB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connect to DB!"));

// middlewares
app.use(express.json());

// route
app.use('/auth', route);
app.use('/api', authUser, route);

app.listen(PORT, () => console.log(`Server up @ http://localhost:${PORT}`));