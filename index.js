// require('dotenv').config({ path: './config.env' });
// const express = require('express');
// const config = require('config');
// const colors = require('colors');
// const cors = require('cors');
// const connectDB = require('./Db/db');
// const log = require('./Utils/Logger');
// const compression = require('compression');
// const { adminRouter, userRouter } = require('./routes');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const mongoStore = require('connect-mongo');
// const path = require('path');

import express from "express";
// import config from "config";
import colors from "colors";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./Db/db.js";
import log from "./Utils/Logger.js";
import { adminRouter } from "./routes/index.js";

dotenv.config({ path: "./config.env" });

// const corsOptionsDelegate = require('./Utils/cors');
import { corsOptionsDelegate } from "./Utils/cors.js";

connectDB();

const app = express();

const store = mongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  autoRemove: "native",
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});

app.use(compression());
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(cookieParser());

// app.set('trust proxy', 1);
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: {
      // httpOnly: true,
      // secure: true,
      maxAge: 86400000,
      sameSite: "none",
    },
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello There");
});

// var PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () =>
//   log.info(`Server running on ${PORT}`.bold)
// );

app.listen(5000, () => {
  console.log(`Server running on ${5000}`);
});

// if (process.env.NODE_ENV === 'production') {
//   PORT = process.env.PORT;
//   console.log(`env is prod: ${PORT}`);
//   app.use(express.static('client/build'));
//   console.log('Here');

//   // console.log(path.resolve(__dirname, "client", "build", "index.html"));
//   app.get('*', (req, res) => {
//     console.log('req: ', req.url);
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

export { app };
// module.exports = app;
// process.on('unhandledRejection', (err, promise) => {
//   log.info(`Error occured!: ${err}`.red.bold);
//   server.close(() => process.exit());
// });
