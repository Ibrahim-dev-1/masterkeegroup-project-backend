const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dossierRouter = require("./routes/dossier");
// const fichierRouter = require("./routes/fichier");
// const userRouter = require("./routes/user");
 
const allowServers = require("./middleware");
let app = express();


// ajout des middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowServers);

// utilisation des routes 
// app.use('/fichier', fileRouter);
app.use("/dossier", dossierRouter);

mongoose.connect("mongodb://localhost:27017/filesUpload", {useNewUrlParser: true, useUnifiedTopology: true })
.then(function(value){return console.log("connection à la base de donné mongodb sur le port 27017....")})
.catch(function(err){return console.log(err)})

// listen any port 
app.listen(process.env.PORT | 9001 , () => console.log("Démarrage du serveur sur le port 9001..........."))