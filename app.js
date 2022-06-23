var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/index');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// const formidable = require('express-formidable');
 
var app = express();

mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
  };
  app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(formidable());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
