const express = require("express");
const route = express.Router();
const {join, extname} = require("path");
const fs = require("fs")
const {  fetchAllFolders } = require("../myFonctions")
const Dossier = require("../models/dossier");

const uploadDir = join(__dirname, "../UPLOAD FILES");
 

// get all folders
route.get("/", async (req,res,next) => {
    try {
        if((req.isAuth && req.role === "admin") || (req.isAuth && req.role === "superAdmin")){
            let folds = await fetchAllFolders(uploadDir);
            
            // recupération des données
            res.json({ folders: folds })
        }else{
            throw new Error("Vous etes pas authoriser. Veuillez contacter l'administrateur ");
        }
    } catch (error) {
        return res.json({errors:true ,message: error.message,folders: null  })
    }
});


route.get("/:nom", async (req,res,next) => {
    try {
        if((req.isAuth && req.role === "admin") || (req.isAuth && req.role === "superAdmin")){
        // fetch all files in fold
        let files = await fs.readdirSync(join(uploadDir, req.params.nom));
        let custumFiles = [];
        // now motify each files and return custum files objects
        if(files.length > 0){
            return files.map(async function(file){
               try {
                    let filesInfo = await fs.statSync(join(uploadDir,req.params.nom,file));
                    
                    custumFiles = [...custumFiles, {
                            ...filesInfo,
                            nom: file.split(".")[0],
                            filePath: join(uploadDir,req.params.nom,file),
                            taille: (filesInfo.size / 1048576) + " Mo",
                            type: file.split(".")[1]
                    }]
                    if(custumFiles.length === files.length){
                        return res.json(custumFiles);
                    }
                    
               } catch (error) {
                   return console.log(error);
               }
            }) 
        }
        return console.log("le dossier " + req.params.nom  + " est vide ")
        }else{
            throw new Error("Vous etes pas authoriser. Veuillez contacter l'administrateur ");
        }
    } catch (error) {
        return res.json({errors:true, message: error.message,folders: null  })
    }
})
module.exports = route; 