const express = require('express');
let moment = require('moment');
let shortDateFormat = "YYYY/MM/DD";
require('dotenv').config();
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
app.listen(port);
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.locals.moment = moment; 
app.locals.shortDateFormat = shortDateFormat;
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
const rts = require('./router.js')

app.use("/",rts)