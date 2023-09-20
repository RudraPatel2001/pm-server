const mongoose = require('mongoose')

const ApiSchema = new mongoose.Schema({
    apiname: { type: String, required: true },
    apides: { type: String, required: true },
    apilive: { type: String, required: true },
    apidcmt: { type: String, required: true },
    apiuser: { type: String, required: true },
    apiuserid: { type: String, required: true },
})

const Apis = mongoose.model("Apis", ApiSchema)

module.exports = Apis