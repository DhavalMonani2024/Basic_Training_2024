const con = require("../connection/connection2")
let Id = 1;
async function totaldata()
{
        let sql1 = "select * from student_master";
        let result1 = await con.query(sql1);
        let maxpage = result1[0].length
        return maxpage;
        
}
const alldata = async (req,res)=>{
        let maxpage = await totaldata();
        let sql = "select * from student_master LIMIT 15";
        let result = await con.query(sql);
        result = result[0];
        res.render("data_pagination/data",{Id,result,maxpage})
}

const next = async(req,res)=>{
        let Id = req.params.Id;
        let maxpage = await totaldata();
        let sql = `select * from student_master LIMIT 15 OFFSET ${Id * 15}`;
        Id++;
        let result = await con.query(sql)
        result = result[0]
        res.render("data_pagination/data",{Id,result,maxpage})
}

const prev = async (req,res)=>{
    let Id = req.params.Id;
    let maxpage = await totaldata();
    let pid = Id - 2;
    --Id;
    let sql = `select * from student_master LIMIT 15 OFFSET ${pid * 15}`;
    let result = await con.query(sql)
    result = result[0]    
    res.render("data_pagination/data",{Id,result,maxpage})
}

const first = async (req,res)=>{
    let maxpage = await totaldata();
    let sql = `select * from student_master LIMIT 15`;
    Id = 1;
    let result = await con.query(sql)
    result = result[0]    
    res.render("data_pagination/data",{Id,result,maxpage})
}

const last = async (req,res)=>{
        let maxpage = await totaldata();
        console.log(maxpage)
        Id = maxpage
        let sql = `select * from student_master LIMIT 15 OFFSET ${maxpage-15}`;
        let result = await con.query(sql)
        result = result[0]
        res.render("data_pagination/data",{Id,result,maxpage})
}


module.exports = {alldata,next,prev,first,last}