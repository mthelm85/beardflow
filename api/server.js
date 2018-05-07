const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const serveStatic = require('serve-static')

const configDB = require('./config/db');
const port = process.env.PORT || 3000;
const app = express();
const secret = require('./config/secret');
const User = require('./config/models/user.js');

mongoose.connect(configDB.url);

app.use(logger('dev'));
app.use(cookieParser());
app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
  credentials: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: secret.secret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(serveStatic("../client/dist"));

require('./config/passport')(passport, User);
require('./routes/routes.js')(app, passport, User);

app.listen(port, () => {
  console.log(`The server is up on port ${port}`);
});
