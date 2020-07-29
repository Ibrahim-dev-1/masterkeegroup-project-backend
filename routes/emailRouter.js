const express  = require("express");
const route = express.Router();
const mailer = require("nodemailer");


route.post("/sendMails", (req,res,next) => {
    console.log(req.body);
    const tableauMails = req.body.mails;
    if(tableauMails.length > 0){
        console.log("on à une liste de email ...")
    }
    // // creation de la connection
    // const smtpTransport = mailer.createTransport({
    //     service:"Gmail",
    //     auth: {
    //         user:"coolkratos1@gmail.com",
    //         pass:"testbosse"
    //     }
    // })

    // // creation de l'email
    // const mail = {
    //     from: 'coolkratos1@gmail.com',
    //     to: ['komnacheche@gmail.com','coolkratos1@gmail.com','komnaibrahim@gmail.com'],
    //     subject: 'Un lien de téléchargement',
    //     html: '<h1>kratos bosse je vous envoie une adresse mail </h1>'
    // } 

    // smtpTransport.sendMail(mail,function(error, info){
    //     if(error){
    //         console.log("err");
    //         return res.json({error: "erreur ", message: "Erreur de l'envoi des messages via l'adresse email"})
    //     }
    //     console.log(info)
    //     smtpTransport.close();
    // })
    // console.log(smtpTransport);
    return res.send("Email envoyé avec success");
}) 

module.exports = route;

