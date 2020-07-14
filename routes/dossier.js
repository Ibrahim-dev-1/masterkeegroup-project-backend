const express = require("express");
const route = express.Router();

const Dossier = require("../models/dossier");

// get all folders
route.get("/", (req,res,next) => {
    return console.log("cool");
    return res.send("affichage de tous les folders disponible dans notre dossier upoad ");
})

module.exports = route;