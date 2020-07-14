const mongoose = require("mongoose");

const dossierSchema = new mongoose.Schema({
 nom : { type: String, required: true },
 nbrElements : { type: Number},
 fichiers : [
     {
         type: mongoose.Types.ObjectId,
         ref: "fichier"
     }
 ],
}, { timestamps:true })

module.exports  = mongoose.model("dossier", dossierSchema);