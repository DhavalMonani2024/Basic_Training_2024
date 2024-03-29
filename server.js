const express = require('express');
const mysql = require('mysql2');
const rs = require('randomstring');
const md5 = require('md5');
var moment = require('moment');
var shortDateFormat = "YYYY/MM/DD";
let Id = 1;
require('dotenv').config();
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
var con = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'Dev@123',
    database:'up',
}).promise();
const app = express();
const port = 3000;
app.listen(port);
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.locals.moment = moment; 
app.locals.shortDateFormat = shortDateFormat;
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());


app.get("/registration",(req,res)=>{
    res.render("register/registration")
})

app.post("/registration",async (req,res)=>{
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
    
})

app.get("/active",async (req,res)=>{
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
})

app.post("/active",async (req,res)=>{
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
    
})

app.get("/login",(req,res)=>{
    res.render("register/login")
})

app.post("/login",async (req,res)=>{
   let data = req.body;
   let username = data.username;
   let password = data.password;
   let sql = `select email,salt from register where email = '${username}'`;
    let result = await con.query(sql);
    result = result[0];
    if(result.length == 0)
    {
        res.send({
            alert:"User does not exists"
        })
    }
    else
    {
        let salt = result[0].salt;
        let ep = password+salt;
        let pw = md5(ep);
        let sql1 = `select email,password from register where email = '${username}' AND password = '${pw}'`;
        let result1 = await con.query(sql1);
        result1 = result1[0];
        if(result1.length == 0 || result1 == undefined)
        {
            res.send({
                alert:"Username or password incorrect please try again"
            })  
        }
        else
        {
            let u = result1[0].email;
            let p = result1[0].password;
            if(u == username && p == pw)
            {
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                let data = {
                    user : username
                }
                const token = jwt.sign(data, jwtSecretKey);

                res.cookie('token',token,{maxAge: 100000});
                res.send({
                    alert:'login successfully...',  
                    code  :1,
                })
            }
            else
            {
                res.send({
                    alert:"Error Occured"
                })  
            }
        }
    }
    

    
})

app.get("/front",(req,res)=>{
    var token = req.cookies.token;
        if(token){
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            var verfiy = jwt.verify(token,jwtSecretKey);
            res.render("register/front");
        }
    
})

app.get("/regenerate",(req,res)=>{
    res.render("register/regenerate")
})

app.post("/regenerate",async (req,res)=>{
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
})

app.get("/forgotpassword",(req,res)=>{
    res.render("register/forgotpassword")
})

app.post("/forgotpassword",async (req,res)=>{
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
})

app.get("/DynamicTable",(req,res)=>{
    res.render("html/DynamicTable")
})

app.get("/colortable",(req,res)=>{
    res.render("html/colortable");
})

app.get("/eventtable",(req,res)=>{
    res.render("html/eventtable")
})

app.get("/tic_tac_toe",(req,res)=>{
    res.render("html/tic_tac_toe")
})

app.get("/register",(req,res)=>{
    let basicdetails;
    let educationaldetails;
    let references;
    let preferences;
    let languages;
    let technologies;
    let experience;
    let message = "Welcome to Registration Form";
    res.render("form/register",{message,basicdetails,educationaldetails,references,preferences,languages,technologies,experience});
})


