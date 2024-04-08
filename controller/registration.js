const rs = require('randomstring');
const md5 = require('md5');
const con = require("../connection/connection2")
const registerform = async (req,res)=>{
    res.render("register/registration")
}
const register = async (req,res)=>
{
    let data = req.body;
    let salt = rs.generate(8);
    let activationlink = rs.generate(12);
    let firstname = data.firstname;
    let lastname = data.lastname;
    let email = data.email;
    let dob = data.dob;
    let sql1 = `select email from register where email = '${email}'`;
    let result = await con.query(sql1);
    result = result[0];
    if(result.length == 0)
    {
        let details = [firstname,lastname,email,dob,salt,activationlink]
        let sql = `insert into register(firstname,lastname,email,dob,salt,activationlink) VALUES(?)`;
        let result = await con.query(sql,[details]);
        let Id = result[0].insertId;
        res.json({
            id:Id,
            code:1,
            activationlink:activationlink,
        });
    }
    else
    {
        res.json({
            code:0,
            message:'user exists'
        });
    }
}


module.exports = {registerform,register};