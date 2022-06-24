require("dotenv").config();
require("./config/database").connect();
const express = require("express");


//Routes
const authRouter = require('./routes/auth');
const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

module.exports = app;