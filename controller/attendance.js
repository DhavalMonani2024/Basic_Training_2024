const con = require("../connection/connection2")
let Id = 1;
const attendance = async (req,res)=>{
    let dt = 'Dec 2023';
    let total = 31;
    let start = '2023-12-01';
    let end = '2023-12-31';
    let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
     let result1 = await con.query(sql);
     result = result1[0];
     res.render("data_pagination/attendance",{Id,result,dt})
}
const allattendance = async(req,res)=>{
    let month = Number(req.body.month);
    if(month === 1)
    {
        let dt = 'Dec 2023';
        let start = '2023-12-01';
        let end = '2023-12-31';
        let total = 31;
        let Id = 1; 
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(month === 2)
    {
        let dt = 'Jan 2024';
        let start = '2024-01-01';
        let end = '2024-01-31';
        let total = 31;
        Id=1;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(month === 3)
    {
        let dt = 'Feb 2024';
        let start = '2024-02-01';
        let end = '2024-02-29';
        let total = 29;
        Id=1;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
}

const next = async (req,res)=>{
    let dt = req.params.dt;
    let Id = req.params.Id;
    if(dt === 'Dec 2023')
    {
        let start = '2023-12-01';
        let end = '2023-12-31';
        let total = 31;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET ${Id * 10}`;
        Id++;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Jan 2024')
    {
        let start = '2024-01-01';
        let end = '2024-01-31';
        let total = 31;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET ${Id * 10}`;
        Id++;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Feb 2024')
    {
        let start = '2024-02-01';
        let end = '2024-02-27';
        let total = 27;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET ${Id * 10}`;
        Id++;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
}

const prev = async (req,res)=>{
    let dt = req.params.dt;
    let Id = req.params.Id;
    if(dt === 'Dec 2023')
    {
        let start = '2023-12-01';
        let end = '2023-12-31';
        let total = 31;
        let pid = Id - 2;
        Id--;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET ${pid * 10}`;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Jan 2024')
    {
        let start = '2024-01-01';
        let end = '2024-01-31';
        let total = 31;
        let pid = Id - 2;
        Id--;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET ${pid * 10}`;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Feb 2024')
    {
        let start = '2024-02-01';
        let end = '2024-02-27';
        let total = 27;
        let pid = Id - 2;
        Id--;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET ${pid * 10}`;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    
}

const first = async (req,res)=>{
    let dt = req.params.dt;
    if(dt === 'Dec 2023')
    {
        let start = '2023-12-01';
        let end = '2023-12-31';
        let total = 31;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
        Id = 1;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Jan 2024')
    {
        let start = '2024-01-01';
        let end = '2024-01-31';
        let total = 31;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
        Id = 1;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Feb 2024')
    {
        let start = '2024-02-01';
        let end = '2024-02-27';
        let total = 27;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
        Id = 1;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    
}

const last = async (req,res)=>{
    let dt = req.params.dt;
    if(dt === 'Dec 2023')
    {
        let start = '2023-12-01';
        let end = '2023-12-31';
        let total = 31;
        Id = 30;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET 290`;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Jan 2024')
    {
        let start = '2024-01-01';
        let end = '2024-01-31';
        let total = 31;
        Id = 30;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET 290`;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Feb 2024')
    {
        let start = '2024-02-01';
        let end = '2024-02-29';
        let total = 29;
        Id = 30;
        let sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET 290`;
        let result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    
}

module.exports = {attendance,allattendance,next,prev,first,last};