const express = require('express');
let app = express();
const cors = require('cors');
const mailRoute = require('./routes/mail');

app.use(cors());
app.options('*', cors());

app.use('/', mailRoute);


app.listen(4000);

module.exports = app;