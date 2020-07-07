const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs")

let route = express.Router();
const uploadPath = path.join(__dirname, '../FILES UPLOADED');

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadPath)
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }

})


const upload = multer({ 
    storage: storage
})

route.post("/", upload.single("myFile"), async (req, res) =>{
    try {
        if(req.file){
        // let files = await fs.readdirSync(uploadPath) ;
        // let tab = []
        // return files.map(async function(file){
        //     try{
        //         newObject = await fs.statSync(path.join(uploadPath, file.toString()));
        //         tab = [...tab,newObject]
        //         if(tab.length === files.length){
        //             res.send(tab)
        //         }
        //     }catch(err){ console.log(err)}
        // })
        return res.send("true")
    }
        return res.send("veuillez choisir un fichier")
        
    } catch (err) {
        console.log(err)
        throw err;
    }
})

module.exports = route;