const con = require("../connection/connection2")
const dq1 = (req,res)=>{
    res.render("dynamic_query/index");
}

const dq2 = (req,res)=>{
    res.render("dynamic_query/index")
 }

const dqdata = async(req,res)=>{
    try
    {
        let Id = 1;
        let sql = req.body.query;
        let sq = sql + ' LIMIT 10';
        let data = await con.query(sq);
        data = data[0];
        let max = data.length;
        let colnames = Object.keys(data[0]);
        sql = btoa(sql);
        res.render("dynamic_query/data",{Id,data,colnames,sql,max});
            }
    catch(err)
    {
        console.log(err)
        res.render("dynamic_query/errorhandle")
    }
}

   

const next = async(req,res)=>{
        
        try{
            let Id = req.params.Id;
            let sql = atob(req.params.sql);
            let sq = sql;
            sq = sq + ` LIMIT 10 OFFSET ${Id * 10}`;
            let data = await con.query(sq);
            data = data[0];
            let max = data.length;
            let colnames = Object.keys(data[0]);
            sql = btoa(sql);
            ++Id;
            
            res.render("dynamic_query/data",{Id,data,colnames,sql,max});
        }
        catch(err)
        {
            res.render("dynamic_query/errorhandle");
        }
        
}

const prev = async(req,res)=>{
    
    try{
        let Id = req.params.Id;
        let pid = Id - 2;
        --Id;
        let sql = atob(req.params.sql);
        let sq = sql;
        sq = sq + ` LIMIT 10 OFFSET ${pid * 10}`;
        let data = await con.query(sq);
        data = data[0];
        let max = data.length;
        let colnames = Object.keys(data[0]);
        sql = btoa(sql);
        res.render("dynamic_query/data",{Id,data,colnames,sql,max});
    }
    catch(err)
    {
        res.render("dynamic_query/errorhandle");
    }
    
}

const first = async(req,res)=>{
    try{
        let Id = 1;
        let sql = atob(req.params.sql);
        let sq = sql + ` LIMIT 10`;
        let data = await con.query(sq);
        data = data[0];
        let max = data.length;
        let colnames = Object.keys(data[0]);
        sql = btoa(sql);
        res.render("dynamic_query/data",{Id,data,colnames,sql,max});
    }
    catch(err)
    {
        res.render("dynamic_query/errorhandle");
    }
    
}

const last = async(req,res)=>{
    
    try{
        let sql = atob(req.params.sql);
        let d = await con.query(sql);
        d = d[0];
        let max = d.length;
        let Id = max/10;
        let pid = Id - 1;
        let sq = sql + ` LIMIT 10 OFFSET ${pid * 10}`;
        let data = await con.query(sq);
        data = data[0];
        let colnames = Object.keys(data[0]);
        sql = btoa(sql);
        res.render("dynamic_query/data",{Id,data,colnames,sql,max});
    } 
    catch(err)
    {
        res.render("dynamic_query/errorhandle");
    }
    
}


module.exports = {dq1,dq2,dqdata,next,prev,first,last}