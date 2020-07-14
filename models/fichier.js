const mongoose = require("mongoose");

const fichierSchema = new mongoose.Schema({
 nom : { type: String , required: true },
 path : { type: String , required: true },
 taille : { type: String , required: true },
 format : { type: String , required: true },
 dossier: {type: mongoose.Types.ObjectId, ref: "dossier"}
}, { timestamps:true })

module.exports  = mongoose.model("fichier", fichierSchema);