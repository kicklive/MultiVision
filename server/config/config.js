var path=require('path');
var rootPath=path.normalize(__dirname+'/../../');

module.exports={
    development:{
        db:'mongodb://localhost/multivision',
        rootPath:rootPath,
        port:process.env.PORT || 3030
    },
    production:{
        db:'mongodb://kicklive:multivision@ds161028.mlab.com:61028/multivision',
        rootPath:rootPath,
        port:process.env.PORT || 80
    }
}