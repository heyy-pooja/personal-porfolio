const mongoose = require("mongoose")
const socialSchema = new mongoose.Schema({
    name: { type: String },
    links: { type: String },

}, { timestamps: true })

module.exports = mongoose.model("social", socialSchema)