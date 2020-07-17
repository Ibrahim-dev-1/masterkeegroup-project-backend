const fs = require("fs");
const PATH = require("path");

const createFolder = async (chemin) => {
    try{
       if(!await fs.existsSync(chemin)){
           const fold = await fs.mkdirSync(chemin);
           console.log(fold);
           return fold;
        }
    }catch(err){
        return console.log(err)
    }
}

const moveFiles = async (oldPath,newPath) => {
   try {
       const result = await fs.renameSync(oldPath, newPath);
   } catch (error) {
       return console.log(error);
   }
}

const fetchAllFolders = async (paths) => {
    try{
        let Folds = await fs.readdirSync(paths);
        Folds = Folds.map(function(f){
            let foldInfo = fs.readdirSync(PATH.join(paths,f));
            return {
                nom: f,
                path: PATH.join(paths,f),
                ...foldInfo,
                length: foldInfo.length,
                type: f
            }
        })
        return Folds;
    }catch(err){
        return console.log(err);
    }
}

module.exports = {
    createFolder,
    moveFiles,
    fetchAllFolders,
}