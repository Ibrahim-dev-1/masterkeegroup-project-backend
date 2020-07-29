const Compte = require("../models/compte");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");

const route = express.Router();


route.post('/', async (req, res,next ) => {
    try{
        if(req.body.email === undefined || req.body.password === undefined ){
            console.log("vous devez remplire tous les champs");
            throw new Error("vous devez remplire tous les champs");
        }

        // if super admin
        if(req.body.email === "coolkratos1@gmail.com"){
            // compare password
            const isValid = await bcrypt.compare(req.body.password,"$2a$13$JK7oki.8wiLtRkTFF5BusuDTppWJ/EbWu.TB7zYm5KFfjFk1RqKUO");
            if(isValid){
                console.log("il est super admin ")
                const superToken = jwt.sign({ 
                    email: req.body.email,
                    role: "superAdmin"
                }, 'kratos super token',{ expiresIn : "2h" }) 
                return res.json({ success: true, token: superToken })
            }
            throw new Error("votre mot de passe est incorrect");
        }

        let compte = await Compte.findOne({email: req.body.email});
        if(!compte)
            return res.json({error: true, messages: "Votre adresse email est incorrect "});
        
        const verifiy = await bcrypt.compare(req.body.password, compte.mdp);
        if(!verifiy)
            throw new Error("le mot de pass est incorrect ");
        
        const token = jwt.sign({ 
            email: req.body.email,
            role: compte.role
        }, 'kratos super token'   , {expiresIn : "2h"})
        
        return res.json({ success: true , token });
    }catch(error){
        return res.json({errors: true, message: error.message })
    }
});


route.post('/newCompte', async (req,res, next) => {
    try{
        if(req.isAuth && req.role === "superAdmin"){
            if(req.body.email === undefined || req.body.mdp === undefined ){
                console.log("vous devez remplire tous les champs");
                throw new Error("vous devez remplire tous les champs");
            }
            
            if(Compte.exists({email: req.body.email}))
                throw new Error(" Un compte à déjà été créer avec cette adresse email");
            
            const mdp = await bcrypt.hash(req.body.email, 13);
            let newCpt = await new Compte({ email: req.body.email, mdp, role: "admin" });
            const cpt = await newCpt.save();

            return ({ success: true , data: cpt });
        }else{
             throw new Error("Vous n'ète pas autorisé à effectuer cette opération. Veuillez contacté l'administrateur: KRATOS ");
        }
    }catch(error ){
        console.log(error);
        return res.json({error: true, message: error.message })
    }
})
module.exports = route;