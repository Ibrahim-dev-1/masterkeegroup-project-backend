const express = require("express");
const route  = express.Router();
const path = require("path");
const fs = require("fs");

const filesUploadDirectory = path.join(__dirname, "../FILES UPLOADED");
 
route.get("/", async ( req , res , next) => {
   try{
     //passsing directoryPath and callback function
        let files = await fs.readdirSync(filesUploadDirectory) ;
        let tab = []
        return files.map(async function(file){
            try{
                newObject = await fs.statSync(path.join(filesUploadDirectory, file.toString()));
                tab = [...tab,{
                    ...newObject, 
                    id: "krts" + Math.floor(Math.random() * 100000),
                    name: file.toString(),
                    chemin: path.join(filesUploadDirectory,file.toString()),
                    size: Math.round(newObject.size/(1024*1024))
                }]
                if(tab.length === files.length){
                    res.send(tab)
                }
            }catch(err){ console.log(err)}
        })
   }catch(err){
       console.log(err)
   }
})

route.get("/download/:name", async ( req , res , next) => {
    try{
 
        console.log(req.params.name)
        res.sendFile(path.join(filesUploadDirectory,name.toString()));
    }catch(err){
        console.log(err)
    }
 })

module.exports = route;