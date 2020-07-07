const path = require("path");
const fs = require("fs");


const createFolder = (chemin) => {
    
    fs.mkdir(chemin, (err, response) => {
        if(err)
            return console.log(err);
    })
    return ;
}

module.exports = {
    createFolder,
}