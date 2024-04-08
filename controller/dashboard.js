const rs = require('randomstring');
const md5 = require('md5');
const con = require("../connection/connection2")
require('dotenv').config();
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const loaddashboard = (req,res)=>{
    let token = req.cookies.token;
            if(token){
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                let verfiy = jwt.verify(token,jwtSecretKey);
                res.render("register/front");
            }
            else
            {
                res.render("register/login")
            }
}

module.exports = {loaddashboard}