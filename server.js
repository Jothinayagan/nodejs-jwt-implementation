const express = require('express');
const app = express();
const env = require("dotenv");
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const route = require('./routes');

// Establish DB connection
// mongoose.connect('', )

// route
app.use('/', route);

app.listen(PORT, () => console.log(`Server up @ http://localhost:${PORT}`));