app.post("/register",async (req,res)=>{
    let data = req.body;
    let basicdetails;
    let educationaldetails;
    let references;
    let preferences;
    let languages;
    let technologies;
    let experience;
    //console.log(data);
    var sql = "INSERT INTO applicant(firstname,lastname,post,address1,address2,email,city,phone,state,gender,zipcode,relationship,dob) VALUES (?)";
    var values = [data.firstname,data.lastname,data.post,data.address1,data.address2,data.email,data.city,data.phonenumber,data.state,data.gender,data.zipcode,data.rs,data.dob];
    var result = await con.query(sql,[values]);
    let userid = result[0].insertId;
    let sscyear = Number(data.sscyear)
    let sscpercentage = Number(data.sscpercentage)
    let sscboard = data.sscboard
    let hscyear = Number(data.hscyear)
    let hscpercentage = Number(data.hscpercentage)
    let hscboard = data.hscboard
    let bachelorcourse = data.bachelorcourse
    let bachelorpassingyear = Number(data.bachelorpassingyear)
    let bacheloruniversity = data.bacheloruniversity
    let bachelorpercentage = Number(data.bachelorpercentage)
    let mastercourse = data.mastercourse;
    let masteruniversity = data.masteruniversity;
    let masterpassingyear = data.masterpassingyear;
    let masterpercentage = data.masterpercentage
    let sscdetails = [sscboard,sscyear,sscpercentage];
    let hscdetails = [hscboard,hscyear,hscpercentage];
    let bachelordetails = [bachelorcourse,bacheloruniversity,bachelorpassingyear,bachelorpercentage
        ];  
    let masterdetails = [mastercourse,masteruniversity,masterpassingyear,masterpercentage];
    const ad = [];
    let flag = 1;
    if(sscdetails[0] !== '')
    {
        for(var i=0;i<sscdetails.length;i++)
        {
            ad.push(sscdetails[i]);
        }
    }
    if(hscdetails[0] !== '')
    {
        for(var i=0;i<hscdetails.length;i++)
        {
            ad.push(hscdetails[i]);
        }
    }
    if(bachelordetails[0] !== '')
    {
        for(var i=0;i<bachelordetails.length;i++)
        {
            ad.push(bachelordetails[i]);
        }
    }
    if(masterdetails[0] !== '')
    {
        flag = 0;
        for(var i=0;i<masterdetails.length;i++)
        {
            ad.push(masterdetails[i]);
        }
    }
    ad.unshift(userid)
    if(flag == 1)
    {
            var sql = "INSERT INTO educational_details(id,ssc_board,ssc_year,ssc_percentage,hsc_board,hsc_year,hsc_percentage,bachelor_degree,bachelor_university,bachelor_year,bachelor_percentage) VALUES(?)";
            var values = ad;
            var result = await con.query(sql,[values]);
    }
    else
    {
        var sql = "INSERT INTO educational_details(id,ssc_board,ssc_year,ssc_percentage,hsc_board,hsc_year,hsc_percentage,bachelor_degree,bachelor_university,bachelor_year,bachelor_percentage,master_degree,master_university,master_year,master_percentage) VALUES(?)";
            var values = ad;
            var result = await con.query(sql,[values]);
    }
            
                if(data.hindi == 'hindi')
                {
                    var choice1 = 'n';
                    var choice2 = 'n';
                    var choice3 = 'n';
                    for(var i=0;i<data.hindican.length;i++)
                    {
                        if(data.hindican[i] == 'read'){choice1 = 'y';}
                        if(data.hindican[i] == 'write'){choice2 = 'y';}
                        if(data.hindican[i] == 'speak'){choice3 = 'y';}
                    }
                    var sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${userid},'hindi','${choice1}','${choice2}','${choice3}')`;
                    var result = await con.query(sql);
                }
                if(data.english == 'english')
                {
                    var choice1 = 'n';
                    var choice2 = 'n';
                    var choice3 = 'n';
                    for(var i=0;i<data.englishcan.length;i++)
                    {
                        if(data.englishcan[i] == 'read'){choice1 = 'y';}
                        if(data.englishcan[i] == 'write'){choice2 = 'y';}
                        if(data.englishcan[i] == 'speak'){choice3 = 'y';}
                    }
                    var sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${userid},'english','${choice1}','${choice2}','${choice3}')`;
                    var result = await con.query(sql);

                }
                if(data.gujarati == 'gujarati')
                {
                    var choice1 = 'n';
                    var choice2 = 'n';
                    var choice3 = 'n';
                    for(var i=0;i<data.gujaratican.length;i++)
                    {
                        if(data.gujaratican[i] == 'read'){choice1 = 'y';}
                        if(data.gujaratican[i] == 'write'){choice2 = 'y';}
                        if(data.gujaratican[i] == 'speak'){choice3 = 'y';}
                    }
                    var sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${userid},'gujarati','${choice1}','${choice2}','${choice3}')`;
                    var result = await con.query(sql);

                } 
                if(data.php == 'php')
                {   
                    if(data.php_level)
                    {
                        var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${userid},'php','${data.php_level[0]}')`;
                        var result = await con.query(sql);
                    }
                
                }
                if(data.mysql == 'mysql')
                {
                    if(data.mysql_level)
                    {
                        var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${userid},'mysql','${data.mysql_level[0]}')`;
                        var result = await con.query(sql);
                    }
                
                }
                if(data.laravel == 'laravel')
                { 
                    if(data.laravel_level)
                    {
                        var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${userid},'laravel','${data.laravel_level[0]}')`;
                        var result = await con.query(sql);    
                    }
                
                }
                if(data.oracle == 'oracle')
                {
                    if(data.oracle_level)
                    {
                        var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${userid},'oracle','${data.oracle_level[0]}')`;
                        var result = await con.query(sql);
                    }
                
                } 
                let cflag = 1;
                let companyname = [];
                let designation = [];
                let from = [];
                let to = [];
                for(var i=0;i<data.companyname.length;i++)
                {
                    if(data.companyname[i] !== '')
                    {
                        companyname.push(data.companyname[i]);
                    }
                    if(data.designation[i] != '')
                    {
                        designation.push(data.designation[i]);
                    }
                    if(data.from[i] != '')
                    {
                        from.push(data.from[i]);    
                    }
                    if(data.to[i] != '')
                    {
                        to.push(data.to[i]);
                    }
                }
                for(var i=0;i<companyname.length;i++)
                {
                    if(companyname[i] !== '')
                    {
                        if(designation[i] !== '' && from[i] !== '' && to[i] !== '')
                        {
                            var sql = `INSERT INTO experience(id,company_name,company_designation,from_date,to_date) VALUES(${userid},'${companyname[i]}','${designation[i]}','${from[i]}','${to[i]}')`;
                            var result = await con.query(sql);   
                        }
                    }
                }
                let contactname = [];
                let contactnumber = [];
                let contactrelation = [];
                for(var i=0;i<data.contactname.length;i++)
                {
                    if(data.contactname[i] != '')
                    {
                        contactname.push(data.contactname[i]);
                    }
                    if(data.contactnumber[i] != '')
                    {
                        contactnumber.push(data.contactnumber[i]);
                    }
                    if(data.relation[i] != '')
                    {
                        contactrelation.push(data.relation[i]);
                    }
                    
                }
                for(var i =0;i<contactname.length;i++)
                {
                    if(contactname[i] != '')
                    {
                        if(contactnumber != '' && contactrelation != '')
                        {
                            var sql = `INSERT INTO contact_reference(id,contact_name,contact_number,contact_relation) VALUES(${userid},'${contactname[i]}','${contactnumber[i]}','${contactrelation[i]}')`;
                            var result = await con.query(sql);
                        }
                    }
                }

                let prefered_location = data.location;
                let notice_period = data.noticeperiod;
                let current_ctc = data.currentctc;
                let expected_ctc = data.expectedctc;
                let department = data.department;
                let pr = [prefered_location,notice_period,current_ctc,expected_ctc,department]
                let prflag = 1;
                for(var i=0;i<pr.length;i++)
                {
                    if(pr[i] == '')
                    {
                        prflag = 0;
                        break;
                    }
                }
                if(prflag == 1)
                {
                    var sql = `INSERT INTO preferences(id,prefered_location,notice_period,expected_ctc,current_ctc,department) VALUES(${userid},'${prefered_location}','${notice_period}','${expected_ctc}','${current_ctc}','${department}')`;
                    var result = await con.query(sql);
                }
                
            
                let message = "Form Submitted Successfully";

             res.render("form/register",{message,basicdetails,educationaldetails,references,preferences,languages,technologies,experience});
    })

async function data(table,id)
{
    let sql = `select * from ${table} where id = ${id}`;
    let result = await con.query(sql);
    return result[0];
}
app.get("/update/:Id",async (req,res)=>{
    let id = req.params.Id;
    let basicdetails = await data('applicant',id);
    let educationaldetails = await data('educational_details',id);
    let experience = await data('experience',id);
    let languages = await data('languages',id);
    let technologies = await data('technologies',id);
    let references = await data('contact_reference',id);
    let preferences = await data('preferences',id);
    basicdetails = basicdetails[0];
    educationaldetails = educationaldetails[0]
    preferences = preferences[0]
    if(experience == undefined && references == undefined)
    {
        let message = "update details"
        res.render("form/register",{message,basicdetails,educationaldetails,languages,technologies,preferences});
    }
    else if(references == undefined)
    {
        let message = "update details"
        res.render("form/register",{message,basicdetails,educationaldetails,experience,languages,technologies,preferences});
    }
    else
    {
        let message = "update details"
        res.render("form/register",{message,basicdetails,educationaldetails,experience,languages,technologies,references,preferences});
    }
})

app.post("/update/:Id",async (req,res)=>{
    let data = req.body;
    let id = req.params.Id;
    // //console.log(data);
    var bd = {"firstname":data.firstname,"lastname":data.lastname,"post":data.post,"address1":data.address1,"address2":data.address2,"email":data.email,"city":data.city,"phone":data.phonenumber,"state":data.state,"gender":data.gender,"zipcode":data.zipcode,"relationship":data.rs,"dob":data.dob}
    var sql = `UPDATE applicant SET ? WHERE id = ${id}`;
    var result = await con.query(sql,[bd]);
    let sscyear = Number(data.sscyear)
    let sscpercentage = Number(data.sscpercentage)
    let sscboard = data.sscboard
    let hscyear = Number(data.hscyear)
    let hscpercentage = Number(data.hscpercentage)
    let hscboard = data.hscboard
    let bachelorcourse = data.bachelorcourse
    let bachelorpassingyear = Number(data.bachelorpassingyear)
    let bacheloruniversity = data.bacheloruniversity
    let bachelorpercentage = Number(data.bachelorpercentage)
    let mastercourse = data.mastercourse;
    let masteruniversity = data.masteruniversity;
    let masterpassingyear = data.masterpassingyear;
    let masterpercentage = data.masterpercentage
    let sscdetails = [sscboard,sscyear,sscpercentage];
    let hscdetails = [hscboard,hscyear,hscpercentage];
    let bachelordetails = [bachelorcourse,bacheloruniversity,bachelorpassingyear,bachelorpercentage
        ];  
    let masterdetails = [mastercourse,masteruniversity,masterpassingyear,masterpercentage];
    const ad = [];
    let flag = 1;
    if(sscdetails[0] !== '')
    {
        for(var i=0;i<sscdetails.length;i++)
        {
            ad.push(sscdetails[i]);
        }
    }
    if(hscdetails[0] !== '')
    {
        for(var i=0;i<hscdetails.length;i++)
        {
            ad.push(hscdetails[i]);
        }
    }
    if(bachelordetails[0] !== '')
    {
        for(var i=0;i<bachelordetails.length;i++)
        {
            ad.push(bachelordetails[i]);
        }
    }
    if(masterdetails[0] != undefined)
    {
        flag = 0;
        for(var i=0;i<masterdetails.length;i++)
        {
            ad.push(masterdetails[i]);
        }
    }
    ad.unshift(id)
    console.log(ad);
    if(flag == 1)
    {
            var values = {'id':ad[0],'ssc_board':ad[1],'ssc_year':ad[2],'ssc_percentage':ad[3],'hsc_board':ad[4],'hsc_year':ad[5],'hsc_percentage':ad[6],'bachelor_degree':ad[7],'bachelor_university':ad[8],'bachelor_year':ad[9],'bachelor_percentage':ad[10]}
            var sql = `UPDATE educational_details SET ? WHERE id = ${id}`;
            var result = await con.query(sql,[values]);
    }
    else
    {
        var values = {'id':ad[0],'ssc_board':ad[1],'ssc_year':ad[2],'ssc_percentage':ad[3],'hsc_board':ad[4],'hsc_year':ad[5],'hsc_percentage':ad[6],'bachelor_degree':ad[7],'bachelor_university':ad[8],'bachelor_year':ad[9],'bachelor_percentage':ad[10],'master_degree':ad[11],'master_university':ad[12],'master_year':ad[13],'master_percentage':ad[14]}
        var sql = `UPDATE educational_details SET ? WHERE id = ${id}`;
        var result = await con.query(sql,[values]);
    }
    let alreadyknownlanguages = [];
    async function checklanguage(id)
    {
        var sql = `select * from languages where id = ${id}`;
        var result = await con.query(sql);
        result = result[0]
        for(var i=0;i<result.length;i++)
        {
            alreadyknownlanguages.push(result[i].language_known);
        }
        return alreadyknownlanguages;
    }
    let alk = [];
    alk = await checklanguage(id);
                if(data.hindi == 'hindi')
                {
                    var choice1 = 'n';
                    var choice2 = 'n';
                    var choice3 = 'n';
                    if(alk.includes('hindi'))
                    {
                        for(var i=0;i<data.hindican.length;i++)
                        {
                            if(data.hindican[i] == 'read'){choice1 = 'y';}
                            if(data.hindican[i] == 'write'){choice2 = 'y';}
                            if(data.hindican[i] == 'speak'){choice3 = 'y';}
                        }
                            var sql = `UPDATE languages SET id = ${id} ,language_known = 'hindi',can_read = '${choice1}' ,can_write = '${choice2}' ,can_speak = '${choice3}' where id = '${id}' and language_known = 'hindi'`;
                            var result = await con.query(sql);
                    }
                    else
                    {
                        for(var i=0;i<data.hindican.length;i++)
                        {
                            if(data.hindican[i] == 'read'){choice1 = 'y';}
                            if(data.hindican[i] == 'write'){choice2 = 'y';}
                            if(data.hindican[i] == 'speak'){choice3 = 'y';}
                        }
                        var sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${id},'hindi','${choice1}','${choice2}','${choice3}')`;
                        var result = await con.query(sql);
                    }
                    
                    
                }
                if(data.english == 'english')
                {
                    var choice1 = 'n';
                    var choice2 = 'n';
                    var choice3 = 'n';
                    if(alk.includes('english'))
                    {
                        for(var i=0;i<data.englishcan.length;i++)
                        {
                            if(data.englishcan[i] == 'read'){choice1 = 'y';}
                            if(data.englishcan[i] == 'write'){choice2 = 'y';}
                            if(data.englishcan[i] == 'speak'){choice3 = 'y';}
                        }
                            var sql = `UPDATE languages SET id = ${id} ,language_known = 'english',can_read = '${choice1}' ,can_write = '${choice2}' ,can_speak = '${choice3}' where id = ${id} AND language_known = 'english' `;
                            var result = await con.query(sql);
                    }
                    else
                    {
                        for(var i=0;i<data.englishcan.length;i++)
                        {
                            if(data.englishcan[i] == 'read'){choice1 = 'y';}
                            if(data.englishcan[i] == 'write'){choice2 = 'y';}
                            if(data.englishcan[i] == 'speak'){choice3 = 'y';}
                        }
                        var sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${id},'english','${choice1}','${choice2}','${choice3}')`;
                        var result = await con.query(sql);
                    }
                    
                }
                if(data.gujarati == 'gujarati')
                {
                    var choice1 = 'n';
                    var choice2 = 'n';
                    var choice3 = 'n';
                    if(alk.includes('gujarati'))
                    {
                        for(var i=0;i<data.gujaratican.length;i++)
                        {
                            if(data.gujaratican[i] == 'read'){choice1 = 'y';}
                            if(data.gujaratican[i] == 'write'){choice2 = 'y';}
                            if(data.gujaratican[i] == 'speak'){choice3 = 'y';}
                        }
                            var sql = `UPDATE languages SET id = ${id} ,language_known = 'gujarati',can_read = '${choice1}' ,can_write = '${choice2}' ,can_speak = '${choice3}' where id = '${id}' and language_known = 'gujarati'`;
                            var result = await con.query(sql);
                    }
                    else
                    {
                        for(var i=0;i<data.gujaratican.length;i++)
                        {
                            if(data.gujaratican[i] == 'read'){choice1 = 'y';}
                            if(data.gujaratican[i] == 'write'){choice2 = 'y';}
                            if(data.gujaratican[i] == 'speak'){choice3 = 'y';}
                        }
                        var sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${id},'gujarati','${choice1}','${choice2}','${choice3}')`;
                        var result = await con.query(sql);
                    }
                    

                } 

    let alreadyknowntechnologies = []
    async function checktechnology(id)
    {
        let sql = `select * from technologies where id = ${id}`;
        let result = await con.query(sql);
        result = result[0];
        for(var i=0;i<result.length;i++)
        {
            alreadyknowntechnologies.push(result[i].technology_known)
        }
        return alreadyknowntechnologies;
    }
    let akt = [];
    akt = await checktechnology(id);
                if(data.php == 'php')
                {
                    if(akt.includes('php'))
                    {
                        if(data.php_level)
                        {
                            var sql = `UPDATE technologies SET id = ${id} ,technology_known = 'php' ,technology_level = '${data.php_level[0]}' WHERE id = ${id} and technology_known = 'php' `;
                            var result = await con.query(sql);
                        }
                    }   
                    else
                    {
                        if(data.php_level)
                        {
                            var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${id},'php','${data.php_level[0]}')`;
                            var result = await con.query(sql);
                        }
                    }
                    
                
                }
                if(data.mysql == 'mysql')
                {
                    if(akt.includes('mysql'))
                    {
                        if(data.mysql_level)
                        {
                            var sql = `UPDATE technologies SET id = ${id} ,technology_known = 'mysql' ,technology_level = '${data.mysql_level[0]}' WHERE id = ${id} and technology_known = 'mysql' `;
                            var result = await con.query(sql);
                        }
                    }   
                    else
                    {
                        if(data.mysql_level)
                        {
                            var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${id},'mysql','${data.mysql_level[0]}')`;
                            var result = await con.query(sql);
                        }
                    }
                    
                
                }
                if(data.laravel == 'laravel')
                {
                    if(akt.includes('laravel'))
                    {
                        if(data.laravel_level)
                        {
                            var sql = `UPDATE technologies SET id = ${id} ,technology_known = 'laravel' ,technology_level = '${data.laravel_level[0]}' WHERE id = ${id} and technology_known = 'laravel' `;
                            var result = await con.query(sql);
                        }
                    }   
                    else
                    {
                        if(data.laravel_level)
                        {
                            var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${id},'laravel','${data.laravel_level[0]}')`;
                            var result = await con.query(sql);
                        }
                    }
                    
                
                }
                if(data.oracle == 'oracle')
                {
                    if(akt.includes('oracle'))
                    {
                        if(data.oracle_level)
                        {
                            var sql = `UPDATE technologies SET id = ${id} ,technology_known = 'oracle' ,technology_level = '${data.oracle_level[0]}' WHERE id = ${id} and technology_known = 'oracle' `;
                            var result = await con.query(sql);
                        }
                    }   
                    else
                    {
                        if(data.oracle_level)
                        {
                            var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${id},'oracle','${data.oracle_level[0]}')`;
                            var result = await con.query(sql);
                        }
                    }
                    
                
                } 
                let cflag = 1;
                let companyname = [];
                let designation = [];
                let from = [];
                let to = [];
                let eid = [];
                for(var i=0;i<data.companyname.length;i++)
                {
                    if(data.companyname[i] !== '')
                    {
                        companyname.push(data.companyname[i]);
                    }
                    if(data.designation[i] != '')
                    {
                        designation.push(data.designation[i]);
                    }
                    if(data.from[i] != '')
                    {
                        from.push(data.from[i]);    
                    }
                    if(data.to[i] != '')
                    {
                        to.push(data.to[i]);
                    }
                    if(data.eid != '')
                    {
                        eid.push(data.eid[i])
                    }
                }
                for(var i=0;i<companyname.length;i++)
                {
                    if(companyname[i] !== '')
                    {
                        if(designation[i] !== '' && from[i] !== '' && to[i] !== '' && eid[i] != '')
                        {
                            var sql = `UPDATE experience SET id = ${id},company_name = '${companyname[i]}',company_designation = '${designation[i]}',from_date = '${from[i]}',to_date ='${to[i]}' where eid = ${eid[i]}`;
                            var result = await con.query(sql);   
                        }
                    }
                }
                let contactname = [];
                let contactnumber = [];
                let contactrelation = [];
                let cid = [];
                if(data.contactname)
                {
                    for(var i=0;i<data.contactname.length;i++)
                {
                    if(data.contactname[i] != '')
                    {
                        contactname.push(data.contactname[i]);
                    }
                    if(data.contactnumber[i] != '')
                    {
                        contactnumber.push(data.contactnumber[i]);
                    }
                    if(data.relation[i] != '')
                    {
                        contactrelation.push(data.relation[i]);
                    }
                    if(data.cid[i] !='')
                    {
                        cid.push(data.cid[i]);
                    }
                    
                }
                for(var i =0;i<contactname.length;i++)
                {
                    if(contactname[i] != '')
                    {
                        if(contactnumber != '' && contactrelation != '')
                        {
                            var sql = `UPDATE contact_reference SET id = ${id} ,contact_name = '${contactname[i]}',contact_number = '${contactnumber[i]}' ,contact_relation = '${contactrelation[i]}' WHERE cid = ${cid[i]}`;
                            var result = await con.query(sql);
                        }
                    }
                }   
                }
                

                let prefered_location = data.location;
                let notice_period = data.noticeperiod;
                let current_ctc = data.currentctc;
                let expected_ctc = data.expectedctc;
                let department = data.department;
                let pr = [prefered_location,notice_period,current_ctc,expected_ctc,department]
                let prflag = 1;
                for(var i=0;i<pr.length;i++)
                {
                    if(pr[i] == '')
                    {
                        prflag = 0;
                        break;
                    }
                }
                if(prflag == 1)
                {
                    var sql = `UPDATE preferences SET id = ${id}, prefered_location = '${prefered_location}', notice_period = '${notice_period}', expected_ctc = '${expected_ctc}', current_ctc = '${current_ctc}', department ='${department}' where id = ${id}`;
                    var result = await con.query(sql);
                }
                
            
    let basicdetails;
    let educationaldetails;
    let references;
    let preferences;
    let languages;
    let technologies;
    let experience;
    let message = "Successfully Updated";
    res.render("form/register",{message,basicdetails,educationaldetails,references,preferences,languages,technologies,experience});

})

