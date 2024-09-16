const express = require('express');
const path = require('path');
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

require("dotenv").config();

app.use(router);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});