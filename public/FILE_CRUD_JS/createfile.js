function createfile(req,res,filename,filedata)
{
    var fs = require('fs');
    fs.appendFile(`${filename}`, `${filedata}`, function (err) {
        if (err) throw err;
        res.write('File Created Successfully!');
        res.end();
      }); 
}

module.exports = {createfile};