app.get("/studentform",async (req,res)=>{
    res.render("ajax/studentform",);
})

app.post("/studentform",async (req,res)=>{
    let data = req.body;
    var sql = "INSERT INTO applicant(firstname,lastname,post,address1,address2,email,city,phone,state,gender,zipcode,relationship,dob) VALUES (?)";
    var values = [data.firstname,data.lastname,data.post,data.address1,data.address2,data.email,data.city,data.phone,data.state,data.gender,data.zipcode,data.rs,data.dob];
    var result = await con.query(sql,[values]);
    let userid = result[0].insertId;
    let sscyear = Number(data.sscyear)
    let sscpercentage = Number(data.sscpercentage)
    let sscboard = data.sscboard
    let hscyear = Number(data.hscyear)
    let hscpercentage = Number(data.hscpercentage)
    let hscboard = data.hscboard
    let bachelorcourse = data.bachelorcourse
    let bachelorpassingyear = Number(data.bachelorpassingyear)
    let bacheloruniversity = data.bacheloruniversity
    let bachelorpercentage = Number(data.bachelorpercentage)
    let mastercourse = data.mastercourse;
    let masteruniversity = data.masteruniversity;
    let masterpassingyear = data.masterpassingyear;
    let masterpercentage = data.masterpercentage
    let sscdetails = [sscboard,sscyear,sscpercentage];
    let hscdetails = [hscboard,hscyear,hscpercentage];
    let bachelordetails = [bachelorcourse,bacheloruniversity,bachelorpassingyear,bachelorpercentage
        ];  
    let masterdetails = [mastercourse,masteruniversity,masterpassingyear,masterpercentage];
    const ad = [];
    let flag = 1;
    if(sscdetails[0] !== '')
    {
        for(var i=0;i<sscdetails.length;i++)
        {
            ad.push(sscdetails[i]);
        }
    }
    if(hscdetails[0] !== '')
    {
        for(var i=0;i<hscdetails.length;i++)
        {
            ad.push(hscdetails[i]);
        }
    }
    if(bachelordetails[0] !== '')
    {
        for(var i=0;i<bachelordetails.length;i++)
        {
            ad.push(bachelordetails[i]);
        }
    }
    if(masterdetails[0] !== '')
    {
        flag = 0;
        for(var i=0;i<masterdetails.length;i++)
        {
            ad.push(masterdetails[i]);
        }
    }
    ad.unshift(userid)
    if(flag == 1)
    {
            var sql = "INSERT INTO educational_details(id,ssc_board,ssc_year,ssc_percentage,hsc_board,hsc_year,hsc_percentage,bachelor_degree,bachelor_university,bachelor_year,bachelor_percentage) VALUES(?)";
            var values = ad;
            var result = await con.query(sql,[values]);
    }
    else
    {
        var sql = "INSERT INTO educational_details(id,ssc_board,ssc_year,ssc_percentage,hsc_board,hsc_year,hsc_percentage,bachelor_degree,bachelor_university,bachelor_year,bachelor_percentage,master_degree,master_university,master_year,master_percentage) VALUES(?)";
            var values = ad;
            var result = await con.query(sql,[values]);
    }
            
                if(data.hindi == 'hindi')
                {
                    var choice1 = 'n';
                    var choice2 = 'n';
                    var choice3 = 'n';
                    for(var i=0;i<data.hindican.length;i++)
                    {
                        if(data.hindican[i] == 'read'){choice1 = 'y';}
                        if(data.hindican[i] == 'write'){choice2 = 'y';}
                        if(data.hindican[i] == 'speak'){choice3 = 'y';}
                    }
                    var sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${userid},'hindi','${choice1}','${choice2}','${choice3}')`;
                    var result = await con.query(sql);
                }
                if(data.english == 'english')
                {
                    var choice1 = 'n';
                    var choice2 = 'n';
                    var choice3 = 'n';
                    for(var i=0;i<data.englishcan.length;i++)
                    {
                        if(data.englishcan[i] == 'read'){choice1 = 'y';}
                        if(data.englishcan[i] == 'write'){choice2 = 'y';}
                        if(data.englishcan[i] == 'speak'){choice3 = 'y';}
                    }
                    var sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${userid},'english','${choice1}','${choice2}','${choice3}')`;
                    var result = await con.query(sql);

                }
                if(data.gujarati == 'gujarati')
                {
                    var choice1 = 'n';
                    var choice2 = 'n';
                    var choice3 = 'n';
                    for(var i=0;i<data.gujaratican.length;i++)
                    {
                        if(data.gujaratican[i] == 'read'){choice1 = 'y';}
                        if(data.gujaratican[i] == 'write'){choice2 = 'y';}
                        if(data.gujaratican[i] == 'speak'){choice3 = 'y';}
                    }
                    var sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${userid},'gujarati','${choice1}','${choice2}','${choice3}')`;
                    var result = await con.query(sql);

                } 
                if(data.php == 'php')
                {   
                    if(data.php_level)
                    {
                        var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${userid},'php','${data.php_level[0]}')`;
                        var result = await con.query(sql);
                    }
                
                }
                if(data.mysql == 'mysql')
                {
                    if(data.mysql_level)
                    {
                        var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${userid},'mysql','${data.mysql_level[0]}')`;
                        var result = await con.query(sql);
                    }
                
                }
                if(data.laravel == 'laravel')
                { 
                    if(data.laravel_level)
                    {
                        var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${userid},'laravel','${data.laravel_level[0]}')`;
                        var result = await con.query(sql);    
                    }
                
                }
                if(data.oracle == 'oracle')
                {
                    if(data.oracle_level)
                    {
                        var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${userid},'oracle','${data.oracle_level[0]}')`;
                        var result = await con.query(sql);
                    }
                
                } 
                let cflag = 1;
                let companyname = [];
                let designation = [];
                let from = [];
                let to = [];
                for(var i=0;i<data.companyname.length;i++)
                {
                    if(data.companyname[i] !== '')
                    {
                        companyname.push(data.companyname[i]);
                    }
                    if(data.designation[i] != '')
                    {
                        designation.push(data.designation[i]);
                    }
                    if(data.from[i] != '')
                    {
                        from.push(data.from[i]);    
                    }
                    if(data.to[i] != '')
                    {
                        to.push(data.to[i]);
                    }
                }
                for(var i=0;i<companyname.length;i++)
                {
                    if(companyname[i] !== '')
                    {
                        if(designation[i] !== '' && from[i] !== '' && to[i] !== '')
                        {
                            var sql = `INSERT INTO experience(id,company_name,company_designation,from_date,to_date) VALUES(${userid},'${companyname[i]}','${designation[i]}','${from[i]}','${to[i]}')`;
                            var result = await con.query(sql);   
                        }
                    }
                }
                let contactname = [];
                let contactnumber = [];
                let contactrelation = [];
                for(var i=0;i<data.contactname.length;i++)
                {
                    if(data.contactname[i] != '')
                    {
                        contactname.push(data.contactname[i]);
                    }
                    if(data.contactnumber[i] != '')
                    {
                        contactnumber.push(data.contactnumber[i]);
                    }
                    if(data.relation[i] != '')
                    {
                        contactrelation.push(data.relation[i]);
                    }
                    
                }
                for(var i =0;i<contactname.length;i++)
                {
                    if(contactname[i] != '')
                    {
                        if(contactnumber != '' && contactrelation != '')
                        {
                            var sql = `INSERT INTO contact_reference(id,contact_name,contact_number,contact_relation) VALUES(${userid},'${contactname[i]}','${contactnumber[i]}','${contactrelation[i]}')`;
                            var result = await con.query(sql);
                        }
                    }
                }

                let prefered_location = data.location;
                let notice_period = data.noticeperiod;
                let current_ctc = data.currentctc;
                let expected_ctc = data.expectedctc;
                let department = data.department;
                let pr = [prefered_location,notice_period,current_ctc,expected_ctc,department]
                let prflag = 1;
                for(var i=0;i<pr.length;i++)
                {
                    if(pr[i] == '')
                    {
                        prflag = 0;
                        break;
                    }
                }
                if(prflag == 1)
                {
                    var sql = `INSERT INTO preferences(id,prefered_location,notice_period,expected_ctc,current_ctc,department) VALUES(${userid},'${prefered_location}','${notice_period}','${expected_ctc}','${current_ctc}','${department}')`;
                    var result = await con.query(sql);
                }
                res.render("ajax/studentform")
})

app.get("/studentlist",async (req,res)=>{
    let sql = `select id,firstname,lastname,post,email from applicant`;
    let result = await con.query(sql);
    result = result[0];
    res.render("ajax/studentlist",{result});
})

async function data(table,id)
{
    let sql = `select * from ${table} where id = ${id}`;
    let result = await con.query(sql);
    return result[0];
}


app.get("/update",async (req,res)=>{
    res.render("ajax/studentform")
})

app.post("/update",async(req,res)=>{
    let id = req.query.Id;
    let basicdetails = await data('applicant',id);
    let educationaldetails = await data('educational_details',id);
    let experience = await data('experience',id);
    let languages = await data('languages',id);
    let technologies = await data('technologies',id);
    let references = await data('contact_reference',id);
    let preferences = await data('preferences',id);
    basicdetails = basicdetails[0];
    educationaldetails = educationaldetails[0]
    preferences = preferences[0]
    if(experience.length == 0 && references.length == 0)
    {
        let userdata = {'basicdetails':basicdetails,'educationaldetails':educationaldetails,'languages':languages,'technologies':technologies,'preferences':preferences};

        return res.json(userdata);
    }
    else if(references.length == 0)
    {
        let userdata = {'basicdetails':basicdetails,'educationaldetails':educationaldetails,'experience':experience,'languages':languages,'technologies':technologies,'preferences':preferences};
        return res.json(userdata);
    }
    else
    {
        let userdata = {'basicdetails':basicdetails,'educationaldetails':educationaldetails,'experience':experience,'languages':languages,'technologies':technologies,'references':references,'preferences':preferences};
       return res.json(userdata);
    }
})

app.post("/reinsert",async (req,res)=>{
    let id = req.query.Id;
    let data = req.body;
    var bd = {"firstname":data.firstname,"lastname":data.lastname,"post":data.post,"address1":data.address1,"address2":data.address2,"email":data.email,"city":data.city,"phone":data.phone,"state":data.state,"gender":data.gender,"zipcode":data.zipcode,"relationship":data.rs,"dob":data.dob}
    var sql = `UPDATE applicant SET ? WHERE id = ${id}`;
    var result = await con.query(sql,[bd]);
    let sscyear = Number(data.sscyear)
    let sscpercentage = Number(data.sscpercentage)
    let sscboard = data.sscboard
    let hscyear = Number(data.hscyear)
    let hscpercentage = Number(data.hscpercentage)
    let hscboard = data.hscboard
    let bachelorcourse = data.bachelorcourse
    let bachelorpassingyear = Number(data.bachelorpassingyear)
    let bacheloruniversity = data.bacheloruniversity
    let bachelorpercentage = Number(data.bachelorpercentage)
    let mastercourse = data.mastercourse;
    let masteruniversity = data.masteruniversity;
    let masterpassingyear = data.masterpassingyear;
    let masterpercentage = data.masterpercentage
    let sscdetails = [sscboard,sscyear,sscpercentage];
    let hscdetails = [hscboard,hscyear,hscpercentage];
    let bachelordetails = [bachelorcourse,bacheloruniversity,bachelorpassingyear,bachelorpercentage
        ];  
    let masterdetails = [mastercourse,masteruniversity,masterpassingyear,masterpercentage];
    const ad = [];
    let flag = 1;
    if(sscdetails[0] !== '')
    {
        for(var i=0;i<sscdetails.length;i++)
        {
            ad.push(sscdetails[i]);
        }
    }
    if(hscdetails[0] !== '')
    {
        for(var i=0;i<hscdetails.length;i++)
        {
            ad.push(hscdetails[i]);
        }
    }
    if(bachelordetails[0] !== '')
    {
        for(var i=0;i<bachelordetails.length;i++)
        {
            ad.push(bachelordetails[i]);
        }
    }
    if(masterdetails[0] != undefined)
    {
        flag = 0;
        for(var i=0;i<masterdetails.length;i++)
        {
            ad.push(masterdetails[i]);
        }
    }
    ad.unshift(id)
    if(flag == 1)
    {
            var values = {'id':ad[0],'ssc_board':ad[1],'ssc_year':ad[2],'ssc_percentage':ad[3],'hsc_board':ad[4],'hsc_year':ad[5],'hsc_percentage':ad[6],'bachelor_degree':ad[7],'bachelor_university':ad[8],'bachelor_year':ad[9],'bachelor_percentage':ad[10]}
            var sql = `UPDATE educational_details SET ? WHERE id = ${id}`;
            var result = await con.query(sql,[values]);
    }
    else
    {
        var values = {'id':ad[0],'ssc_board':ad[1],'ssc_year':ad[2],'ssc_percentage':ad[3],'hsc_board':ad[4],'hsc_year':ad[5],'hsc_percentage':ad[6],'bachelor_degree':ad[7],'bachelor_university':ad[8],'bachelor_year':ad[9],'bachelor_percentage':ad[10],'master_degree':ad[11],'master_university':ad[12],'master_year':ad[13],'master_percentage':ad[14]}
        var sql = `UPDATE educational_details SET ? WHERE id = ${id}`;
        var result = await con.query(sql,[values]);
    }
    let alreadyknownlanguages = [];
    async function checklanguage(id)
    {
        var sql = `select * from languages where id = ${id}`;
        var result = await con.query(sql);
        result = result[0]
        for(var i=0;i<result.length;i++)
        {
            alreadyknownlanguages.push(result[i].language_known);
        }
        return alreadyknownlanguages;
    }
    let alk = [];
    alk = await checklanguage(id);
                if(data.hindi == 'hindi')
                {
                    var choice1 = 'n';
                    var choice2 = 'n';
                    var choice3 = 'n';
                    if(alk.includes('hindi'))
                    {
                        for(var i=0;i<data.hindican.length;i++)
                        {
                            if(data.hindican[i] == 'read'){choice1 = 'y';}
                            if(data.hindican[i] == 'write'){choice2 = 'y';}
                            if(data.hindican[i] == 'speak'){choice3 = 'y';}
                        }
                            var sql = `UPDATE languages SET id = ${id} ,language_known = 'hindi',can_read = '${choice1}' ,can_write = '${choice2}' ,can_speak = '${choice3}' where id = '${id}' and language_known = 'hindi'`;
                            var result = await con.query(sql);
                    }
                    else
                    {
                        for(var i=0;i<data.hindican.length;i++)
                        {
                            if(data.hindican[i] == 'read'){choice1 = 'y';}
                            if(data.hindican[i] == 'write'){choice2 = 'y';}
                            if(data.hindican[i] == 'speak'){choice3 = 'y';}
                        }
                        var sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${id},'hindi','${choice1}','${choice2}','${choice3}')`;
                        var result = await con.query(sql);
                    }
                    
                    
                }
                if(data.english == 'english')
                {
                    var choice1 = 'n';
                    var choice2 = 'n';
                    var choice3 = 'n';
                    if(alk.includes('english'))
                    {
                        for(var i=0;i<data.englishcan.length;i++)
                        {
                            if(data.englishcan[i] == 'read'){choice1 = 'y';}
                            if(data.englishcan[i] == 'write'){choice2 = 'y';}
                            if(data.englishcan[i] == 'speak'){choice3 = 'y';}
                        }
                            var sql = `UPDATE languages SET id = ${id} ,language_known = 'english',can_read = '${choice1}' ,can_write = '${choice2}' ,can_speak = '${choice3}' where id = ${id} AND language_known = 'english' `;
                            var result = await con.query(sql);
                    }
                    else
                    {
                        for(var i=0;i<data.englishcan.length;i++)
                        {
                            if(data.englishcan[i] == 'read'){choice1 = 'y';}
                            if(data.englishcan[i] == 'write'){choice2 = 'y';}
                            if(data.englishcan[i] == 'speak'){choice3 = 'y';}
                        }
                        var sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${id},'english','${choice1}','${choice2}','${choice3}')`;
                        var result = await con.query(sql);
                    }
                    
                }
                if(data.gujarati == 'gujarati')
                {
                    var choice1 = 'n';
                    var choice2 = 'n';
                    var choice3 = 'n';
                    if(alk.includes('gujarati'))
                    {
                        for(var i=0;i<data.gujaratican.length;i++)
                        {
                            if(data.gujaratican[i] == 'read'){choice1 = 'y';}
                            if(data.gujaratican[i] == 'write'){choice2 = 'y';}
                            if(data.gujaratican[i] == 'speak'){choice3 = 'y';}
                        }
                            var sql = `UPDATE languages SET id = ${id} ,language_known = 'gujarati',can_read = '${choice1}' ,can_write = '${choice2}' ,can_speak = '${choice3}' where id = '${id}' and language_known = 'gujarati'`;
                            var result = await con.query(sql);
                    }
                    else
                    {
                        for(var i=0;i<data.gujaratican.length;i++)
                        {
                            if(data.gujaratican[i] == 'read'){choice1 = 'y';}
                            if(data.gujaratican[i] == 'write'){choice2 = 'y';}
                            if(data.gujaratican[i] == 'speak'){choice3 = 'y';}
                        }
                        var sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${id},'gujarati','${choice1}','${choice2}','${choice3}')`;
                        var result = await con.query(sql);
                    }
                    

                } 

    let alreadyknowntechnologies = []
    async function checktechnology(id)
    {
        let sql = `select * from technologies where id = ${id}`;
        let result = await con.query(sql);
        result = result[0];
        for(var i=0;i<result.length;i++)
        {
            alreadyknowntechnologies.push(result[i].technology_known)
        }
        return alreadyknowntechnologies;
    }
    let akt = [];
    akt = await checktechnology(id);
                if(data.php == 'php')
                {
                    if(akt.includes('php'))
                    {
                        if(data.php_level)
                        {
                            var sql = `UPDATE technologies SET id = ${id} ,technology_known = 'php' ,technology_level = '${data.php_level[0]}' WHERE id = ${id} and technology_known = 'php' `;
                            var result = await con.query(sql);
                        }
                    }   
                    else
                    {
                        if(data.php_level)
                        {
                            var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${id},'php','${data.php_level[0]}')`;
                            var result = await con.query(sql);
                        }
                    }
                    
                
                }
                if(data.mysql == 'mysql')
                {
                    if(akt.includes('mysql'))
                    {
                        if(data.mysql_level)
                        {
                            var sql = `UPDATE technologies SET id = ${id} ,technology_known = 'mysql' ,technology_level = '${data.mysql_level[0]}' WHERE id = ${id} and technology_known = 'mysql' `;
                            var result = await con.query(sql);
                        }
                    }   
                    else
                    {
                        if(data.mysql_level)
                        {
                            var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${id},'mysql','${data.mysql_level[0]}')`;
                            var result = await con.query(sql);
                        }
                    }
                    
                
                }
                if(data.laravel == 'laravel')
                {
                    if(akt.includes('laravel'))
                    {
                        if(data.laravel_level)
                        {
                            var sql = `UPDATE technologies SET id = ${id} ,technology_known = 'laravel' ,technology_level = '${data.laravel_level[0]}' WHERE id = ${id} and technology_known = 'laravel' `;
                            var result = await con.query(sql);
                        }
                    }   
                    else
                    {
                        if(data.laravel_level)
                        {
                            var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${id},'laravel','${data.laravel_level[0]}')`;
                            var result = await con.query(sql);
                        }
                    }
                    
                
                }
                if(data.oracle == 'oracle')
                {
                    if(akt.includes('oracle'))
                    {
                        if(data.oracle_level)
                        {
                            var sql = `UPDATE technologies SET id = ${id} ,technology_known = 'oracle' ,technology_level = '${data.oracle_level[0]}' WHERE id = ${id} and technology_known = 'oracle' `;
                            var result = await con.query(sql);
                        }
                    }   
                    else
                    {
                        if(data.oracle_level)
                        {
                            var sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${id},'oracle','${data.oracle_level[0]}')`;
                            var result = await con.query(sql);
                        }
                    }
                    
                
                } 
                let cflag = 1;
                let companyname = [];
                let designation = [];
                let from = [];
                let to = [];
                let eid = [];
                if(data.company_name)
                {
                    for(var i=0;i<data.company_name.length;i++)
                    {
                        if(data.company_name[i] !== '')
                        {
                            companyname.push(data.company_name[i]);
                        }
                        if(data.company_designation[i] != '')
                        {
                            designation.push(data.company_designation[i]);
                        }
                        if(data.from_date[i] != '')
                        {
                            from.push(data.from_date[i]);    
                        }
                        if(data.to_date[i] != '')
                        {
                            to.push(data.to_date[i]);
                        }
                        if(data.eid != '')
                        {
                            eid.push(data.eid[i])
                        }
                    }
                    for(var i=0;i<companyname.length;i++)
                    {
                        if(companyname[i] !== '')
                        {
                            if(designation[i] !== '' && from[i] !== '' && to[i] !== '' && eid[i] != '')
                            {
                                var sql = `UPDATE experience SET id = ${id},company_name = '${companyname[i]}',company_designation = '${designation[i]}',from_date = '${from[i]}',to_date ='${to[i]}' where eid = ${eid[i]}`;
                                var result = await con.query(sql);   
                            }
                        }
                    }
                }
                
                let contactname = [];
                let contactnumber = [];
                let contactrelation = [];
                let cid = [];
                if(data.contact_name)
                {
                    for(var i=0;i<data.contact_name.length;i++)
                {
                    if(data.contact_name[i] != '')
                    {
                        contactname.push(data.contact_name[i]);
                    }
                    if(data.contact_number[i] != '')
                    {
                        contactnumber.push(data.contact_number[i]);
                    }
                    if(data.contact_relation[i] != '')
                    {
                        contactrelation.push(data.contact_relation[i]);
                    }
                    if(data.cid[i] !='')
                    {
                        cid.push(data.cid[i]);
                    }
                    
                }
                for(var i =0;i<contactname.length;i++)
                {
                    if(contactname[i] != '')
                    {
                        if(contactnumber != '' && contactrelation != '')
                        {
                            var sql = `UPDATE contact_reference SET id = ${id} ,contact_name = '${contactname[i]}',contact_number = '${contactnumber[i]}' ,contact_relation = '${contactrelation[i]}' WHERE cid = ${cid[i]}`;
                            var result = await con.query(sql);
                        }
                    }
                }   
                }
                

                let prefered_location = data.location;
                let notice_period = data.noticeperiod;
                let current_ctc = data.currentctc;
                let expected_ctc = data.expectedctc;
                let department = data.department;
                let pr = [prefered_location,notice_period,current_ctc,expected_ctc,department]
                let prflag = 1;
                for(var i=0;i<pr.length;i++)
                {
                    if(pr[i] == '')
                    {
                        prflag = 0;
                        break;
                    }
                }
                if(prflag == 1)
                {
                    var sql = `UPDATE preferences SET id = ${id}, prefered_location = '${prefered_location}', notice_period = '${notice_period}', expected_ctc = '${expected_ctc}', current_ctc = '${current_ctc}', department ='${department}' where id = ${id}`;
                    var result = await con.query(sql);
                }
               res.send({
                alert:"form successfully updated"
               })
})

