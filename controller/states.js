const con = require("../connection/connection2")
const states = async(req,res)=>{
    let sql = 'select * from states';
    let result = await con.query(sql);
    result = result[0];
    let states = result
    res.render("dynamic_city/states",{states})
}

const setcity = async (req,res)=>{
    let stateid = req.query.state;
    let sql = `select cityname from city where sid = ${stateid}`;
    let result = await con.query(sql);
    let city = result[0];
    res.send({
        cities:city,
    })
}

module.exports = {states,setcity}