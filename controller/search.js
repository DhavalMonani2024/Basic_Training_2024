const con = require("../connection/connection2")
const searchform = (req,res)=>{
    let userdata;
    res.render("data_pagination/search",{userdata})
}

const searchdata = async (req,res)=>{
    let data = req.body;
    let search_string  = data.search;
    let firstnames = [];
    let firstnamecharacter = [];
    let lastnames = [];
    let lastnamecharacter = [];
    let middlenames = [];
    let middlenamecharacter = [];
    let numbers = [];
    let numbercharacter = [];
    let email = [];
    let emailcharacter = [];
    let ci = [];
    let firstnamequery = `firstname like '%' `;
    let characters = [];
    //firstname search
    for(let i=0;i<search_string.length;i++)
    {
        if(search_string[i] == '=')
        {
            firstnamecharacter.push(i);
            ci.push(i);
            characters.push(search_string[i])
        }
        if(search_string[i] == '@')
        {
            middlenamecharacter.push(i)
            ci.push(i);
            characters.push(search_string[i])
        }
        if(search_string[i] == '#')
        {
            lastnamecharacter.push(i)
            ci.push(i);
            characters.push(search_string[i])
        }
        if(search_string[i] == '%')
        {
            numbercharacter.push(i)
            ci.push(i);
            characters.push(search_string[i])
        }

        if(search_string[i] == '^')
        {
            emailcharacter.push(i)
            ci.push(i);
            characters.push(search_string[i])
        }
    }
    //firstname search
    if(firstnamecharacter.length == 1)
    {
         firstnames.push(search_string.slice(firstnamecharacter[0]+1,ci[ci.indexOf(firstnamecharacter[0])+1]))
    }
    else
    {
        for(let i=0;i<firstnamecharacter.length;i++)
        {
            firstnames.push(search_string.slice(firstnamecharacter[i]+1,ci[ci.indexOf(firstnamecharacter[i])+1]))
        }
    }

    //middle name search
    if(middlenamecharacter.length == 1)
    {
         middlenames.push(search_string.slice(middlenamecharacter[0]+1,ci[ci.indexOf(middlenamecharacter[0])+1]))
    }
    else
    {
        for(let i=0;i<middlenamecharacter.length;i++)
        {
            middlenames.push(search_string.slice(firstnamecharacter[i]+1,ci[ci.indexOf(firstnamecharacter[i])+1]))
        }
    }

    //lastname search
    if(lastnamecharacter.length == 1)
    {
         lastnames.push(search_string.slice(lastnamecharacter[0]+1,ci[ci.indexOf(lastnamecharacter[0])+1]))
    }
    else
    {
        for(let i=0;i<lastnamecharacter.length;i++)
        {
            lastnames.push(search_string.slice(lastnamecharacter[i]+1,ci[ci.indexOf(lastnamecharacter[i])+1]))
        }
    }


    //number
    if(numbercharacter.length == 1)
    {
         numbers.push(search_string.slice(numbercharacter[0]+1,ci[ci.indexOf(numbercharacter[0])+1]))
    }
    else
    {
        for(let i=0;i<numbercharacter.length;i++)
        {
            numbers.push(search_string.slice(numbercharacter[i]+1,ci[ci.indexOf(numbercharacter[i])+1]))
        }
    }

    //email
    if(emailcharacter.length == 1)
    {
         email.push(search_string.slice(emailcharacter[0]+1,ci[ci.indexOf(emailcharacter[0])+1]))
    }
    else
    {
        for(let i=0;i<emailcharacter.length;i++)
        {
            email.push(search_string.slice(emailcharacter[i]+1,ci[ci.indexOf(emailcharacter[i])+1]))
        }
    }


    //firstname query

    if(firstnames.length > 0)
    {
        if(firstnames.length == 1)
        {
            let fname = firstnames[0];
             firstnamequery = `firstname LIKE '${fname}%'`
        }
        else
        {
            firstnamequery = '';
            for(let i=0;i<firstnames.length;i++)
            {
                if(i == firstnames.length-1)
                {
                    firstnamequery+=`firstname like '${firstnames[i]}%'`;
                }
                else
                {
                    firstnamequery+=`firstname like '${firstnames[i]}%' or `;
                }
                
            }
        }
    }

    //lastname query

    let lastnamequery = `lastname like '%' `;
    if(lastnames.length > 0)
    {
        if(lastnames.length == 1)
        {
            let lname = lastnames[0];
             lastnamequery = `lastname LIKE '${lname}%' `
        }
        else
        {
            lastnamequery = ''
            for(let i=0;i<lastnames.length;i++)
            {
                if(i == lastnames.length-1)
                {
                    lastnamequery+=`lastname like '${lastnames[i]}%'`;
                }
                else
                {
                    lastnamequery+=`lastname like '${lastnames[i]}%' or `;
                }
                
            }
        }
    }

    //middlename query
    let middlenamequery = `middlename like '%' `;
    if(middlenames.length > 0)
    {
        if(middlenames.length == 1)
        {
            let mname = middlenames[0];
             middlenamequery = `middlename LIKE '${mname}%' `
        }
        else
        {
            middlenamequery = ''
            for(let i=0;i<middlenames.length;i++)
            {
                if(i == middlenames.length-1)
                {
                    middlenamequery+=`middlename like '${middlenames[i]}%'`;
                }
                else
                {
                    middlenamequery+=`middlename like '${middlenames[i]}%' or `;
                }
                
            }
        }
    }
    
    //Number query
    let numberquery = `number like '%' `
    if(numbers.length > 0)
    {
        if(numbers.length == 1)
        {
            let numb = numbers[0];
             numberquery = `number LIKE '%${numb}%' `
        }
        else
        {
            numberquery = '';
            for(let i=0;i<numbers.length;i++)
            {
                if(i == numbers.length-1)
                {
                    numberquery+=`number like '%${numbers[i]}%'`;
                }
                else
                {
                    numberquery+=`number like '%${numbers[i]}%' or `;
                }
                
            }
        }
    }
    
    //email query
    let emailquery = `email like '%' `;
    if(email.length > 0)
    {
        if(email.length == 1)
        {
            let eml = email[0];
            emailquery = `email LIKE '${eml}%' `
        }
        else
        {
            emailquery = ''
            for(let i=0;i<email.length;i++)
            {
                if(i == email.length-1)
                {
                    emailquery+=`email like '${email[i]}%'`;
                }
                else
                {
                    emailquery+=`email like '${email[i]}%' or `;
                }
                
            }
        }
    }
    

    let sql = `select * from student_master1 where ${firstnamequery} and ${middlenamequery} and ${lastnamequery} and ${numberquery} and ${emailquery} `;
    let result = await con.query(sql);
    result = result[0]
    let userdata = result;
    res.render("data_pagination/search",{userdata});
}


module.exports = {searchform,searchdata}