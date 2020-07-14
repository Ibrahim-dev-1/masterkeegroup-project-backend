const mongoose = require("mongoose");

const envoyeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    fichier: {
        type: mongoose.Types.ObjectId,
        ref: "fichier"
    },
    liens: String
}, { timestamps:true })

module.exports  = mongoose.model("envoye", envoyeSchema);