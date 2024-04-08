const rs = require('randomstring');
const md5 = require('md5');
const con = require("../connection/connection2")

const regenerate = async (req,res)=>{
    let Id = req.query.id;
        let activationlink = rs.generate(12);
        let sql = `update register set activationlink = '${activationlink}', activationtime = CURRENT_TIMESTAMP where id = ${Id}`;
        let result = await con.query(sql);
        res.json({
            message:"successfully regenerated", 
            id:Id,
            code:1,
            activationlink:activationlink,
        });
}


module.exports = {regenerate};