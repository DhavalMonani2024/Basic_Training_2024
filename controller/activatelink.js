const con = require("../connection/connection2")
const md5 = require('md5');
const activateLink = async (req,res)=>
{
    console.log("Hek")
    let id = req.query.Id;
    let sql = `select activationtime from register where id = ${id}`;
    let result = await con.query(sql);
    result = result[0];
    let activatetime = new Date(result[0].activationtime);
    let currenttime = new Date();
    let difference = parseInt((currenttime - activatetime)/(1000*60))
    if(difference > 1)
    {
        res.render("register/regenerate")
    }
    else
    {
        res.render("register/active")
    }
}

const activatedLink = async (req,res)=>
{
    let data = req.body;
    let id = req.query.Id;
    let password = data.password;
    let confirmpassword = data.confirmpassword
    if(password == confirmpassword)
    {
            let sql = `select salt from register where id = ${id}`;
            let result = await con.query(sql)
            result = result[0];
            let salt = result[0].salt;
            let ep = password+salt
            let pw = md5(ep);
            let sql1 = `update register set password = '${pw}',status = 'active' where id = ${id}`;
            let result1 = await con.query(sql1);
            res.send({
                code:1,
                alert:'Password Set successfully'
            })
    }
}


module.exports = {activateLink,activatedLink};