var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const apiSheltersRouter = require('./routes/api-shelters');
const imageRouter = require('./routes/image');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/uploads', express.static('uploads'));
app.use(cors());


app.use('/api/v1/shelters', apiSheltersRouter);
app.use('/api/v1/images', imageRouter);

module.exports = app;
