const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    email: String,
    mdp: String,
    role: String
});

module.exports = mongoose.model('compte', loginSchema)