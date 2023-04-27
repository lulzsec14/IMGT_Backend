// const path = require('path')
// require('dotenv').config({ path: './config.env' });
const express = require('express');
const config = require('config');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./Db/db');
const log = require('./Utils/Logger');
const compression = require('compression');
const { adminRouter, userRouter } = require('./routes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const path = require('path');

const corsOptionsDelegate = require('./Utils/cors');

connectDB();

const app = express();

const store = mongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  autoRemove: 'native',
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
      sameSite: 'none',
    },
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use('/api/admin', adminRouter);

app.get('/', () => {
  res.send('Hello There');
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

module.exports = app;
// process.on('unhandledRejection', (err, promise) => {
//   log.info(`Error occured!: ${err}`.red.bold);
//   server.close(() => process.exit());
// });
