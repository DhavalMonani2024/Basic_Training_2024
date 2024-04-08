const rs = require('randomstring');
const md5 = require('md5');
const con = require("../connection/connection2")
require('dotenv').config();
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

const forgotpasswordform = (req,res)=>{
    res.render("register/forgotpassword")
}

const setnewpassword = async(req,res)=>{
    let data = req.body;
    let email = data.email;
    let sql = `select id,email from register where email = '${email}'`;
    let result = await con.query(sql);
    result = result[0]
    if(result.length == 0)
    {
        res.send({
            alert:"User does not exists please check email"
        })
    
    }
    else
    {
        let Id = result[0].id
        let activationlink = rs.generate(12);
        let sql1 = `update register set activationlink = '${activationlink}', activationtime = CURRENT_TIMESTAMP where id = ${Id}`;
        let result1 = await con.query(sql1);
        res.json({
            message:"successfully regenerated", 
            id:Id,
            code:1,
            activationlink:activationlink,
        });     
    }
}

module.exports = {forgotpasswordform,setnewpassword}