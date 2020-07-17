const express = require("express");
const route = express.Router();
const { join, extname } = require("path");
const fs = require("fs")
const {  fetchAllFolders } = require("../myFonctions");

const Dossier = require("../models/dossier");

 

// get all folders
route.post("/remove/", async (req,res,next) => {
    try {
        const filePath = req.body.filePath;
        console.log(filePath);
    } catch (error) {
        res.json({errors:"error" + error.message,folders: null  })
    }
});

module.exports = route; 