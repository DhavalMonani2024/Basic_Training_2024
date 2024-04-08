const jwt = require('jsonwebtoken');
const ver = (req,res,next)=>{
    try
    {
        var token = req.cookies.token;
        if(token)
        {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            var verify = jwt.verify(token,jwtSecretKey);
            next();
        }
        else
        {
            res.render('register/login');    
        }
    }
    catch(e)
    {
        console.log(e);
        res.render('register/login');
    }
}

module.exports = ver;