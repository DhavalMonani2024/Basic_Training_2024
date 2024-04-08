const con = require("../connection/connection2")
let Id = 1;
let maxdata;

async function totaldata()
{
        let sql1 = "select * from student_master";
        let result1 = await con.query(sql1);
        maxdata = result1[0].length
        let maxpage = Math.ceil(maxdata/15);
        return maxpage;
        
}
const order = async (req,res)=>{
        let Id = 1;
        let maxpage = await totaldata();
        let cols = Id;
        let hr = 'asc';
        let sql = "select * from student_master LIMIT 15";
        let result = await con.query(sql)
        result = result[0]    
        res.render("data_pagination/order",{Id,result,cols,hr,maxpage})
}

const orderby = async (req,res)=>{
    let maxpage = await totaldata();
    Id = 1;
    let cols = req.body.orderby;
    let hr = req.body.hr;
    let sql = `select * from student_master ORDER BY ${cols} ${hr} LIMIT 15`;
    let result = await con.query(sql)
    result = result[0]
    res.render("data_pagination/order",{Id,result,cols,hr,maxpage})
}

const next = async (req,res)=>{
    let maxpage = await totaldata();
    let Id = req.params.Id;
    let cols = req.params.cols;
    let hr = req.params.hr;
    let sql = `select * from student_master ORDER BY ${cols} ${hr} LIMIT 15 OFFSET ${Id * 15}`;
    Id++;
    let result = await con.query(sql)
    result = result[0]
    res.render("data_pagination/order",{Id,result,cols,hr,maxpage})
}

const prev = async(req,res)=>{
    let maxpage = await totaldata();
    let Id = req.params.Id;
    let cols = req.params.cols;
    let hr = req.params.hr;
    let pid = Id-2;
    Id--;
    let sql = `select * from student_master ORDER BY ${cols} ${hr} LIMIT 15 OFFSET ${pid * 15}`;
    let result = await con.query(sql)
    result = result[0]    
    res.render("data_pagination/order",{Id,result,cols,hr,maxpage})
}

const first = async (req,res)=>{
    let maxpage = await totaldata();
    let cols = req.params.cols;
    let hr = req.params.hr;
    let sql = `select * from student_master ORDER BY ${cols} ${hr} LIMIT 15`;
    Id = 1;
    let result = await con.query(sql)
    result = result[0]
    res.render("data_pagination/order",{Id,result,cols,hr,maxpage})
}

const last = async (req,res)=>{
    let maxpage = await totaldata();
    let cols = req.params.cols;
    let hr = req.params.hr;
    Id = maxpage;
    let sql = `select * from student_master ORDER BY ${cols} ${hr} LIMIT 15 OFFSET ${maxdata-15}`;
    let result = await con.query(sql)
    result = result[0]
    res.render("data_pagination/order",{Id,result,cols,hr,maxpage})
}


module.exports = {order,orderby,next,prev,first,last}