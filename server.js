const express = require("express");
const bodyParser = require("body-parser");
const uploadRoute = require("./routes/upload");
const filesRoute = require("./routes/files");
const allowServers = require("./middleware");
const { createFolder } = require("./myFonctions")
const fs = require("fs");
const { join } = require("path");
//  const cors = require("cors");
let app = express();
// app.use(cors());

uploadPath = join(__dirname , "FILES UPLOADED");

// ajout des middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowServers);

app.use('/upload', uploadRoute);
app.use('/files', filesRoute);

fs.stat(uploadPath , (err, stat) => {
    if(err)
        return createFolder(uploadPath)

     console.log("fichier déja existant ")
})

// listen any port 
app.listen(process.env.PORT | 9001 , () => console.log("Démarrage du serveur sur le port 9001..........."))