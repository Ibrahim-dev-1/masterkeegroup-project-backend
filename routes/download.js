const express = require("express");
const route  = express.Router();



route.get("/", (req , res , next) => {
    console.log("la route bosse ")

} )


module.exports = route;