const con = require("../connection/connection2")
let Id = 1;
const result = async (req,res)=>{
    let sql1 = "select student_master1.id,concat(student_master1.firstname,' ',student_master1.lastname) as Name,sum(practical_obtain) as finalpractical,sum(final_obtain) as finaltheory from student_master1 inner join result_master where examtype = 1 AND student_master1.id = result_master.studentid GROUP BY student_master1.id LIMIT 10;"
    let sql2 = "select sum(practical_obtain) as preliminarypractical,sum(final_obtain) as preliminarytheory from result_master where examtype = 2 GROUP BY studentid LIMIT 10";
    let sql3 = "select sum(practical_obtain) as terminalpractical,sum(final_obtain) as terminaltheory from result_master where examtype = 3 GROUP BY studentid LIMIT 10";
    let sql4 = "select studentid,sum(practical_obtain)+sum(final_obtain) as obtainmarks,sum(practical_total)+sum(final_total) as totalmarks from result_master group by studentid LIMIT 10";
    let d =  await con.query(sql1);
    let d2 = await con.query(sql2);
    let d3 = await con.query(sql3);
    let d4 = await con.query(sql4);
    let data = d[0];
    let data2 = d2[0];
    let data3 = d3[0];
    let data4 = d4[0];
    res.render("data_pagination/result",{Id,data,data2,data3,data4});
    
}

const first = async (req,res)=>{
    let sql1 = "select student_master1.id,concat(student_master1.firstname,' ',student_master1.lastname) as Name,sum(practical_obtain) as finalpractical,sum(final_obtain) as finaltheory from student_master1 inner join result_master where examtype = 1 AND student_master1.id = result_master.studentid GROUP BY student_master1.id LIMIT 10;"
    let sql2 = "select sum(practical_obtain) as preliminarypractical,sum(final_obtain) as preliminarytheory from result_master where examtype = 2 GROUP BY studentid LIMIT 10";
    let sql3 = "select sum(practical_obtain) as terminalpractical,sum(final_obtain) as terminaltheory from result_master where examtype = 3 GROUP BY studentid LIMIT 10";
    let sql4 = "select studentid,sum(practical_obtain)+sum(final_obtain) as obtainmarks,sum(practical_total)+sum(final_total) as totalmarks from result_master group by studentid LIMIT 10";
    let d = await con.query(sql1);
    let d2 = await con.query(sql2);
    let d3 = await con.query(sql3);
    let d4 = await con.query(sql4);
    let data = d[0];
    let data2 = d2[0];
    let data3 = d3[0];
    let data4 = d4[0];
    Id = 1;
    res.render("data_pagination/result",{Id,data,data2,data3,data4});
}

const last = async (req,res)=>{
    let sql1 = "select student_master1.id,concat(student_master1.firstname,' ',student_master1.lastname) as Name,sum(practical_obtain) as finalpractical,sum(final_obtain) as finaltheory from student_master1 inner join result_master where examtype = 1 AND student_master1.id = result_master.studentid GROUP BY student_master1.id LIMIT 10 OFFSET 290";
    let sql2 = "select sum(practical_obtain) as preliminarypractical,sum(final_obtain) as preliminarytheory from result_master where examtype = 2 GROUP BY studentid LIMIT 10 OFFSET 290";
    let sql3 = "select sum(practical_obtain) as terminalpractical,sum(final_obtain) as terminaltheory from result_master where examtype = 3 GROUP BY studentid LIMIT 10 OFFSET 290";
    let sql4 = "select studentid,sum(practical_obtain)+sum(final_obtain) as obtainmarks,sum(practical_total)+sum(final_total) as totalmarks from result_master group by studentid LIMIT 10 OFFSET 290";
    let d = await con.query(sql1);
    let d2 = await con.query(sql2);
    let d3 = await con.query(sql3);
    let d4 = await con.query(sql4);
    let data = d[0];
    let data2 = d2[0];
    let data3 = d3[0];
    let data4 = d4[0];
    Id = 30;
    res.render("data_pagination/result",{Id,data,data2,data3,data4});
}

const next = async (req,res)=>{
    let Id = req.params.Id;
    let sql1 = `select student_master1.id,concat(student_master1.firstname,' ',student_master1.lastname) as Name,sum(practical_obtain) as finalpractical,sum(final_obtain) as finaltheory from student_master1 inner join result_master where examtype = 1 AND student_master1.id = result_master.studentid GROUP BY student_master1.id LIMIT 10 OFFSET ${10 * Id}`;
    let sql2 = `select sum(practical_obtain) as preliminarypractical,sum(final_obtain) as preliminarytheory from result_master where examtype = 2 GROUP BY studentid LIMIT 10 OFFSET ${10 * Id}`;
    let sql3 = `select sum(practical_obtain) as terminalpractical,sum(final_obtain) as terminaltheory from result_master where examtype = 3 GROUP BY studentid LIMIT 10 OFFSET ${10 * Id}`;
    let sql4 = `select studentid,sum(practical_obtain)+sum(final_obtain) as obtainmarks,sum(practical_total)+sum(final_total) as totalmarks from result_master group by studentid LIMIT 10 OFFSET ${10 * Id}`;
    Id++;
    let d = await con.query(sql1);
    let d2 = await con.query(sql2);
    let d3 = await con.query(sql3);
    let d4 = await con.query(sql4);
    let data = d[0];
    let data2 = d2[0];
    let data3 = d3[0];
    let data4 = d4[0];
    res.render("data_pagination/result",{Id,data,data2,data3,data4});
}

