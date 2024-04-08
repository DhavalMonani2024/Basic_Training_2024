const welcome = (req,res)=>{
    res.render("FILE_CRUD/welcome");
}


const registerfile = (req,res)=>{
    res.render('FILE_CRUD/register');
}

const registeruser = (req,res)=>{
    let fs = require('fs');
    console.log("post register called")
    let filedata = req.body;
    let filename = 'details.json'
    if(fs.existsSync(`${filename}`))
    {
        fs.readFile(`${filename}`,'utf-8',function(err,data){
            if(data === '')
            {
                let fd = []; 
                fd.push(filedata);
                fd = JSON.stringify(fd); 
                const cf = require('/FILE_CRUD_JS/createfile.js');  
                cf.createfile(req,res,filename,fd);

                
            }
            else
            {
                let d = JSON.parse(data);
                d.push(filedata);
                let ad = JSON.stringify(d,null,2);
                fs.writeFile(`${filename}`,ad,function(err){
                    if(err) throw err;
                    else{
                        return res.redirect("successfull")
                    }
                    
                    })

            }
            });
    }

    
}


const successfull = (req,res)=>{
    res.render("FILE_CRUD/successfull");
}

const userdetails = (req,res)=>{
    let filename = "details.json";
    let fs = require('fs');
    fs.readFile(`${filename}`,'utf-8',function(err,data)
    {
            let d = JSON.parse(data);
            res.render("FILE_CRUD/userdetails",{d});
    })
            
}

const fulluserdetails = (req,res)=>{
    const url = req.url;
    let id = Number(url.slice(17));
    let filename = "details.json";
    let fs = require('fs');
    fs.readFile(`${filename}`,'utf-8',function(err,data)
    {
            let d = JSON.parse(data);
            res.render("FILE_CRUD/fulluserdetails",{id,d});
    })
}

const deleteuser = (req,res)=>{
    const url = req.url;
    let id = Number(url.slice(8));
    let filename = "details.json";
    let fs = require('fs');
    fs.readFile(`${filename}`,'utf-8',function(err,data)
    {
        let d = JSON.parse(data);
        d.splice(id,1);
        let ad = JSON.stringify(d,null,2);
        fs.writeFile(`${filename}`,ad,function(err){
            if(err) throw err;
            res.render("FILE_CRUD/delete");
        })
    })
}

const update = (req,res)=>{
    const url = req.url;
    let id = Number(url.slice(12));
    let filename = "details.json";
    let fs = require('fs');
    fs.readFile(`${filename}`,'utf-8',function(err,data)
    {
        let fulldata = JSON.parse(data);
        let userdata = fulldata[id];
        res.render("FILE_CRUD/update",{id,userdata});
    })

}

const updatesuccessfull = (req,res)=>{
    
    let newdata = req.body;
    let id = Number(newdata.id);
    let filename = "details.json";
    let fs = require('fs');
    fs.readFile(`${filename}`,'utf-8',function(err,data)
    {
        let fulldata = JSON.parse(data);
        let{id : _, ...ud} = newdata;
        fulldata[id] = ud;
        let ad = JSON.stringify(fulldata,null,2);
        fs.writeFile(`${filename}`,ad,function(err){
            if(err) throw err;
            res.render("FILE_CRUD/updatesuccessfull");
        })

    })
}

module.exports = {welcome,registerfile,registeruser,successfull,userdetails,fulluserdetails,deleteuser,update,updatesuccessfull}