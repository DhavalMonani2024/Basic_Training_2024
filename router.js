const express = require('express');
const rts = express.Router();
const md5 = require('md5');
const ver = require('./middleware/verify');
const rgs = require('./controller/registration')
const al = require('./controller/activatelink')
const rg = require('./controller/regenerate')
const lg = require('./controller/login');
const db = require('./controller/dashboard');
const fp = require('./controller/forgotpassword');
const register = require('./controller/register');
const sf = require('./controller/studentform');
const state = require("./controller/states");
const sd = require("./controller/sdata");
const search = require("./controller/search")
const ord = require("./controller/order");
const atd = require("./controller/attendance");
const rst = require("./controller/result")
const dq = require("./controller/dynamicquery")
const fc = require("./controller/filecrud");
const verify = require("./middleware/verify");
rts.get("/registration",rgs.registerform)
rts.post("/registration",rgs.register);
rts.get("/active",al.activateLink)
rts.post("/active",al.activatedLink)
rts.post("/regenerate",rg.regenerate);
rts.get("/login",lg.loginform);
rts.post("/login",lg.loginprocess);
rts.get("/front",verify,db.loaddashboard)
rts.get("/forgotpassword",fp.forgotpasswordform);
rts.post("/forgotpassword",fp.setnewpassword);
rts.get("/DynamicTable",verify,(req,res)=>{
    res.render("html/DynamicTable")
})    
rts.get("/colortable",verify,(req,res)=>{
    res.render("html/colortable");
})
    
rts.get("/eventtable",verify,(req,res)=>{
    res.render("html/eventtable")
})
    
rts.get("/tic_tac_toe",verify,(req,res)=>{
    res.render("html/tic_tac_toe")
})


rts.get("/register",verify,register.loadregister);
rts.post("/register",verify,register.savedetails);
rts.get("/update/:Id",verify,register.updatedetails);
rts.post("/update/:Id",verify,register.updatenewdetails)
rts.get("/studentform",verify,sf.loadstudentform);
rts.post("/studentform",verify,sf.savestudentdetails);
rts.get("/studentlist",verify,sf.studentlist);
rts.get("/update",verify,sf.updatestudentform)
rts.post("/update",verify,sf.setstudentdetails)
rts.post("/reinsert",verify,sf.reinsert);
rts.get("/timezone",verify,(req,res)=>{
        res.render("ajax/timezone")
})
rts.get("/index",verify,(req,res)=>{
    res.render("jsonplaceholder/index");
})

rts.get("/jsonplaceholder/Data",verify,(req,res)=>{
    res.render("jsonplaceholder/Data")
})

rts.get("/states",verify,state.states);
rts.post("/states",verify,state.setcity)
rts.get("/sdata",verify,sd.alldata)
rts.get("/sdata/next/:Id",verify,sd.next);
rts.get("/sdata/prev/:Id",verify,sd.prev);
rts.get("/sdata/first",verify,sd.first);
rts.get("/sdata/last",verify,sd.last);
rts.get("/search",verify,search.searchform);
rts.post("/search",verify,search.searchdata);
rts.get("/order",verify,ord.order);
rts.post("/order",verify,ord.orderby);
rts.get("/order/next/:Id/:cols/:hr",verify,ord.next);
rts.get("/order/prev/:Id/:cols/:hr",verify,ord.prev);
rts.get("/order/first/:cols/:hr",verify,ord.first);
rts.get("/order/last/:cols/:hr",verify,ord.last);
rts.get("/attendance",verify,atd.attendance);
rts.post("/attendance",verify,atd.allattendance);
rts.get("/attendance/:dt/next/:Id",verify,atd.next)
rts.get("/attendance/:dt/prev/:Id",verify,atd.prev)
rts.get("/attendance/:dt/first",verify,atd.first)
rts.get("/attendance/:dt/last",verify,atd.last)
rts.get("/result",verify,rst.result)
rts.get("/result/first",verify,rst.first)
rts.get("/result/last",verify,rst.last)
rts.get("/result/next/:Id",verify,rst.next)
rts.get("/result/prev/:Id",verify,rst.prev)
rts.get("/fullresult/:Id",verify,rst.fullresult)
rts.get("/dqindex",verify,dq.dq1)
rts.post("/dqindex",verify,dq.dq2)
rts.post("/dqdata",verify,dq.dqdata)
rts.get("/dynamicdata/next/:sql/:Id",verify,dq.next)
rts.get("/dynamicdata/prev/:sql/:Id",verify,dq.prev)
rts.get("/dynamicdata/first/:sql",verify,dq.first)
rts.get("/dynamicdata/last/:sql",verify,dq.last)
rts.get("/ehya",verify,(req,res)=>{
    res.render("HTML_PRACTICAL1/uindex")
})

rts.get("/awan",verify,(req,res)=>{
    res.render("HTML_PRACTICAL2/assets/index")
})

rts.get("/HireX",verify,(req,res)=>{
    res.render("HTML_PRACTICAL3/assets/index")
})

rts.get("/welcome",verify,fc.welcome);
rts.get("/registerfile",verify,fc.registerfile)
rts.post("/registerfile",verify,fc.registeruser);
rts.get("/userdetails",verify,fc.userdetails);
rts.get("/fulluserdetails",verify,fc.fulluserdetails);
rts.get("/userdelete",verify,fc.deleteuser);
rts.get("/successfull",verify,fc.successfull)
rts.post("/updatesuccessfull",verify,fc.updatesuccessfull)
rts.get("/fileupdate",verify,fc.update)
rts.get("/logout",verify,(req,res)=>{
    res.clearCookie('token');
    res.render("register/login")
})
module.exports = rts