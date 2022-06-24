require("dotenv").config();
require("./config/database").connect();
const express = require("express");


//Routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)

module.exports = app;