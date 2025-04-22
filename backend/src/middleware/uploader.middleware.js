const multer = require('multer');
const fs = require('fs');
const {randomStringGenerator} = require('../utilies/helper');
const { FileFilterType } = require('../config/constant.config');

const myStorage = multer.diskStorage({
    destination:function(req,file,cb){
        const path = './public/uploads' + req.uploadPath;
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{recursive:true});
        }
        cb(null,path);
        
    },
    filename:function(req,file,cb){
        const ext = file.originalname.split('.').pop();
        const fileName= randomStringGenerator(40) + "." + ext
        cb(null,fileName);
    }

})

const uploadFile = (fileType=FileFilterType.IMAGE)=>{
    let allowed = ['jpg','jpeg', 'png', 'webp', 'gif']
    if(fileType === FileFilterType.VIDEO){
        allowed = ['mp4','mov','avi','wmv','flv','webm','mkv']
    }
    else if(fileType === FileFilterType.DOCUMENT){
        allowed = ['pdf','doc','docx','xls','xlsx','ppt','pptx']
    }

    return multer({
        storage:myStorage,
        limits:{
            fileSize:300000
        },
        fileFilter:(req,file,cb)=>{
            const ext = file.originalname.split('.').pop().toLowerCase();
            if(!allowed.includes(ext)){
                return cb(new Error('Invalid file type'));
            }
            cb(null,true);
        }

    })
}

const setPath = (path) => {
    return (req, res, next) => {
        req.uploadPath = path
        next()
    }
}

module.exports = {
    setPath,
    uploadFile
}
