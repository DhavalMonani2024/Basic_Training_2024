const con = require("../connection/connection2")

const loadregister = (req,res)=>{
    let basicdetails;
    let educationaldetails;
    let references;
    let preferences;
    let languages;
    let technologies;
    let experience;
    let message = "Welcome to Registration Form";
    res.render("form/register",{message,basicdetails,educationaldetails,references,preferences,languages,technologies,experience});
}

const savedetails = async (req,res)=>{
    let data = req.body;
    let basicdetails;
    let educationaldetails;
    let references;
    let preferences;
    let languages;
    let technologies;
    let experience;
    //console.log(data);
    let sql = "INSERT INTO applicant(firstname,lastname,post,address1,address2,email,city,phone,state,gender,zipcode,relationship,dob) VALUES (?)";
    let values = [data.firstname,data.lastname,data.post,data.address1,data.address2,data.email,data.city,data.phonenumber,data.state,data.gender,data.zipcode,data.rs,data.dob];
    let result = await con.query(sql,[values]);
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
        for(let i=0;i<sscdetails.length;i++)
        {
            ad.push(sscdetails[i]);
        }
    }
    if(hscdetails[0] !== '')
    {
        for(let i=0;i<hscdetails.length;i++)
        {
            ad.push(hscdetails[i]);
        }
    }
    if(bachelordetails[0] !== '')
    {
        for(let i=0;i<bachelordetails.length;i++)
        {
            ad.push(bachelordetails[i]);
        }
    }
    if(masterdetails[0] !== '')
    {
        flag = 0;
        for(let i=0;i<masterdetails.length;i++)
        {
            ad.push(masterdetails[i]);
        }
    }
    ad.unshift(userid)
    if(flag == 1)
    {
            let sql = "INSERT INTO educational_details(id,ssc_board,ssc_year,ssc_percentage,hsc_board,hsc_year,hsc_percentage,bachelor_degree,bachelor_university,bachelor_year,bachelor_percentage) VALUES(?)";
            let values = ad;
            let result = await con.query(sql,[values]);
    }
    else
    {
        let sql = "INSERT INTO educational_details(id,ssc_board,ssc_year,ssc_percentage,hsc_board,hsc_year,hsc_percentage,bachelor_degree,bachelor_university,bachelor_year,bachelor_percentage,master_degree,master_university,master_year,master_percentage) VALUES(?)";
            let values = ad;
            let result = await con.query(sql,[values]);
    }
            
                if(data.hindi == 'hindi')
                {
                    let choice1 = 'n';
                    let choice2 = 'n';
                    let choice3 = 'n';
                    for(let i=0;i<data.hindican.length;i++)
                    {
                        if(data.hindican[i] == 'read'){choice1 = 'y';}
                        if(data.hindican[i] == 'write'){choice2 = 'y';}
                        if(data.hindican[i] == 'speak'){choice3 = 'y';}
                    }
                    let sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${userid},'hindi','${choice1}','${choice2}','${choice3}')`;
                    let result = await con.query(sql);
                }
                if(data.english == 'english')
                {
                    let choice1 = 'n';
                    let choice2 = 'n';
                    let choice3 = 'n';
                    for(let i=0;i<data.englishcan.length;i++)
                    {
                        if(data.englishcan[i] == 'read'){choice1 = 'y';}
                        if(data.englishcan[i] == 'write'){choice2 = 'y';}
                        if(data.englishcan[i] == 'speak'){choice3 = 'y';}
                    }
                    let sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${userid},'english','${choice1}','${choice2}','${choice3}')`;
                    let result = await con.query(sql);

                }
                if(data.gujarati == 'gujarati')
                {
                    let choice1 = 'n';
                    let choice2 = 'n';
                    let choice3 = 'n';
                    for(let i=0;i<data.gujaratican.length;i++)
                    {
                        if(data.gujaratican[i] == 'read'){choice1 = 'y';}
                        if(data.gujaratican[i] == 'write'){choice2 = 'y';}
                        if(data.gujaratican[i] == 'speak'){choice3 = 'y';}
                    }
                    let sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${userid},'gujarati','${choice1}','${choice2}','${choice3}')`;
                    let result = await con.query(sql);

                } 
                if(data.php == 'php')
                {   
                    if(data.php_level)
                    {
                        let sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${userid},'php','${data.php_level[0]}')`;
                        let result = await con.query(sql);
                    }
                
                }
                if(data.mysql == 'mysql')
                {
                    if(data.mysql_level)
                    {
                        let sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${userid},'mysql','${data.mysql_level[0]}')`;
                        let result = await con.query(sql);
                    }
                
                }
                if(data.laravel == 'laravel')
                { 
                    if(data.laravel_level)
                    {
                        let sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${userid},'laravel','${data.laravel_level[0]}')`;
                        let result = await con.query(sql);    
                    }
                
                }
                if(data.oracle == 'oracle')
                {
                    if(data.oracle_level)
                    {
                        let sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${userid},'oracle','${data.oracle_level[0]}')`;
                        let result = await con.query(sql);
                    }
                
                } 
                let cflag = 1;
                let companyname = [];
                let designation = [];
                let from = [];
                let to = [];
                for(let i=0;i<data.companyname.length;i++)
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
                for(let i=0;i<companyname.length;i++)
                {
                    if(companyname[i] !== '')
                    {
                        if(designation[i] !== '' && from[i] !== '' && to[i] !== '')
                        {
                            let sql = `INSERT INTO experience(id,company_name,company_designation,from_date,to_date) VALUES(${userid},'${companyname[i]}','${designation[i]}','${from[i]}','${to[i]}')`;
                            let result = await con.query(sql);   
                        }
                    }
                }
                let contactname = [];
                let contactnumber = [];
                let contactrelation = [];
                for(let i=0;i<data.contactname.length;i++)
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
                for(let i =0;i<contactname.length;i++)
                {
                    if(contactname[i] != '')
                    {
                        if(contactnumber != '' && contactrelation != '')
                        {
                            let sql = `INSERT INTO contact_reference(id,contact_name,contact_number,contact_relation) VALUES(${userid},'${contactname[i]}','${contactnumber[i]}','${contactrelation[i]}')`;
                            let result = await con.query(sql);
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
                for(let i=0;i<pr.length;i++)
                {
                    if(pr[i] == '')
                    {
                        prflag = 0;
                        break;
                    }
                }
                if(prflag == 1)
                {
                    let sql = `INSERT INTO preferences(id,prefered_location,notice_period,expected_ctc,current_ctc,department) VALUES(${userid},'${prefered_location}','${notice_period}','${expected_ctc}','${current_ctc}','${department}')`;
                    let result = await con.query(sql);
                }
                
            
                let message = "Form Submitted Successfully";

             res.render("form/register",{message,basicdetails,educationaldetails,references,preferences,languages,technologies,experience});
}

async function data(table,id)
{
    let sql = `select * from ${table} where id = ${id}`;
    let result = await con.query(sql);
    return result[0];
}

const updatedetails = async(req,res)=>{
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
}

const updatenewdetails = async(req,res)=>{
    let data = req.body;
    let id = req.params.Id;
    let bd = {"firstname":data.firstname,"lastname":data.lastname,"post":data.post,"address1":data.address1,"address2":data.address2,"email":data.email,"city":data.city,"phone":data.phonenumber,"state":data.state,"gender":data.gender,"zipcode":data.zipcode,"relationship":data.rs,"dob":data.dob}
    let sql = `UPDATE applicant SET ? WHERE id = ${id}`;
    let result = await con.query(sql,[bd]);
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
        for(let i=0;i<sscdetails.length;i++)
        {
            ad.push(sscdetails[i]);
        }
    }
    if(hscdetails[0] !== '')
    {
        for(let i=0;i<hscdetails.length;i++)
        {
            ad.push(hscdetails[i]);
        }
    }
    if(bachelordetails[0] !== '')
    {
        for(let i=0;i<bachelordetails.length;i++)
        {
            ad.push(bachelordetails[i]);
        }
    }
    if(masterdetails[0] != undefined)
    {
        flag = 0;
        for(let i=0;i<masterdetails.length;i++)
        {
            ad.push(masterdetails[i]);
        }
    }
    ad.unshift(id)
    console.log(ad);
    if(flag == 1)
    {
            let values = {'id':ad[0],'ssc_board':ad[1],'ssc_year':ad[2],'ssc_percentage':ad[3],'hsc_board':ad[4],'hsc_year':ad[5],'hsc_percentage':ad[6],'bachelor_degree':ad[7],'bachelor_university':ad[8],'bachelor_year':ad[9],'bachelor_percentage':ad[10]}
            let sql = `UPDATE educational_details SET ? WHERE id = ${id}`;
            let result = await con.query(sql,[values]);
    }
    else
    {
        let values = {'id':ad[0],'ssc_board':ad[1],'ssc_year':ad[2],'ssc_percentage':ad[3],'hsc_board':ad[4],'hsc_year':ad[5],'hsc_percentage':ad[6],'bachelor_degree':ad[7],'bachelor_university':ad[8],'bachelor_year':ad[9],'bachelor_percentage':ad[10],'master_degree':ad[11],'master_university':ad[12],'master_year':ad[13],'master_percentage':ad[14]}
        let sql = `UPDATE educational_details SET ? WHERE id = ${id}`;
        let result = await con.query(sql,[values]);
    }
    let alreadyknownlanguages = [];
    async function checklanguage(id)
    {
        let sql = `select * from languages where id = ${id}`;
        let result = await con.query(sql);
        result = result[0]
        for(let i=0;i<result.length;i++)
        {
            alreadyknownlanguages.push(result[i].language_known);
        }
        return alreadyknownlanguages;
    }
    let alk = [];
    alk = await checklanguage(id);
                if(data.hindi == 'hindi')
                {
                    let choice1 = 'n';
                    let choice2 = 'n';
                    let choice3 = 'n';
                    if(alk.includes('hindi'))
                    {
                        for(let i=0;i<data.hindican.length;i++)
                        {
                            if(data.hindican[i] == 'read'){choice1 = 'y';}
                            if(data.hindican[i] == 'write'){choice2 = 'y';}
                            if(data.hindican[i] == 'speak'){choice3 = 'y';}
                        }
                            let sql = `UPDATE languages SET id = ${id} ,language_known = 'hindi',can_read = '${choice1}' ,can_write = '${choice2}' ,can_speak = '${choice3}' where id = '${id}' and language_known = 'hindi'`;
                            let result = await con.query(sql);
                    }
                    else
                    {
                        for(let i=0;i<data.hindican.length;i++)
                        {
                            if(data.hindican[i] == 'read'){choice1 = 'y';}
                            if(data.hindican[i] == 'write'){choice2 = 'y';}
                            if(data.hindican[i] == 'speak'){choice3 = 'y';}
                        }
                        let sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${id},'hindi','${choice1}','${choice2}','${choice3}')`;
                        let result = await con.query(sql);
                    }
                    
                    
                }
                if(data.english == 'english')
                {
                    let choice1 = 'n';
                    let choice2 = 'n';
                    let choice3 = 'n';
                    if(alk.includes('english'))
                    {
                        for(let i=0;i<data.englishcan.length;i++)
                        {
                            if(data.englishcan[i] == 'read'){choice1 = 'y';}
                            if(data.englishcan[i] == 'write'){choice2 = 'y';}
                            if(data.englishcan[i] == 'speak'){choice3 = 'y';}
                        }
                            let sql = `UPDATE languages SET id = ${id} ,language_known = 'english',can_read = '${choice1}' ,can_write = '${choice2}' ,can_speak = '${choice3}' where id = ${id} AND language_known = 'english' `;
                            let result = await con.query(sql);
                    }
                    else
                    {
                        for(let i=0;i<data.englishcan.length;i++)
                        {
                            if(data.englishcan[i] == 'read'){choice1 = 'y';}
                            if(data.englishcan[i] == 'write'){choice2 = 'y';}
                            if(data.englishcan[i] == 'speak'){choice3 = 'y';}
                        }
                        let sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${id},'english','${choice1}','${choice2}','${choice3}')`;
                        let result = await con.query(sql);
                    }
                    
                }
                if(data.gujarati == 'gujarati')
                {
                    let choice1 = 'n';
                    let choice2 = 'n';
                    let choice3 = 'n';
                    if(alk.includes('gujarati'))
                    {
                        for(let i=0;i<data.gujaratican.length;i++)
                        {
                            if(data.gujaratican[i] == 'read'){choice1 = 'y';}
                            if(data.gujaratican[i] == 'write'){choice2 = 'y';}
                            if(data.gujaratican[i] == 'speak'){choice3 = 'y';}
                        }
                            let sql = `UPDATE languages SET id = ${id} ,language_known = 'gujarati',can_read = '${choice1}' ,can_write = '${choice2}' ,can_speak = '${choice3}' where id = '${id}' and language_known = 'gujarati'`;
                            let result = await con.query(sql);
                    }
                    else
                    {
                        for(let i=0;i<data.gujaratican.length;i++)
                        {
                            if(data.gujaratican[i] == 'read'){choice1 = 'y';}
                            if(data.gujaratican[i] == 'write'){choice2 = 'y';}
                            if(data.gujaratican[i] == 'speak'){choice3 = 'y';}
                        }
                        let sql = `INSERT INTO languages(id,language_known,can_read,can_write,can_speak) VALUES(${id},'gujarati','${choice1}','${choice2}','${choice3}')`;
                        let result = await con.query(sql);
                    }
                    

                } 

    let alreadyknowntechnologies = []
    async function checktechnology(id)
    {
        let sql = `select * from technologies where id = ${id}`;
        let result = await con.query(sql);
        result = result[0];
        for(let i=0;i<result.length;i++)
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
                            let sql = `UPDATE technologies SET id = ${id} ,technology_known = 'php' ,technology_level = '${data.php_level[0]}' WHERE id = ${id} and technology_known = 'php' `;
                            let result = await con.query(sql);
                        }
                    }   
                    else
                    {
                        if(data.php_level)
                        {
                            let sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${id},'php','${data.php_level[0]}')`;
                            let result = await con.query(sql);
                        }
                    }
                    
                
                }
                if(data.mysql == 'mysql')
                {
                    if(akt.includes('mysql'))
                    {
                        if(data.mysql_level)
                        {
                            let sql = `UPDATE technologies SET id = ${id} ,technology_known = 'mysql' ,technology_level = '${data.mysql_level[0]}' WHERE id = ${id} and technology_known = 'mysql' `;
                            let result = await con.query(sql);
                        }
                    }   
                    else
                    {
                        if(data.mysql_level)
                        {
                            let sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${id},'mysql','${data.mysql_level[0]}')`;
                            let result = await con.query(sql);
                        }
                    }
                    
                
                }
                if(data.laravel == 'laravel')
                {
                    if(akt.includes('laravel'))
                    {
                        if(data.laravel_level)
                        {
                            let sql = `UPDATE technologies SET id = ${id} ,technology_known = 'laravel' ,technology_level = '${data.laravel_level[0]}' WHERE id = ${id} and technology_known = 'laravel' `;
                            let result = await con.query(sql);
                        }
                    }   
                    else
                    {
                        if(data.laravel_level)
                        {
                            let sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${id},'laravel','${data.laravel_level[0]}')`;
                            let result = await con.query(sql);
                        }
                    }
                    
                
                }
                if(data.oracle == 'oracle')
                {
                    if(akt.includes('oracle'))
                    {
                        if(data.oracle_level)
                        {
                            let sql = `UPDATE technologies SET id = ${id} ,technology_known = 'oracle' ,technology_level = '${data.oracle_level[0]}' WHERE id = ${id} and technology_known = 'oracle' `;
                            let result = await con.query(sql);
                        }
                    }   
                    else
                    {
                        if(data.oracle_level)
                        {
                            let sql = `INSERT INTO technologies(id,technology_known,technology_level) VALUES(${id},'oracle','${data.oracle_level[0]}')`;
                            let result = await con.query(sql);
                        }
                    }
                    
                
                } 
                let cflag = 1;
                let companyname = [];
                let designation = [];
                let from = [];
                let to = [];
                let eid = [];
                if(data.companyname)
                {
                    for(let i=0;i<data.companyname.length;i++)
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
                }
                
                for(let i=0;i<companyname.length;i++)
                {
                    if(companyname[i] !== '')
                    {
                        if(designation[i] !== '' && from[i] !== '' && to[i] !== '' && eid[i] != '')
                        {
                            let sql = `UPDATE experience SET id = ${id},company_name = '${companyname[i]}',company_designation = '${designation[i]}',from_date = '${from[i]}',to_date ='${to[i]}' where eid = ${eid[i]}`;
                            let result = await con.query(sql);   
                        }
                    }
                }
                let contactname = [];
                let contactnumber = [];
                let contactrelation = [];
                let cid = [];
                if(data.contactname)
                {
                    for(let i=0;i<data.contactname.length;i++)
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
                for(let i =0;i<contactname.length;i++)
                {
                    if(contactname[i] != '')
                    {
                        if(contactnumber != '' && contactrelation != '')
                        {
                            let sql = `UPDATE contact_reference SET id = ${id} ,contact_name = '${contactname[i]}',contact_number = '${contactnumber[i]}' ,contact_relation = '${contactrelation[i]}' WHERE cid = ${cid[i]}`;
                            let result = await con.query(sql);
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
                for(let i=0;i<pr.length;i++)
                {
                    if(pr[i] == '')
                    {
                        prflag = 0;
                        break;
                    }
                }
                if(prflag == 1)
                {
                    let sql = `UPDATE preferences SET id = ${id}, prefered_location = '${prefered_location}', notice_period = '${notice_period}', expected_ctc = '${expected_ctc}', current_ctc = '${current_ctc}', department ='${department}' where id = ${id}`;
                    let result = await con.query(sql);
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
}

module.exports = {loadregister,savedetails,updatedetails,updatenewdetails}