app.get("/timezone",(req,res)=>{
    res.render("ajax/timezone")
})

app.get("/index",(req,res)=>{
    res.render("jsonplaceholder/index");
})

app.get("/Data",(req,res)=>{
    res.render("jsonplaceholder/Data");
})

app.get("/sdata",async (req,res)=>{
    var sql = "select * from student_master LIMIT 15";
    let result = await con.query(sql);
    result = result[0];
    res.render("data_pagination/data",{Id,result})
})

app.get("/component",(req,res)=>{
    res.render("data_pagination/component");
})

app.get("/next/:Id",async (req,res)=>{
    let Id = req.params.Id;
    var sql = `select * from student_master LIMIT 15 OFFSET ${Id * 15}`;
    Id++;
    let result = await con.query(sql)
    result = result[0]
    res.render("data_pagination/data",{Id,result})
})

app.get("/prev/:Id",async (req,res)=>{
    let Id = req.params.Id;
    let pid = Id - 2;
    --Id;
    var sql = `select * from student_master LIMIT 15 OFFSET ${pid * 15}`;
    let result = await con.query(sql)
    result = result[0]    
    res.render("data_pagination/data",{Id,result})
})

app.get("/first",async (req,res)=>{
    var sql = `select * from student_master LIMIT 15`;
    Id = 1;
    let result = await con.query(sql)
    result = result[0]    
    res.render("data_pagination/data",{Id,result})
})

