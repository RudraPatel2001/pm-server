const express = require('express')
const app = express()

const Project = require("../models/project")

// Fetch All Projects
app.get('/getprojects', (_, res) => {
    Project.find()
        .then(r => res.json(r))
        .catch(e => res.json(e))
})

// Fetch Frontend Projects
app.get('/getfrontend', (_, res) => {
    Project.find({ pcat: "frontend" })
        .then(r => res.json(r))
        .catch(e => res.json(e))
})

// Fetch FullStack Projects
app.get('/getfullstack', (_, res) => {
    Project.find({ pcat: "fullstack" })
        .then(r => res.json(r))
        .catch(e => res.json(e))
})

// Fetch Mobile Projects
app.get('/getmobile', (_, res) => {
    Project.find({ pcat: "mobile" })
        .then(r => res.json(r))
        .catch(e => res.json(e))
})

// Specific user -> all projects
app.get("/userprojects/:id", (req, res) => {
    const userid = req.params.id

    Project.find({ puserid: userid })
        .then(r => res.json({ rows: r, count: r.length }))
        .catch(e => res.json(e))
})

// Post a Project
app.post('/postproject', (req, res) => {
    const { pname, ptech, pdes, pide, pdate, pcat, plive, pcode, puser, puserid } = req.body

    const PostProject = new Project({
        pname, ptech, pdes, pide, pdate, pcat, plive, pcode, puser, puserid
    })

    PostProject.save()
        .then(r => res.json({ r: r, msg: "Project Added!" }))
        .catch(e => res.json({ msg: e.message }))
})

// Delete single project
app.delete('/deleteuserproject/:id', (req, res) => {
    const _id = req.params.id
    Project.deleteOne({ _id })
        .then(r => res.json({ msg: 'Project deleted!' }))
        .catch(e => res.json({ msg: e.message }))
})

module.exports = app