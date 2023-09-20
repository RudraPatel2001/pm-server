const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    pname: { type: String, required: true },
    ptech: { type: String, required: true },
    pdes: { type: String, required: true },
    pide: { type: String, required: true },
    pdate: { type: String, required: true },
    pcat: { type: String, required: true },
    plive: { type: String, required: true },
    pcode: { type: String, required: true },
    puser: { type: String, required: true },
    puserid: { type: String, required: true }
})

const Project = mongoose.model("Project", ProjectSchema)

module.exports = Project