app.get("/last",async (req,res)=>{
    Id = 3187;
    var sql = `select * from student_master LIMIT 15 OFFSET 47790`;
    let result = await con.query(sql)
    result = result[0]
        res.render("data_pagination/data",{Id,result})
})

app.get("/order",async (req,res)=>{
    // let cols = req.params.cols;
    // let hr = req.params.hr;
    let cols = Id;
    let hr = 'asc';
    var sql = "select * from student_master LIMIT 15";
    let result = await con.query(sql)
    result = result[0]    
    res.render("data_pagination/order",{Id,result,cols,hr})
})

app.post("/order",async (req,res)=>{
    let cols = req.body.orderby;
    let hr = req.body.hr;
    var sql = `select * from student_master ORDER BY ${cols} ${hr} LIMIT 15`;
    let result = await con.query(sql)
    result = result[0]
    res.render("data_pagination/order",{Id,result,cols,hr})
})


app.get("/next/:Id/:cols/:hr",async (req,res)=>{
    let Id = req.params.Id;
    let cols = req.params.cols;
    let hr = req.params.hr;
    var sql = `select * from student_master ORDER BY ${cols} ${hr} LIMIT 15 OFFSET ${Id * 15}`;
    Id++;
    let result = await con.query(sql)
    result = result[0]
    res.render("data_pagination/order",{Id,result,cols,hr})
})

