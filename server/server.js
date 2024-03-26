require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const userRouter = require('./routes/user.router');
const gameRouter = require('./routes/game.router');

const app = express();
const { PORT, CLIENT_PORT, SECRET_KEY_SESSION } = process.env;

const sessionConfig = {
  name: 'cookiesGame',
  store: new FileStore(),
  secret: SECRET_KEY_SESSION ?? 'Game',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 1000 * 60 * 60,
    httpOnly: true,
  },
};
const corsConfig = {
  credentials: true,
  origin: [`http://localhost:${CLIENT_PORT ?? 5173}`],
  optionsSuccesStatus: 200,
};

app.use(cors(corsConfig));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRouter);
app.use('/api/games', gameRouter);

app.listen(PORT, () => console.log(`Server has started on  http://localhost:${PORT}`));
