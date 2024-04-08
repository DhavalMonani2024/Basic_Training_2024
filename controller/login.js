const rs = require('randomstring');
const md5 = require('md5');
const con = require("../connection/connection2")
require('dotenv').config();
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');


const loginform = (req,res)=>{
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

const loginprocess = async(req,res)=>{
    let data = req.body;
   let username = data.username;
   let password = data.password;
   let sql = `select email,salt from register where email = '${username}'`;
    let result = await con.query(sql);
    result = result[0];
    if(result.length == 0)
    {
        res.send({
            alert:"User does not exists"
        })
    }
    else
    {
        let salt = result[0].salt;
        let ep = password+salt;
        let pw = md5(ep);
        let sql1 = `select email,password from register where email = '${username}' AND password = '${pw}'`;
        let result1 = await con.query(sql1);
        result1 = result1[0];
        if(result1.length == 0 || result1 == undefined)
        {
            res.send({
                alert:"Username or password incorrect please try again"
            })  
        }
        else
        {
            let u = result1[0].email;
            let p = result1[0].password;
            if(u == username && p == pw)
            {
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                let data = {
                    user : username
                }
                const token = jwt.sign(data, jwtSecretKey);

                res.cookie('token',token,{maxAge: 100000});
                res.send({
                    alert:'login successfully...',  
                    code  :1,
                })
            }
            else
            {
                res.send({
                    alert:"Error Occured"
                })  
            }
        }
    }
}

module.exports = {loginform,loginprocess}