const prev = async (req,res)=>{
    let Id = req.params.Id;
    let pid = Id - 2;
    Id--;
    let sql1 = `select student_master1.id,concat(student_master1.firstname,' ',student_master1.lastname) as Name,sum(practical_obtain) as finalpractical,sum(final_obtain) as finaltheory from student_master1 inner join result_master where examtype = 1 AND student_master1.id = result_master.studentid GROUP BY student_master1.id LIMIT 10 OFFSET ${10 * pid}`;
    let sql2 = `select sum(practical_obtain) as preliminarypractical,sum(final_obtain) as preliminarytheory from result_master where examtype = 2 GROUP BY studentid LIMIT 10 OFFSET ${10 * pid}`;
    let sql3 = `select sum(practical_obtain) as terminalpractical,sum(final_obtain) as terminaltheory from result_master where examtype = 3 GROUP BY studentid LIMIT 10 OFFSET ${10 * pid}`;
    let sql4 = `select studentid,sum(practical_obtain)+sum(final_obtain) as obtainmarks,sum(practical_total)+sum(final_total) as totalmarks from result_master group by studentid LIMIT 10 OFFSET ${10 * pid}`;
    let d = await con.query(sql1);
    let d2 = await con.query(sql2);
    let d3 = await con.query(sql3);
    let d4 = await con.query(sql4);
    let data = d[0];
    let data2 = d2[0];
    let data3 = d3[0];
    let data4 = d4[0];
    res.render("data_pagination/result",{Id,data,data2,data3,data4});
}


const fullresult = async (req,res)=>{
    let Id = req.params.Id;
    let sq = `select concat(student_master1.firstname,' ',student_master1.lastname) as name from student_master1 where id = ${Id}`;
    let sql = `select subject_master.subjectname,(select practical_obtain from result_master where result_master.subjectid = subject_master.subjectid AND examtype = 1 AND studentid = ${Id}) as 'finalpractical',(select final_obtain from result_master where result_master.subjectid = subject_master.subjectid AND examtype = 1 AND studentid = ${Id}) as 'finaltheory',(select practical_obtain from result_master where result_master.subjectid = subject_master.subjectid AND examtype = 2 AND studentid = ${Id}) as 'preliminarypractical',(select final_obtain from result_master where result_master.subjectid = subject_master.subjectid AND examtype = 2 AND studentid = ${Id}) as 'preliminarytheory',(select practical_obtain from result_master where result_master.subjectid = subject_master.subjectid AND examtype = 3 AND studentid = ${Id}) as 'Terminalpractical',(select final_obtain from result_master where result_master.subjectid = subject_master.subjectid AND examtype = 3 AND studentid = ${Id}) as 'Terminaltheory' FROM result_master inner join subject_master on result_master.subjectid = subject_master.subjectid where result_master.studentid = ${Id} group by result_master.subjectid`;
    let sql2 = `select (select concat(ceiling((count(attendance_master.status)/31)*100),'%') FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND student_master1.id = ${Id} AND attendance_master.status = 'P' AND attendance_master.day between '2023-12-01' AND '2023-12-31' GROUP BY attendance_master.id order by student_master1.id) as 'DecemberAttendance',
    (select concat(ceiling((count(attendance_master.status)/31)*100),'%') FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND student_master1.id = ${Id} AND attendance_master.status = 'P' AND attendance_master.day between '2024-01-01' AND '2024-01-31' GROUP BY attendance_master.id order by student_master1.id) as 'JanuaryAttendance',
    (select concat(ceiling((count(attendance_master.status)/29)*100),'%') FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND student_master1.id = ${Id} AND attendance_master.status = 'P' AND attendance_master.day between '2024-02-01' AND '2024-02-29' GROUP BY attendance_master.id order by student_master1.id) as 'FebruaryAttendance' FROM attendance_master WHERE id = ${Id} group by id;
    `;

    let sql3 = `select sum(practical_obtain)+sum(final_obtain) as obtainmarks,sum(practical_total)+sum(final_total) as totalmarks,concat(ceiling(((sum(practical_obtain)+sum(final_obtain))/(sum(practical_total)+sum(final_total)))*100),'%') as percentage from result_master where studentid = ${Id};`;
    let n = await con.query(sq);
    let nm = await con.query(sql);
    let nm2 = await con.query(sql2);
    let nm3 = await con.query(sql3);
    let data = nm[0];
    let data2 = nm2[0]; 
    let data3 = nm3[0];
    let name = n[0];
    res.render("data_pagination/fullresult",{name,data,data2,data3});
}


module.exports = {result,first,last,next,prev,fullresult}