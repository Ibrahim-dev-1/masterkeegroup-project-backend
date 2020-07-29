const multer = require("multer")
const express = require("express");
const {join} = require("path")
const { createFolder } = require("../myFonctions");
const route  = express.Router();

const choiseDestination = async (req, file,cb) => {
    if((req.isAuth && req.role === "superAdmin") || (req.isAuth && req.role === "admin")){
        const uploadDir = join(__dirname, "../UPLOAD FILES");
        if(file.mimetype === "video/mp4"){
            createFolder(join(uploadDir, 'Videos'));
            return cb(null,join(uploadDir,'Videos'));
        }
        if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ){
            createFolder(join(uploadDir, 'images'));
            return cb(null,join(uploadDir,'images'));
        }
        createFolder(join(uploadDir, 'Others'));
        return cb(null,join(uploadDir,'Others'));
    }else{
        return cb(new Error("Vous n'etes pas authoriser "), null);
    }
    
}

let storage = multer.diskStorage({
    destination: function(req,file, cb){
        return choiseDestination(req,file, cb);
    },

    filename: function(req,file,cb){
        if((req.isAuth && req.role === "superAdmin") || (req.isAuth && req.role === "admin")){
            return cb(null,file.originalname);
        }else{
            return cb(new Error("Vous n'etes pas authoriser "), null);
        }
    }
})
let upload = multer({storage});

route.post('/', upload.array("myFiles"), (req,res,next) => {
    
        console.log(req.files)
        if(!req.files.length > 0 )
            return res.json({ok: false, message:"pas de ficier"})
        return res.json({ok: true, message:"upload success.."})
    

})


module.exports = route