app.get("/prev/:Id/:cols/:hr",async(req,res)=>{
    let Id = req.params.Id;
    let cols = req.params.cols;
    let hr = req.params.hr;
    let pid = Id - 2;
    Id--;
    var sql = `select * from student_master ORDER BY ${cols} ${hr} LIMIT 15 OFFSET ${pid * 15}`;
    let result = await con.query(sql)
    result = result[0]    
    res.render("data_pagination/order",{Id,result,cols,hr})
})

app.get("/first/:cols/:hr",async (req,res)=>{
    let cols = req.params.cols;
    let hr = req.params.hr;
    var sql = `select * from student_master ORDER BY ${cols} ${hr} LIMIT 15`;
    Id = 1;
    let result = await con.query(sql)
    result = result[0]
    res.render("data_pagination/order",{Id,result,cols,hr})
})

app.get("/last/:cols/:hr",async (req,res)=>{
    let cols = req.params.cols;
    let hr = req.params.hr;
    Id = 3187;
    var sql = `select * from student_master ORDER BY ${cols} ${hr} LIMIT 15 OFFSET 47790`;
    let result = await con.query(sql)
    result = result[0]
    res.render("data_pagination/order",{Id,result,cols,hr})
})

app.get("/attendance", async (req,res)=>{
    let dt = 'Dec 2023';
    let total = 31;
    let start = '2023-12-01';
    let end = '2023-12-31';
    var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
     let result1 = await con.query(sql);
     result = result1[0];
     res.render("data_pagination/attendance",{Id,result,dt})
})
app.post("/attendance",async    (req,res)=>{
    let month = Number(req.body.month);
    if(month === 1)
    {
        let dt = 'Dec 2023';
        let start = '2023-12-01';
        let end = '2023-12-31';
        let total = 31;
        let Id = 1; 
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(month === 2)
    {
        let dt = 'Jan 2024';
        let start = '2024-01-01';
        let end = '2024-01-31';
        let total = 31;
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(month === 3)
    {
        let dt = 'Feb 2024';
        let start = '2024-02-01';
        let end = '2024-02-27';
        let total = 29;
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
})

app.get("/attendance/:dt/next/:Id",async (req,res)=>{
    let dt = req.params.dt;
    let Id = req.params.Id;
    if(dt === 'Dec 2023')
    {
        let start = '2023-12-01';
        let end = '2023-12-31';
        let total = 31;
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET ${Id * 10}`;
        Id++;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Jan 2024')
    {
        let start = '2024-01-01';
        let end = '2024-01-31';
        let total = 31;
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET ${Id * 10}`;
        Id++;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Feb 2024')
    {
        let start = '2024-02-01';
        let end = '2024-02-27';
        let total = 27;
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET ${Id * 10}`;
        Id++;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
})

app.get("/attendance/:dt/prev/:Id",async (req,res)=>{
    let dt = req.params.dt;
    let Id = req.params.Id;
    if(dt === 'Dec 2023')
    {
        let start = '2023-12-01';
        let end = '2023-12-31';
        let total = 31;
        let pid = Id - 2;
        Id--;
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET ${pid * 10}`;
        var result1 = await con.query(sql);
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
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET ${pid * 10}`;
        var result1 = await con.query(sql);
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
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET ${pid * 10}`;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    
})

app.get("/attendance/:dt/first",async (req,res)=>{
    let dt = req.params.dt;
    if(dt === 'Dec 2023')
    {
        let start = '2023-12-01';
        let end = '2023-12-31';
        let total = 31;
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
        Id = 1;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Jan 2024')
    {
        let start = '2024-01-01';
        let end = '2024-01-31';
        let total = 31;
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
        Id = 1;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Feb 2024')
    {
        let start = '2024-02-01';
        let end = '2024-02-27';
        let total = 27;
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10`;
        Id = 1;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    
})

app.get("/attendance/:dt/last",async (req,res)=>{
    let dt = req.params.dt;
    if(dt === 'Dec 2023')
    {
        let start = '2023-12-01';
        let end = '2023-12-31';
        let total = 31;
        Id = 30;
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET 290`;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Jan 2024')
    {
        let start = '2024-01-01';
        let end = '2024-01-31';
        let total = 31;
        Id = 30;
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET 290`;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    if(dt === 'Feb 2024')
    {
        let start = '2024-02-01';
        let end = '2024-02-29';
        let total = 29;
        Id = 30;
        var sql = `select student_master1.id,student_master1.firstname,student_master1.lastname,count(attendance_master.status) as present,concat(ceiling((count(attendance_master.status)/${total})*100),'%') as Percentage FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND attendance_master.status = 'P' AND attendance_master.day between '${start}' AND '${end}' GROUP BY attendance_master.id order by student_master1.id LIMIT 10 OFFSET 290`;
        var result1 = await con.query(sql);
        result = result1[0];
        res.render("data_pagination/attendance",{Id,result,dt})
    }
    
})

app.get("/result",async (req,res)=>{
    var sql1 = "select student_master1.id,concat(student_master1.firstname,' ',student_master1.lastname) as Name,sum(practical_obtain) as finalpractical,sum(final_obtain) as finaltheory from student_master1 inner join result_master where examtype = 1 AND student_master1.id = result_master.studentid GROUP BY student_master1.id LIMIT 10;"
    var sql2 = "select sum(practical_obtain) as preliminarypractical,sum(final_obtain) as preliminarytheory from result_master where examtype = 2 GROUP BY studentid LIMIT 10";
    var sql3 = "select sum(practical_obtain) as terminalpractical,sum(final_obtain) as terminaltheory from result_master where examtype = 3 GROUP BY studentid LIMIT 10";
    var sql4 = "select studentid,sum(practical_obtain)+sum(final_obtain) as obtainmarks,sum(practical_total)+sum(final_total) as totalmarks from result_master group by studentid LIMIT 10";
    var d = await con.query(sql1);
    var d2 = await con.query(sql2);
    var d3 = await con.query(sql3);
    var d4 = await con.query(sql4);
    var data = d[0];
    var data2 = d2[0];
    var data3 = d3[0];
    var data4 = d4[0];
    res.render("data_pagination/result",{Id,data,data2,data3,data4});
    
})

app.get("/result/first",async (req,res)=>{
    var sql1 = "select student_master1.id,concat(student_master1.firstname,' ',student_master1.lastname) as Name,sum(practical_obtain) as finalpractical,sum(final_obtain) as finaltheory from student_master1 inner join result_master where examtype = 1 AND student_master1.id = result_master.studentid GROUP BY student_master1.id LIMIT 10;"
    var sql2 = "select sum(practical_obtain) as preliminarypractical,sum(final_obtain) as preliminarytheory from result_master where examtype = 2 GROUP BY studentid LIMIT 10";
    var sql3 = "select sum(practical_obtain) as terminalpractical,sum(final_obtain) as terminaltheory from result_master where examtype = 3 GROUP BY studentid LIMIT 10";
    var sql4 = "select studentid,sum(practical_obtain)+sum(final_obtain) as obtainmarks,sum(practical_total)+sum(final_total) as totalmarks from result_master group by studentid LIMIT 10";
    var d = await con.query(sql1);
    var d2 = await con.query(sql2);
    var d3 = await con.query(sql3);
    var d4 = await con.query(sql4);
    var data = d[0];
    var data2 = d2[0];
    var data3 = d3[0];
    var data4 = d4[0];
    Id = 1;
    res.render("data_pagination/result",{Id,data,data2,data3,data4});
})

app.get("/result/last",async (req,res)=>{
    var sql1 = "select student_master1.id,concat(student_master1.firstname,' ',student_master1.lastname) as Name,sum(practical_obtain) as finalpractical,sum(final_obtain) as finaltheory from student_master1 inner join result_master where examtype = 1 AND student_master1.id = result_master.studentid GROUP BY student_master1.id LIMIT 10 OFFSET 290";
    var sql2 = "select sum(practical_obtain) as preliminarypractical,sum(final_obtain) as preliminarytheory from result_master where examtype = 2 GROUP BY studentid LIMIT 10 OFFSET 290";
    var sql3 = "select sum(practical_obtain) as terminalpractical,sum(final_obtain) as terminaltheory from result_master where examtype = 3 GROUP BY studentid LIMIT 10 OFFSET 290";
    var sql4 = "select studentid,sum(practical_obtain)+sum(final_obtain) as obtainmarks,sum(practical_total)+sum(final_total) as totalmarks from result_master group by studentid LIMIT 10 OFFSET 290";
    var d = await con.query(sql1);
    var d2 = await con.query(sql2);
    var d3 = await con.query(sql3);
    var d4 = await con.query(sql4);
    var data = d[0];
    var data2 = d2[0];
    var data3 = d3[0];
    var data4 = d4[0];
    Id = 30;
    res.render("data_pagination/result",{Id,data,data2,data3,data4});
})

app.get("/result/next/:Id",async (req,res)=>{
    let Id = req.params.Id;
    var sql1 = `select student_master1.id,concat(student_master1.firstname,' ',student_master1.lastname) as Name,sum(practical_obtain) as finalpractical,sum(final_obtain) as finaltheory from student_master1 inner join result_master where examtype = 1 AND student_master1.id = result_master.studentid GROUP BY student_master1.id LIMIT 10 OFFSET ${10 * Id}`;
    var sql2 = `select sum(practical_obtain) as preliminarypractical,sum(final_obtain) as preliminarytheory from result_master where examtype = 2 GROUP BY studentid LIMIT 10 OFFSET ${10 * Id}`;
    var sql3 = `select sum(practical_obtain) as terminalpractical,sum(final_obtain) as terminaltheory from result_master where examtype = 3 GROUP BY studentid LIMIT 10 OFFSET ${10 * Id}`;
    var sql4 = `select studentid,sum(practical_obtain)+sum(final_obtain) as obtainmarks,sum(practical_total)+sum(final_total) as totalmarks from result_master group by studentid LIMIT 10 OFFSET ${10 * Id}`;
    Id++;
    var d = await con.query(sql1);
    var d2 = await con.query(sql2);
    var d3 = await con.query(sql3);
    var d4 = await con.query(sql4);
    var data = d[0];
    var data2 = d2[0];
    var data3 = d3[0];
    var data4 = d4[0];
    res.render("data_pagination/result",{Id,data,data2,data3,data4});
})

app.get("/result/prev/:Id",async (req,res)=>{
    let Id = req.params.Id;
    let pid = Id - 2;
    Id--;
    var sql1 = `select student_master1.id,concat(student_master1.firstname,' ',student_master1.lastname) as Name,sum(practical_obtain) as finalpractical,sum(final_obtain) as finaltheory from student_master1 inner join result_master where examtype = 1 AND student_master1.id = result_master.studentid GROUP BY student_master1.id LIMIT 10 OFFSET ${10 * pid}`;
    var sql2 = `select sum(practical_obtain) as preliminarypractical,sum(final_obtain) as preliminarytheory from result_master where examtype = 2 GROUP BY studentid LIMIT 10 OFFSET ${10 * pid}`;
    var sql3 = `select sum(practical_obtain) as terminalpractical,sum(final_obtain) as terminaltheory from result_master where examtype = 3 GROUP BY studentid LIMIT 10 OFFSET ${10 * pid}`;
    var sql4 = `select studentid,sum(practical_obtain)+sum(final_obtain) as obtainmarks,sum(practical_total)+sum(final_total) as totalmarks from result_master group by studentid LIMIT 10 OFFSET ${10 * pid}`;
    var d = await con.query(sql1);
    var d2 = await con.query(sql2);
    var d3 = await con.query(sql3);
    var d4 = await con.query(sql4);
    var data = d[0];
    var data2 = d2[0];
    var data3 = d3[0];
    var data4 = d4[0];
    res.render("data_pagination/result",{Id,data,data2,data3,data4});
})


app.get("/fullresult/:Id",async (req,res)=>{
    var Id = req.params.Id;
    var sq = `select concat(student_master1.firstname,' ',student_master1.lastname) as name from student_master1 where id = ${Id}`;
    var sql = `select subject_master.subjectname,(select practical_obtain from result_master where result_master.subjectid = subject_master.subjectid AND examtype = 1 AND studentid = ${Id}) as 'finalpractical',(select final_obtain from result_master where result_master.subjectid = subject_master.subjectid AND examtype = 1 AND studentid = ${Id}) as 'finaltheory',(select practical_obtain from result_master where result_master.subjectid = subject_master.subjectid AND examtype = 2 AND studentid = ${Id}) as 'preliminarypractical',(select final_obtain from result_master where result_master.subjectid = subject_master.subjectid AND examtype = 2 AND studentid = ${Id}) as 'preliminarytheory',(select practical_obtain from result_master where result_master.subjectid = subject_master.subjectid AND examtype = 3 AND studentid = ${Id}) as 'Terminalpractical',(select final_obtain from result_master where result_master.subjectid = subject_master.subjectid AND examtype = 3 AND studentid = ${Id}) as 'Terminaltheory' FROM result_master inner join subject_master on result_master.subjectid = subject_master.subjectid where result_master.studentid = ${Id} group by result_master.subjectid`;
    var sql2 = `select (select concat(ceiling((count(attendance_master.status)/31)*100),'%') FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND student_master1.id = ${Id} AND attendance_master.status = 'P' AND attendance_master.day between '2023-12-01' AND '2023-12-31' GROUP BY attendance_master.id order by student_master1.id) as 'DecemberAttendance',
    (select concat(ceiling((count(attendance_master.status)/31)*100),'%') FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND student_master1.id = ${Id} AND attendance_master.status = 'P' AND attendance_master.day between '2024-01-01' AND '2024-01-31' GROUP BY attendance_master.id order by student_master1.id) as 'JanuaryAttendance',
    (select concat(ceiling((count(attendance_master.status)/29)*100),'%') FROM student_master1 inner join attendance_master on student_master1.id = attendance_master.id AND student_master1.id = ${Id} AND attendance_master.status = 'P' AND attendance_master.day between '2024-02-01' AND '2024-02-29' GROUP BY attendance_master.id order by student_master1.id) as 'FebruaryAttendance' FROM attendance_master WHERE id = ${Id} group by id;
    `;

    var sql3 = `select sum(practical_obtain)+sum(final_obtain) as obtainmarks,sum(practical_total)+sum(final_total) as totalmarks,concat(ceiling(((sum(practical_obtain)+sum(final_obtain))/(sum(practical_total)+sum(final_total)))*100),'%') as percentage from result_master where studentid = ${Id};`;
    var n = await con.query(sq);
    var nm = await con.query(sql);
    var nm2 = await con.query(sql2);
    var nm3 = await con.query(sql3);
    var data = nm[0];
    var data2 = nm2[0]; 
    var data3 = nm3[0];
    var name = n[0];
    res.render("data_pagination/fullresult",{name,data,data2,data3});
})

app.get("/dqindex",(req,res)=>{
    res.render("dynamic_query/index");
})

app.post("/dqindex",(req,res)=>{
    res.render("dynamic_query/index")
})

app.post("/dqdata", async(req,res)=>{
    try
    {
        let Id = 1;
        let sql = req.body.query;
        let sq = sql + ' LIMIT 10';
        let data = await con.query(sq);
        data = data[0];
        var max = data.length;
        let colnames = Object.keys(data[0]);
        sql = btoa(sql);
        res.render("dynamic_query/data",{Id,data,colnames,sql,max});
            }
    catch(err)
    {
        res.render("dynamic_query/errorhandle")
    }
})

   

app.get("/:sql/next/:Id",async(req,res)=>{
    
    try{
        let Id = req.params.Id;
        let sql = atob(req.params.sql);
        var sq = sql;
        sq = sq + ` LIMIT 10 OFFSET ${Id * 10}`;
        let data = await con.query(sq);
        data = data[0];
        var max = data.length;
        let colnames = Object.keys(data[0]);
        sql = btoa(sql);
        ++Id;
        res.render("dynamic_query/data",{Id,data,colnames,sql,max});
    }
    catch(err)
    {
        res.render("dynamic_query/errorhandle");
    }
    
})

app.get("/:sql/prev/:Id",async(req,res)=>{
    
    try{
        let Id = req.params.Id;
        var pid = Id - 2;
        --Id;
        let sql = atob(req.params.sql);
        var sq = sql;
        sq = sq + ` LIMIT 10 OFFSET ${pid * 10}`;
        let data = await con.query(sq);
        data = data[0];
        var max = data.length;
        let colnames = Object.keys(data[0]);
        sql = btoa(sql);
        res.render("dynamic_query/data",{Id,data,colnames,sql,max});
    }
    catch(err)
    {
        res.render("dynamic_query/errorhandle");
    }
    
})

app.get("/:sql/first",async(req,res)=>{
    try{
        let Id = 1;
        let sql = atob(req.params.sql);
        let sq = sql + ` LIMIT 10`;
        let data = await con.query(sq);
        data = data[0];
        var max = data.length;
        let colnames = Object.keys(data[0]);
        sql = btoa(sql);
        res.render("dynamic_query/data",{Id,data,colnames,sql,max});
    }
    catch(err)
    {
        res.render("dynamic_query/errorhandle");
    }
    
})

app.get("/:sql/last",async(req,res)=>{
    
    try{
        let sql = atob(req.params.sql);
        let d = await con.query(sql);
        d = d[0];
        var max = d.length;
        let Id = max/10;
        let pid = Id - 1;
        var sq = sql + ` LIMIT 10 OFFSET ${pid * 10}`;
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
    
})

app.get("/states",async (req,res)=>{
    let sql = 'select * from states';
    let result = await con.query(sql);
    result = result[0];
    let states = result
    res.render("dynamic_city/states",{states})
})

app.post("/states",async(req,res)=>{
    let stateid = req.query.state;
    let sql = `select cityname from city where sid = ${stateid}`;
    let result = await con.query(sql);
    let city = result[0];
    res.send({
        cities:city,
    })
})